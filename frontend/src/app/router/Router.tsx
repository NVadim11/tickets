// app/router/Router.tsx
import { createBrowserRouter, Navigate }  from 'react-router-dom';

import { Admin } from '../pages/Admin';
import { Main } from '../pages/Main';
import { Ticket } from '../pages/Ticket';


export const router = createBrowserRouter([
    {
      path: "/",
      element: <Main />, // Главная страница по умолчанию
    },
    {
      path: "/:ticketNumber",
      element: <Ticket />, // Страница с билетом
    },
    {
      path: "/admin",
      element: <Admin />, // Админка
    },
    {
      path: "*",
      element: <Navigate to="/" replace />, // Редирект на Main, если маршрут не найден
    },
  ]);