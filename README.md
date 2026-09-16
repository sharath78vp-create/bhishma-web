# 🌐 SkillBridge (Bhishma Web)

> **Workforce Intelligence & Education Analytics Platform**  
> Bridging the gap between **Student Interest**, **Academic Curriculum**, and **Industry Hiring Demand** through real-time telemetry, predictive analytics, and institutional diagnostic tools.

---

## 📌 Overview

**SkillBridge** is a next-generation workforce intelligence single-page application built to help education administrators, government officers, universities, faculty, and students analyze and align workforce skills in real time.

The platform provides multi-stakeholder portals that map real-world job requisitions against college curricula to identify acute talent shortages, curriculum bottlenecks, and emerging technological trends.

---

## 🚀 Key Features & Modules

### 1. 📊 Officer / Intelligence Command Center
* **Skill Demand Intelligence** (`/intelligence/skill-demand`):
  * **Multidimensional Filtering**: Filter across *Time Period*, *Industry*, *Skill Category*, and *Institution Type* with real-time keyword search.
  * **Key Performance Indicators**: 5 dynamic KPI cards tracking High-Demand Skills, Critical Skill Gaps, Student Interest %, Curriculum Coverage %, and Overall Demand-Supply Gap.
  * **Student Interest vs. Industry Demand**: Grouped comparative bar chart with multi-parameter sorting (*Highest Demand*, *Largest Gap*, *Highest Interest*).
  * **Skill Demand & Supply Heatmap**: 6-metric matrix scoring interest, curriculum depth, corporate demand, student supply, gap severity, and YoY growth.
  * **Curriculum Alignment**: Dual progress visualizer diagnosing syllabus coverage vs. market demand with actionable status badges (*Critical Revision*, *High Priority*, *Moderate*, *Stable*).
  * **Workforce Quadrant Scatter Chart**: 4-Zone Matrix plotting skills into *Critical Talent Shortage*, *Aligned Skills*, *Potential Oversupply*, and *Low Priority*.
  * **Skill Shortage Watchlist & Emerging Demand Signals**: Real-time deficit rankings and 12-month momentum sparklines.
  * **Dynamic AI Insight Panel**: Real-time narrative synthesis highlighting acute mismatches and curriculum intervention triggers.
  * **Skill Drilldown & Side-by-Side Comparison**: Comprehensive detail modal with 12-month trajectory curves, active recruiters, prerequisites, and comparison tray.

* **Market Overview & Labour Market Command Center**:
  * Real-time tracking of active job postings, median compensation packages, and hiring sector concentrations.
* **Emerging Skills & Trajectory Forecasts**:
  * Predictive momentum curves and requisition acceleration rates across modern technologies.
* **Regional Trends & Spatial Intelligence**:
  * Geospatial cluster telemetry and district-level workforce demand mapping.
* **Curriculum Recommendations & Evidence Drawer**:
  * Actionable syllabus interventions backed by industry requisition data and employer surveys.

---

### 2. 🏛️ Multi-Role Stakeholder Portals
* **Institute Portal**: Departmental readiness diagnostics, batch placement metrics, and syllabus compliance scoring.
* **Faculty / Trainer Portal**: Course module delivery analytics, student competency assessments, and lab intervention tools.
* **Student Portal**: Skill gap self-assessment, career roadmap explorer, and demand-aligned course recommendations.
* **What-If Workforce Simulator**: Predictive scenario simulator modeling the impact of curriculum updates on graduate employability.

---

## 🛠️ Technology Stack

| Layer | Technology |
| :--- | :--- |
| **Framework & Core** | [React 19](https://react.dev/) & [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite 8](https://vitejs.dev/) |
| **Routing** | [React Router DOM v7](https://reactrouter.com/) |
| **Styling & Design System** | [Tailwind CSS](https://tailwindcss.com/) & [PostCSS](https://postcss.org/) |
| **Data Visualizations** | [Recharts 3](https://recharts.org/) |
| **Maps & Geospatial** | [Leaflet](https://leafletjs.com/) & [React-Leaflet](https://react-leaflet.js.org/) |
| **Icons & Micro-UI** | [Lucide React](https://lucide.dev/) |
| **Code Quality & Linting** | [Oxlint](https://oxc.rs/) |

---

## 📁 Directory Structure

```text
bhishma-web/
├── public/                 # Static assets & icons
├── src/
│   ├── assets/             # Vector graphics, logos & illustrations
│   ├── components/         # Modular, reusable UI components
│   │   ├── charts/         # Base chart containers & Recharts wrappers
│   │   ├── common/         # Buttons, Badges, Cards, Modals, Navigation
│   │   ├── illustrations/  # Vector UI illustrations
│   │   ├── intelligence/   # Intelligence dashboard & Skill Demand components
│   │   │   └── skillDemand/ # Header, KPIs, Heatmap, Quadrant, Modals
│   │   └── maps/           # Leaflet & spatial map visualizers
│   ├── config/             # Map tile configurations & global constants
│   ├── context/            # Global React state (Auth, Active Role, Filters)
│   ├── layouts/            # Dashboard & portal layout shells
│   ├── mock/               # Typed mock datasets (Ready for API integration)
│   ├── pages/              # Route views organized by stakeholder domain
│   │   ├── intelligence/   # Skill Demand, Market Overview, Regional Trends
│   │   ├── institute/      # Institutional analytics & curriculum alignment
│   │   ├── trainer/        # Faculty course tracking
│   │   ├── student/        # Student portal & career planner
│   │   └── simulator/      # What-If workforce scenario simulator
│   ├── routes/             # React Router routing configuration & guards
│   ├── types/              # TypeScript interface & data contract definitions
│   ├── utils/              # Calculation helpers, formatters & telemetry math
│   ├── App.tsx             # Root application component
│   ├── index.css           # Global Tailwind CSS design tokens
│   └── main.tsx            # Application entry point
├── package.json            # Project dependencies & scripts
├── tailwind.config.js      # Design tokens & color palette configuration
├── tsconfig.json           # TypeScript compiler configuration
└── vite.config.ts          # Vite build & plugin configuration
```

---

## 💻 Getting Started

### Prerequisites
* **Node.js**: `v18.0.0` or higher
* **npm**: `v9.0.0` or higher

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sharath78vp-create/bhishma-web.git
   cd bhishma-web
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:5173`.

---

## 📜 Available Scripts

| Command | Description |
| :--- | :--- |
| `npm run dev` | Starts the Vite local development server with Hot Module Replacement (HMR). |
| `npm run build` | Runs TypeScript type checks (`tsc -b`) and bundles production assets with Vite. |
| `npm run preview` | Locally serves the production build output from `dist/`. |
| `npm run lint` | Runs `oxlint` to check code quality and lint rules across the project. |

---

## 🔌 API & Backend Integration

All dashboard components and charts are decoupled from mock data using strongly typed interfaces located in:
* [`src/types/skillbridge.ts`](./src/types/skillbridge.ts)
* [`src/mock/skillDemandIntelligenceData.ts`](./src/mock/skillDemandIntelligenceData.ts)

To connect live backend endpoints, swap the mock utility calls with your backend REST API or GraphQL client (e.g., Axios / TanStack Query) using the established data contracts.

---

## 📄 License

This project is private and proprietary to **SkillBridge / Bhishma**. All rights reserved.
