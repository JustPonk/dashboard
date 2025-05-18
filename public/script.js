const socket = io();

const ctxTemp = document.getElementById('graficoTemperatura').getContext('2d');
const ctxUsuarios = document.getElementById('graficoUsuarios').getContext('2d');
const ctxVentas = document.getElementById('graficoVentas').getContext('2d');

const tempChart = new Chart(ctxTemp, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Temperatura',
      data: [],
      borderColor: 'red',
      borderWidth: 2,
      fill: false
    }]
  }
});

const usuariosChart = new Chart(ctxUsuarios, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Usuarios Activos',
      data: [],
      borderColor: 'blue',
      borderWidth: 2,
      fill: false
    }]
  }
});

const ventasChart = new Chart(ctxVentas, {
  type: 'line',
  data: {
    labels: [],
    datasets: [{
      label: 'Ventas',
      data: [],
      borderColor: 'green',
      borderWidth: 2,
      fill: false
    }]
  }
});

socket.on('datosTiempoReal', (data) => {
  const hora = new Date().toLocaleTimeString();

  // Temperatura
  tempChart.data.labels.push(hora);
  tempChart.data.datasets[0].data.push(data.temperatura);
  if (tempChart.data.labels.length > 10) {
    tempChart.data.labels.shift();
    tempChart.data.datasets[0].data.shift();
  }
  tempChart.update();

  // Usuarios
  usuariosChart.data.labels.push(hora);
  usuariosChart.data.datasets[0].data.push(data.usuariosActivos);
  if (usuariosChart.data.labels.length > 10) {
    usuariosChart.data.labels.shift();
    usuariosChart.data.datasets[0].data.shift();
  }
  usuariosChart.update();

  // Ventas
  ventasChart.data.labels.push(hora);
  ventasChart.data.datasets[0].data.push(data.ventas);
  if (ventasChart.data.labels.length > 10) {
    ventasChart.data.labels.shift();
    ventasChart.data.datasets[0].data.shift();
  }
  ventasChart.update();
});
