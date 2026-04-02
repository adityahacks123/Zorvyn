# Zorvyn - Premium Finance Dashboard

A clean, interactive, and premium finance dashboard built with **React**, **Vite**, and **Recharts**. This project demonstrates advanced frontend capabilities including state management, data visualization, and Role-Based Access Control (RBAC).

## 🚀 Key Features

### 1. Dashboard Overview
- **Summary Cards**: Real-time tracking of Total Balance, Income, and Expenses with trend indicators.
- **Balance Trend**: Interactive line chart showing financial activity over time.
- **Spending Breakdown**: Categorical visualization (Donut chart) with a detailed value legend.
- **Smart Insights**: Dynamic AI-like observations (Highest spending category, savings tips).

### 2. Transactions Management
- **Full Ledger**: Comprehensive list of all financial activities.
- **Search & Filter**: Filter transactions by category (Food, Salary, etc.) or type (Income/Expense).
- **Pagination**: Optimized for performance with smooth page transitions.
- **Export**: One-click **Export to CSV** functionality for external reporting.

### 3. Role-Based Access Control (RBAC)
- **Viewer Role**: Read-only access to the dashboard and transactions. Mutation buttons (Add/Edit/Delete) are hidden.
- **Admin Role**: Full management capabilities. Can create, update, and delete transactions.
- **Live Switching**: Toggle roles instantly via the Settings panel to see the UI behavior change.

### 4. Technical Highlights
- **State Management**: Handled via React Context API + `useReducer` pattern for robust data flow.
- **Persistence**: Data is persisted across sessions using `localStorage`.
- **Premium UI/UX**:
  - **Dark Mode**: Deep dark aesthetic with glassmorphism effects.
  - **Responsiveness**: Fully fluid layout for desktop, tablet, and mobile.
  - **Animations**: Subtle transitions and hover effects for a premium feel.

## 🛠️ Technology Stack
- **Framework**: React 18+ (Vite)
- **Styling**: Vanilla CSS with CSS Modules/Variables for maximum control.
- **Charts**: Recharts
- **Icons**: Lucide React
- **Typography**: Inter / Outfit

## 📦 Setup Instructions

1. **Clone the repository**:
   ```bash
   git clone https://github.com/adityahacks123/Zorvyn.git
   cd Zorvyn
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run in development mode**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   ```

## 📂 Project Structure
```text
/src
  /components
    /layout     # Sidebar, Header
    /charts     # BalanceTrend, SpendingBreakdown
    /ui         # SummaryCards, Table, Modals
  /context      # FinanceContext (State Management)
  /data         # Mock data & Utilities
  /pages        # DashboardPage (Main View)
  /styles       # Global tokens & themes
```

---
*Developed by Aditya Singh*
