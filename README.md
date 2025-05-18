# 📊 Dashboard en Tiempo Real con MongoDB, TailwindCSS y Socket.IO

Este proyecto es una interfaz visual en tiempo real que se conecta a una base de datos MongoDB para mostrar datos actualizados dinámicamente, ideal para monitoreo de métricas como temperatura, ventas o usuarios activos.

---

## ✨ Características Principales

- **Visualización Dinámica:** Gráficos actualizados automáticamente utilizando MongoDB Charts embebido en la interfaz.
- **Actualización en Tiempo Real:** Gracias a `Socket.IO`, los datos nuevos de MongoDB se envían al navegador al instante sin necesidad de recargar.
- **Backend Node.js + Express:** Un servidor ligero que se comunica con MongoDB y transmite eventos al frontend.
- **Estilos Modernos con TailwindCSS:** Toda la interfaz está diseñada con Tailwind para lograr un diseño limpio, responsive y fácil de mantener.
- **Estructura Clara:** Separación de responsabilidades entre HTML, CSS (via Tailwind) y lógica JS (socket + renderización).

---

## 🧩 Lo que hemos implementado

1. **Conexión a MongoDB:** Se configuró una conexión segura entre el backend y una base de datos MongoDB (puede ser Atlas o local).
2. **Escucha de cambios con Change Streams:** El servidor detecta cambios en tiempo real en una colección específica y los emite al cliente.
3. **Socket.IO:** Permite la comunicación bidireccional entre el navegador y el servidor para transmitir los datos nuevos.
4. **Interfaz con TailwindCSS:** Se aplicó Tailwind para lograr una UI moderna sin necesidad de escribir CSS manual.
5. **HTML funcional:** Se estructuró una página clara donde se reciben los datos del socket y se visualizan dinámicamente.
6. **Gráficos con MongoDB Charts:** Se embebieron gráficos generados desde MongoDB Charts para representar visualmente la información.

---

## 🚀 Cómo usar este proyecto

1. Clona el repositorio.
2. Instala las dependencias con `npm install`.
3. Asegúrate de tener MongoDB corriendo y con datos fluyendo.
4. Ejecuta el servidor con `node server.js`.
5. Abre tu navegador en `http://localhost:3000` y ¡listo!

---

## 🧠 Ideal para:

- Dashboards en tiempo real
- Proyectos educativos sobre WebSockets y MongoDB
- Visualización de métricas IoT, eCommerce o apps de usuarios

---
