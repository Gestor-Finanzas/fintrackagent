import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement,
} from "chart.js";

// Registro global de los módulos de Chart.js usados por la app. Importado
// desde main.jsx para que corra una sola vez al arrancar.
Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
  BarElement,
);
