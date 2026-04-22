# FinTrack

Plataforma de gestión financiera personal: registra gastos e ingresos por **WhatsApp con lenguaje natural**, IA que categoriza automáticamente, y un **dashboard web** completo con autenticación, perfil de usuario, internacionalización (ES / EN) y analítica.

---

## Stack técnico

| Categoría | Tecnología |
|---|---|
| Framework | React 19 |
| Build tool | Vite 7 |
| Routing | React Router DOM 7 |
| Estilos | Tailwind CSS 3 + PostCSS + Autoprefixer |
| Gráficos | Chart.js 4 + react-chartjs-2 |
| Backend / Auth / DB | Supabase (PostgreSQL + Auth + RLS) |
| Internacionalización | i18next + react-i18next |
| Iconos | React Icons |
| Date Picker | react-datepicker |
| Deploy | Vercel |

---

## Requisitos

- Node.js ≥ 18
- npm ≥ 9
- Cuenta de Supabase

---

## Instalación

```bash
git clone https://github.com/Gestor-Finanzas/fintrackagent.git
cd fintrackagent
npm install
```

### Variables de entorno

Copia `.env.example` a `.env` y rellena con los valores de tu proyecto de Supabase (Settings → API):

```bash
VITE_SUPABASE_URL=https://<tu-proyecto>.supabase.co
VITE_SUPABASE_ANON_KEY=<tu-anon-key>
```

> Usa solo la **anon key** (pública). Nunca pongas la `service_role` key en el frontend.
> Todas las variables expuestas al cliente deben empezar por `VITE_`.

---

## Desarrollo

```bash
npm run dev
```

Abre http://localhost:3000

## Build de producción

```bash
npm run build
```

Los archivos estáticos se generan en `/build`.

Para previsualizar el build localmente:

```bash
npm run preview
```

---

## Funcionalidades

### Landing page

- **Hero** con preview del dashboard y CTAs
- **Producto** — presentación del agente IA "Fin"
- **Características** — 6 features principales
- **Workflow** — proceso de uso en 6 pasos
- **Planes y precios** — trial 14 días, mensual (2,99 €/mes) y anual (29,99 €/año)
- **Formulario de contacto**
- **Páginas legales** — privacidad, términos, cookies, seguridad, FAQs, empresa
- **Multilenguaje** — toggle ES / EN completo

### Autenticación

- Login y registro contra Supabase Auth
- Modal rápido + página dedicada (`/login`)
- Guards: `ProtectedRoute` para zonas privadas, `PublicOnlyRoute` para redirigir si ya hay sesión
- Sesión persistida con `localStorage` (Supabase SDK)
- Errores traducidos (credenciales, email no confirmado, rate limit, etc.)

### Dashboard

- **Overview** — saludo dinámico por hora, KPIs (ingresos, gastos, balance), gráfico de líneas con leyenda togglable, donut por categorías, últimos movimientos
- **Ingresos / Gastos** — evolución temporal, desglose por categoría, tabla CRUD
- **Balance** — balance neto, evolución, comparativa ingresos vs gastos, tasa de ahorro
- **Categorías** — crear / editar / eliminar categorías y subcategorías con iconos y colores
- **Facturación** — plan actual, timeline de suscripción, historial de facturas, cancelación
- **Planes** — cambio entre mensual / anual
- **Perfil** — datos principales (nombre, apellidos, email, teléfono) + datos extendidos (dirección, sexo, ciudad, fecha nacimiento), cambio de contraseña con verificación de contraseña actual, eliminación de cuenta
- **Sugerencias** — formulario de feedback
- **Filtro de periodo** — semana, mes, año o rango personalizado (calcula fechas reales)

### Estado y datos

- `AuthContext` — sesión Supabase reactiva
- `ProfileContext` — perfil del usuario (nombre, apellidos, iniciales, etc.) con `updateProfile()` que mantiene sincronizado el navbar, el saludo y Perfil
- `DashboardContext` — movimientos del usuario (fetch desde Supabase), totales y CRUD
- Row Level Security activado en todas las tablas (`profiles`, `movimientos`, `categorias`)

---

## Estructura del proyecto

```
fintrackagent/
├── public/
│   └── assets/                  # Logos e imágenes
├── src/
│   ├── components/
│   │   ├── landing_page/        # Navbar, Hero, Features, Pricing, Contact, pages/
│   │   ├── dashboard/
│   │   │   ├── components/      # SummaryCard, ChartCard, PeriodFilter, TransactionsTable, modales
│   │   │   ├── pages/           # Overview, Ingresos, Gastos, Balance, Perfil, Facturacion, etc.
│   │   │   ├── hooks/           # DashboardContext (movimientos + filtros)
│   │   │   ├── DashboardLayout.jsx
│   │   │   └── DashboardNavbar.jsx
│   │   ├── login/               # AuthForm, ProtectedRoute, PublicOnlyRoute
│   │   ├── ErrorBoundary.jsx
│   │   └── NotFound.jsx
│   ├── contexts/                # AuthContext, ProfileContext
│   ├── lib/                     # supabase.js (client)
│   ├── locales/                 # es/translation.json, en/translation.json
│   ├── utils/                   # formatEuro, formatNumber, iconos, colores
│   ├── hooks/                   # useEscapeKey, etc.
│   ├── App.jsx                  # Router + providers
│   ├── i18n.js                  # Configuración i18next
│   └── main.jsx                 # Entry point (Vite)
├── index.html                   # Entry HTML de Vite
├── vite.config.js
├── .env.example
├── vercel.json                  # Headers de seguridad y SPA rewrites
├── tailwind.config.js
├── postcss.config.js
└── package.json
```

---

## Rutas

| Ruta | Descripción | Acceso |
|---|---|---|
| `/` | Landing page | Público |
| `/empresa`, `/faqs`, `/contacto` | Páginas informativas | Público |
| `/privacidad`, `/terminos`, `/cookies`, `/seguridad` | Legales | Público |
| `/login` | Login / registro | Solo invitados |
| `/dashboard` | Overview | Privado |
| `/dashboard/ingresos` · `/gastos` · `/balance` | Analítica | Privado |
| `/dashboard/categorias` | Gestión de categorías | Privado |
| `/dashboard/facturacion` · `/planes` | Suscripción | Privado |
| `/dashboard/perfil` | Perfil de usuario | Privado |
| `/dashboard/sugerencias` | Feedback | Privado |

---

## Deploy

Configurado para Vercel con [`vercel.json`](./vercel.json):

- SPA rewrite (`/(.*) → /index.html`)
- Headers de seguridad (`X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`)
- Cache `immutable` para `/static` y `/assets`

En Vercel, añade las variables de entorno en **Settings → Environment Variables** y la primera build se desplegará automáticamente tras `git push`.

---

## Licencia

Proyecto privado. Todos los derechos reservados.
