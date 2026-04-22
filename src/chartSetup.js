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

// Registro ÚNICO de módulos de Chart.js a nivel de aplicación.
// Evita que se ejecute en cada render de un Provider o componente.
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
