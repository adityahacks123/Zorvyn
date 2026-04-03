# Zorvyn Finance Dashboard

A premium, interactive frontend dashboard assignment focused on design quality, robust local state management, and modern React implementation.

## Features & Implementation

### 1. Dashboard Overview
- **Core Metrics**: Real-time calculated cards for Total Balance, Income, and Expenses.
- **Visualizations**: Developed clean, responsive charts using Recharts for a Balance Trend (`LineChart`) and Spending Breakdown (`PieChart`). Numbers dynamically update based on global state and local regional choices (Currency).

### 2. Transactions & Data Management
- Complete List view with Date, Category, Type, and Amount.
- **Search & Filtering**: Live search by category name and dropdown filtering for "Income Only" / "Expense Only".
- **Added Export Functionality**: Users can click "Export CSV" to instantly scrape the frontend state and download an Excel-ready data file.

### 3. Role-Based UI (RBAC)
- Built a global toggle in the Header simulating an Admin/Viewer environment.
- **Viewer**: Read-only access to all charts and tables.
- **Admin**: Gains access to an "Add Transaction" modal logic and inline "Delete" buttons inside the table that permanently affect the application state.

### 4. Smart Insights Engine
- Dynamically iterates over transaction arrays to produce real observations.
- Calculates highest category spend%, monthly difference mockups, and dynamic Cash Flow warnings depending on whether the user is running a surplus or deficit.

### 5. Settings & Deep Personalization (Optional Enhancements Done)
- **State Management**: Built custom `React Context` API with `useReducer/useState` deeply bound to Browser `localStorage` for **Data Persistence**.
- **Dark Mode**: Integrated a pure CSS variable-driven Theme engine. Offers a premium "Clean Fintech Light" mode and a highly readable "Soft Slate Dark" mode.
- **Dynamic Localization**: Users can change currency from USD to INR, EUR, or GBP, dynamically affecting every number rendering across the app instantly.

---

## Technical Stack & Choices
- **React + Vite**: Chosen for maximum frontend performance, hot-reloading speed, and zero-boilerplate setup.
- **Vanilla CSS (CSS Modules/Variables)**: Avoided frameworks like Tailwind/MUI to aggressively demonstrate pure CSS competency. Features extensive use of CSS Flexbox/Grid, pseudo-elements, dynamic theming, and glassmorphism UI design.
- **Lucide-React**: Clean, lightweight SVG iconography.

## Getting Started

### Prerequisites
Make sure you have Node installed (v16+).

### Installation
1. Clone the repository
2. Navigate to project root: `cd Zorvyn`
3. Install dependencies:
   ```bash
   npm install
   ```
4. Start the local Vite development server:
   ```bash
   npm run dev
   ```

The dashboard will compile instantly and run locally on `http://localhost:5173/`.
