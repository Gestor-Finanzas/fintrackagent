# FinTrackAgent

Plataforma de gestión financiera personal que permite registrar gastos e ingresos a través de **WhatsApp usando lenguaje natural**, con categorización automática por IA y un dashboard web completo para análisis y visualización.

---

## Stack tecnológico

| Categoría | Tecnología |
|---|---|
| **Framework** | React 19 |
| **Build tool** | Vite 7 |
| **Routing** | React Router DOM 7 |
| **Estilos** | Tailwind CSS 3, PostCSS, Autoprefixer |
| **Gráficos** | Chart.js 4 + react-chartjs-2 |
| **Animaciones** | AOS (Animate On Scroll) |
| **Iconos** | React Icons |
| **Date Picker** | react-datepicker |

---

## Requisitos

- Node.js >= 18
- npm >= 9

---

## Instalación

```bash
git clone https://github.com/ivangarmar22/fintrackagent_frontend.git
cd fintrackagent_frontend
npm install
```

## Desarrollo

```bash
npm run dev
```

Abrir: http://localhost:5173

## Build de producción

```bash
npm run build
```

Los archivos se generan en `/dist`.

Para previsualizar el build:

```bash
npm run preview
```

---

## Funcionalidades

### Landing page

- **Hero** con preview del dashboard y CTAs
- **Producto** — Presentación del agente IA "Fin" con integración WhatsApp
- **Características** — 6 features principales (registro por WhatsApp, dashboard, privacidad, alertas, exportación CSV, multiplataforma)
- **Workflow** — Proceso de uso en 6 pasos
- **Planes y precios** — Trial gratuito 14 días, mensual (2.99 EUR/mes) y anual (30 EUR/año)
- **Formulario de contacto** con validaciones
- **Páginas legales** — Privacidad, Términos, Cookies, Seguridad, FAQs, Empresa

### Autenticación

- Login y registro con validación de campos
- Rutas protegidas con token en localStorage
- Toggle entre modo login/registro

### Dashboard

- **Overview** — Saludo dinámico, 3 KPIs (ingresos, gastos, balance), gráfico de líneas, donut por categorías, últimas transacciones
- **Ingresos** — Evolución temporal, desglose por categoría, tabla CRUD completa
- **Gastos** — Evolución temporal, desglose por categoría, tabla CRUD completa
- **Balance** — Balance acumulado, comparativa ingresos vs gastos, tasa de ahorro
- **Categorías** — Gestión de categorías con iconos y colores personalizables (30+ iconos)
- **Facturación** — Plan actual, historial de facturas, cambio/cancelación de plan
- **Perfil** — Edición de datos personales y cambio de contraseña

### Componentes reutilizables

- `SummaryCard` — Tarjeta KPI con icono y valor
- `ChartCard` — Contenedor para gráficos
- `PeriodFilter` — Selector de periodo (hoy, semana, mes, año, rango personalizado)
- `TransactionsTable` — Tabla con modales de añadir, editar y eliminar
- `CategoryBreakdown` — Desglose por categoría con porcentajes

---

## Estructura del proyecto

```
fintrackagent/
├── public/
│   └── assets/
│       ├── logo.png
│       └── logo2.png
├── src/
│   ├── components/
│   │   ├── landing_page/       # Navbar, Hero, Features, Pricing, etc.
│   │   │   └── pages/          # Empresa, FAQs, Legal, Contacto
│   │   ├── dashboard/
│   │   │   ├── components/     # SummaryCard, ChartCard, PeriodFilter, etc.
│   │   │   ├── pages/          # Overview, Ingresos, Gastos, Balance, etc.
│   │   │   │   └── legal/      # FAQs, Privacidad, Términos (dashboard)
│   │   │   └── hooks/          # useDashboardData
│   │   └── login/              # Auth, ProtectedRoute
│   ├── utils/                  # Formateo (EUR, fechas), iconos, colores
│   ├── mocks/                  # Datos mock (usuario, transacciones, facturas)
│   ├── App.jsx                 # Router principal
│   ├── index.js                # Entry point
│   └── index.css               # Tailwind + estilos globales
├── index.html                  # HTML principal (Vite)
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Rutas

| Ruta | Descripción |
|---|---|
| `/` | Landing page |
| `/sobre-nosotros` | Sobre nosotros |
| `/empresa` | Información de la empresa |
| `/faqs` | Preguntas frecuentes |
| `/contacto` | Página de contacto |
| `/privacidad` | Política de privacidad |
| `/terminos` | Términos de servicio |
| `/cookies` | Política de cookies |
| `/seguridad` | Seguridad |
| `/dashboard` | Overview (protegida) |
| `/dashboard/ingresos` | Análisis de ingresos |
| `/dashboard/gastos` | Análisis de gastos |
| `/dashboard/balance` | Balance general |
| `/dashboard/categorias` | Gestión de categorías |
| `/dashboard/facturacion` | Facturación y planes |
| `/dashboard/perfil` | Perfil de usuario |

---

## Licencia

Proyecto privado. Todos los derechos reservados.
