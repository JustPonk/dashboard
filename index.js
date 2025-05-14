const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const port = 3000;

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static('public'));

app.get('/datos', (req, res) => {
  const data = generarDatos();
  res.json(data);
});

// Función para generar datos simulados
function generarDatos() {
  return {
    temperatura: Math.random() * 40,
    usuariosActivos: Math.floor(Math.random() * 100),
    ventas: (Math.random() * 10000).toFixed(2)
  };
}

// Enviar datos cada 2 segundos a todos los clientes conectados
setInterval(() => {
  const data = generarDatos();
  io.emit('datosTiempoReal', data);
}, 2000);

// Escuchar nuevas conexiones de clientes
io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});

server.listen(port, () => {
  console.log(`Servidor con Socket.IO en http://localhost:${port}`);
});
