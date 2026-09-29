// app/App.tsx
import { RouterProvider } from "react-router-dom";
import { router } from "./router";
import GlobalStyle from "./GlobalStyles"; 

export const App = () => {
  return (
    <>
      <GlobalStyle />
      <RouterProvider router={router} />
    </>
  );
};


// export const App = () => {
//   const [ticketNumber, setTicketNumber] = useState("");
//   const [ticketData, setTicketData] = useState<any>(null);
//   const [error, setError] = useState("");

//   const fetchTicket = async () => {
//     setError(""); // Сбрасываем ошибки перед запросом
//     setTicketData(null);

//     try {
//       const response = await fetch(`http://localhost:3002/ticket/${ticketNumber}`);
//       if (!response.ok) throw new Error("Билет не найден");

//       const data = await response.json();
//       setTicketData(data);
//     } catch (err) {
//       setError("Билет не найден");
//     }
//   };

//   return (
//     <div style={{ maxWidth: "400px", margin: "50px auto", textAlign: "center" }}>
//       <h1>Поиск билета</h1>

//       {/* Поле ввода номера билета */}
//       <input
//         type="text"
//         placeholder="Введите номер билета"
//         value={ticketNumber}
//         onChange={(e) => setTicketNumber(e.target.value)}
//         style={{ padding: "10px", width: "100%", marginBottom: "10px" }}
//       />
//       <button onClick={fetchTicket} style={{ padding: "10px 20px", cursor: "pointer" }}>
//         Найти
//       </button>

//       {/* Вывод ошибки, если билет не найден */}
//       {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

//       {/* Вывод информации о билете, если найден */}
//       {ticketData && (
//         <div
//           style={{
//             marginTop: "20px",
//             padding: "15px",
//             border: "1px solid #ccc",
//             borderRadius: "8px",
//             textAlign: "left",
//           }}
//         >
//           <h2 style={{ textAlign: "center" }}>Данные билета</h2>
//           <p><strong>Номер:</strong> {ticketData.Number}</p>
//           <p><strong>Имя:</strong> {ticketData.Name}</p>
//           <p><strong>Фамилия:</strong> {ticketData.Surname}</p>
//           <p><strong>Дата рождения:</strong> {ticketData.BirthDate}</p>
//           <p><strong>Действителен с:</strong> {ticketData.StartDate}</p>
//           <p><strong>Действителен до:</strong> {ticketData.EndDate}</p>
//         </div>
//       )}
//     </div>
//   );
// }


