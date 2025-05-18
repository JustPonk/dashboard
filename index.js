const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose'); // <- NUEVO

const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const port = 3000;

// 👉 CONECTAR A MONGODB ATLAS (PEGA TU CONNECTION STRING AQUÍ)
mongoose.connect('mongodb+srv://admin:neron5252@cluster0.pdc2lxd.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
  .then(() => console.log('✅ Conectado a MongoDB Atlas'))
  .catch(err => console.error('❌ Error al conectar a MongoDB:', err));


// 👉 MODELO DE DATO
const Dato = mongoose.model('Dato', new mongoose.Schema({
  timestamp: { type: Date, default: Date.now },
  temperatura: Number,
  usuariosActivos: Number,
  ventas: Number
}));

// 👉 Servir archivos estáticos desde "public"
app.use(express.static('public'));

app.get('/datos', async (req, res) => {
  const data = generarDatos();
  res.json(data);
});

app.get('/historial', async (req, res) => {
  try {
    const ultimosDatos = await Dato.find().sort({ timestamp: -1 }).limit(20);
    res.json(ultimosDatos);
  } catch (err) {
    res.status(500).json({ error: 'Error obteniendo historial' });
  }
});


// 👉 Función para generar datos simulados
function generarDatos() {
  return {
    temperatura: Math.random() * 40,
    usuariosActivos: Math.floor(Math.random() * 100),
    ventas: parseFloat((Math.random() * 10000).toFixed(2))
  };
}

// 👉 Emitir y guardar datos cada 2 segundos
setInterval(() => {
  const data = generarDatos();

  io.emit('datosTiempoReal', data); // enviar a clientes

  const nuevoDato = new Dato(data); // guardar en MongoDB
  nuevoDato.save().catch(err => console.error('Error guardando en MongoDB:', err));
}, 2000);

// 👉 Escuchar conexiones Socket.IO
io.on('connection', (socket) => {
  console.log('🔌 Cliente conectado');
  socket.on('disconnect', () => console.log('❌ Cliente desconectado'));
});

// 👉 Iniciar

server.listen(port, () => {
  console.log(`🚀 Servidor con Socket.IO en http://localhost:${port}`);
});
