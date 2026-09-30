require('dotenv').config();
const express = require('express');
const cors = require('cors');
const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const jwt = require('jsonwebtoken');

const app = express();
app.use(cors({
	origin: '*',
	methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
	allowedHeaders: ['Content-Type', 'Authorization'],
}));
app.use(express.json());

const PORT = process.env.PORT || 3000;
const SERVER_URL = normalizePublicUrl(process.env.SERVER_URL || 'https://abo-ride.live/');
const UPLOADS_PATH = process.env.UPLOADS_PATH || '/uploads';
const FILE_PATH = path.join(__dirname, 'data', 'tickets.xlsx');
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;
const JWT_SECRET = process.env.JWT_SECRET;

function normalizePublicUrl(url) {
	const trimmed = String(url).trim().replace(/\/$/, '');
	if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
		return trimmed;
	}
	return `https://${trimmed}`;
}

function requireAdmin(req, res, next) {
	if (!JWT_SECRET) {
		return res.status(503).json({ error: 'Admin auth is not configured' });
	}

	const header = req.headers.authorization;
	if (!header || !header.startsWith('Bearer ')) {
		return res.status(401).json({ error: 'Unauthorized' });
	}

	try {
		jwt.verify(header.slice(7), JWT_SECRET);
		next();
	} catch {
		return res.status(401).json({ error: 'Unauthorized' });
	}
}

const storage = multer.diskStorage({
	destination: 'uploads/',
	filename: (req, file, cb) => {
		const ext = path.extname(file.originalname);
		cb(null, `${Date.now()}${ext}`);
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

const getTickets = () => {
	if (!fs.existsSync(FILE_PATH)) {
		return [];
	}
	const workbook = xlsx.readFile(FILE_PATH);
	const sheet = workbook.Sheets[workbook.SheetNames[0]];
	const tickets = xlsx.utils.sheet_to_json(sheet, { defval: '' });

	return tickets.map((ticket) => ({
		...ticket,
		QRCode: ticket.QRCode || '',
	}));
};

const saveTickets = (tickets) => {
	const dir = path.dirname(FILE_PATH);
	if (!fs.existsSync(dir)) {
		fs.mkdirSync(dir, { recursive: true });
	}
	const newSheet = xlsx.utils.json_to_sheet(tickets);
	const newWorkbook = xlsx.utils.book_new();
	xlsx.utils.book_append_sheet(newWorkbook, newSheet, 'Tickets');
	xlsx.writeFile(newWorkbook, FILE_PATH);
};

app.post('/admin/login', (req, res) => {
	if (!ADMIN_PASSWORD || !JWT_SECRET) {
		return res.status(503).json({ error: 'Admin auth is not configured' });
	}

	const { password } = req.body;
	if (!password || password !== ADMIN_PASSWORD) {
		return res.status(401).json({ error: 'Invalid password' });
	}

	const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '24h' });
	res.json({ token });
});

app.post('/upload', requireAdmin, upload.single('image'), (req, res) => {
	if (!req.file) return res.status(400).json({ error: 'No file uploaded' });

	res.json({ filePath: `/uploads/${req.file.filename}` });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.get('/ticket/:number', (req, res) => {
	const tickets = getTickets();
	const ticket = tickets.find((t) => String(t.Number) === req.params.number);

	if (!ticket) {
		return res.status(404).json({ error: 'Ticket not found' });
	}

	if (ticket.Image && !ticket.Image.startsWith('http')) {
		ticket.Image = `${SERVER_URL}${UPLOADS_PATH}/${path.basename(ticket.Image)}`;
	}

	res.json(ticket);
});

app.post('/api/check-ticket', (req, res) => {
	const { ticketNumber } = req.body;
	const tickets = getTickets();
	const ticketExists = tickets.some((t) => String(t.Number) === String(ticketNumber));
	res.json({ exists: ticketExists });
});

app.post('/admin/tickets', requireAdmin, (req, res) => {
	const { Number, Name, BirthDate, StartDate, StartTime, EndDate, EndTime, Image } = req.body;

	if (!Number || !Name || !BirthDate || !StartDate || !StartTime || !EndDate || !EndTime || !Image) {
		return res.status(400).json({ error: 'All fields are required!' });
	}

	const tickets = getTickets();
	const index = tickets.findIndex((t) => String(t.Number) === String(Number));

	if (index !== -1) {
		tickets[index] = {
			...tickets[index],
			Number,
			Name,
			BirthDate,
			StartDate,
			StartTime,
			EndDate,
			EndTime,
			Image,
		};
	} else {
		tickets.push({ Number, Name, BirthDate, StartDate, StartTime, EndDate, EndTime, Image });
	}

	try {
		saveTickets(tickets);
		res.json({ message: 'Ticket successfully saved' });
	} catch {
		res.status(500).json({ error: 'Server error while saving ticket' });
	}
});

app.delete('/admin/tickets', requireAdmin, (req, res) => {
	try {
		saveTickets([]);
		res.json({ message: 'Все билеты успешно удалены' });
	} catch {
		res.status(500).json({ error: 'Ошибка при удалении билетов' });
	}
});

app.listen(PORT);
