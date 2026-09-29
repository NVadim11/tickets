require('dotenv').config();
const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');
const fs = require('fs');
// для json
const path = require('path');
const multer = require('multer');

const app = express();
app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;
const SERVER_URL = process.env.SERVER_URL || 'https://abo-ride.live/';
const UPLOADS_PATH = process.env.UPLOADS_PATH || '/uploads';
const FILE_PATH = path.join(__dirname, 'data', 'tickets.xlsx');

const storage = multer.diskStorage({
	destination: 'uploads/',
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		const filename = `${Date.now()}${ext}`;
		cb(null, filename);
	},
});

const upload = multer({
	storage,
	limits: { fileSize: 5 * 1024 * 1024 },
	fileFilter: (req, file, cb) => {
		const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
		if (allowedTypes.includes(file.mimetype)) {
			cb(null, true);
		} else {
			cb(new Error('Invalid file type. Only JPG, PNG, and WEBP are allowed.'));
		}
	},
});

app.post('/upload', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

    const filePath = `/uploads/${req.file.filename}`;
    res.json({ filePath });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 📌 Читаем билеты из Excel
const getTickets = () => {
	if (!fs.existsSync(FILE_PATH)) {
		return [];
	}
	const workbook = xlsx.readFile(FILE_PATH);
	const sheet = workbook.Sheets[workbook.SheetNames[0]];
	const tickets = xlsx.utils.sheet_to_json(sheet, { defval: "" }); 

	// tickets.forEach(ticket => {
	// 	console.log(`Ticket Number: ${ticket.Number}, QRCode: ${ticket.QRCode || "empty"}`);
	// });

	return tickets.map(ticket => ({
		...ticket,
		QRCode: ticket.QRCode || ""
	}));
};


app.get('/ticket/:number', (req, res) => {
	const tickets = getTickets();

	const ticket = tickets.find((t) => String(t.Number) === req.params.number);

	if (ticket) {
		// if (ticket.Image && !ticket.Image.startsWith('http')) {
		// 	ticket.Image = `http://localhost:3023${ticket.Image}`;
		// }
		if (ticket.Image && !ticket.Image.startsWith('http')) {
			ticket.Image = `${SERVER_URL.replace(/\/$/, '')}${UPLOADS_PATH}/${path.basename(ticket.Image)}`;
		}
		res.json(ticket);
	} else {
		res.status(404).json({ error: 'Ticket not found' });
	}
});

app.post('/api/check-ticket', (req, res) => {
	const { ticketNumber } = req.body;
	const tickets = getTickets();

	const ticketExists = tickets.some((t) => String(t.Number) === String(ticketNumber));

	res.json({ exists: ticketExists });
});

app.post('/admin/tickets', (req, res) => {
    const { Number, Name, BirthDate, StartDate, StartTime, EndDate, EndTime, Image } = req.body;

    if (!Number || !Name || !BirthDate || !StartDate || !StartTime || !EndDate || !EndTime || !Image) {
        return res.status(400).json({ error: "All fields are required!" });
    }

    let tickets = getTickets();

    const index = tickets.findIndex((t) => String(t.Number) === String(Number));

    if (index !== -1) {
        tickets[index] = { 
            ...tickets[index], 
            Name, BirthDate, StartDate, StartTime, EndDate, EndTime, 
            Image
        };
    } else {
        tickets.push({ Number, Name, BirthDate, StartDate, StartTime, EndDate, EndTime, Image });
    }

    try {
        const newSheet = xlsx.utils.json_to_sheet(tickets);
        const newWorkbook = xlsx.utils.book_new();
        xlsx.utils.book_append_sheet(newWorkbook, newSheet, 'Tickets');
        xlsx.writeFile(newWorkbook, FILE_PATH);
        res.json({ message: 'Ticket successfully saved' });
    } catch (error) {
        console.error("Error while writing to db:", error);
        res.status(500).json({ error: "Server error while saving ticket" });
    }
});

// Добавляем новый эндпоинт для удаления всех билетов
app.delete('/admin/tickets', (req, res) => {
    try {
        // Создаем пустой лист Excel
        const newWorkbook = xlsx.utils.book_new();
        const newSheet = xlsx.utils.json_to_sheet([]);
        xlsx.utils.book_append_sheet(newWorkbook, newSheet, 'Tickets');
        
        // Записываем пустой файл
        xlsx.writeFile(newWorkbook, FILE_PATH);
        
        res.json({ message: 'Все билеты успешно удалены' });
    } catch (error) {
        console.error("Error while deleting tickets:", error);
        res.status(500).json({ error: "Ошибка при удалении билетов" });
    }
});

// 📌 Функция для чтения билетов из JSON
// const getTickets = () => {
// 	if (!fs.existsSync(FILE_PATH)) return []; // Если файла нет, вернуть пустой массив
// 	const data = fs.readFileSync(FILE_PATH, 'utf-8');
// 	return JSON.parse(data);
// };

// 📌 API для поиска билета по номеру
// app.get("/ticket/:number", (req, res) => {
//   const tickets = getTickets();
//   const ticket = tickets.find(t => t.Number === req.params.number);
//   ticket ? res.json(ticket) : res.status(404).json({ error: "Билет не найден" });
// });

// 📌 Раздача QR-кодов как статических файлов
// app.use('/qrcodes', express.static(path.join(__dirname, 'data/qrcodes')));

// 📌 API для обновления билетов (админка)
// app.post("/admin/tickets", (req, res) => {
//   const { Number, Name, Surname, BirthDate, StartDate, EndDate, QR } = req.body;
//   const tickets = getTickets();

//   const index = tickets.findIndex(t => t.Number === Number);
//   if (index !== -1) tickets[index] = req.body; // Обновление
//   else tickets.push(req.body); // Добавление нового

//   const newSheet = xlsx.utils.json_to_sheet(tickets);
//   const newWorkbook = xlsx.utils.book_new();
//   xlsx.utils.book_append_sheet(newWorkbook, newSheet, "Tickets");
//   xlsx.writeFile(newWorkbook, FILE_PATH);

//   res.json({ message: "Билет сохранен" });
// });

// 📌 API для добавления/обновления билета
// app.post('/admin/tickets', (req, res) => {
// 	const { Number, Name, Surname, BirthDate, StartDate, EndDate, QR } = req.body;
// 	let tickets = getTickets();

// 	// Проверяем, есть ли уже билет
// 	const index = tickets.findIndex((t) => String(t.Number) === String(Number));
// 	if (index !== -1) {
// 		tickets[index] = req.body; // Обновляем существующий билет
// 	} else {
// 		tickets.push(req.body); // Добавляем новый билет
// 	}

// 	// Записываем изменения обратно в JSON
// 	fs.writeFileSync(FILE_PATH, JSON.stringify(tickets, null, 2));
// 	res.json({ message: 'Билет сохранен' });
// });

// Запуск сервера
app.listen(PORT, () => console.log(`Backend запущен на порту ${PORT}, доступен по адресу ${SERVER_URL}`));
