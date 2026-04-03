# 👋 Welcome to the Zorvyn Finance Dashboard!

Hey there! Welcome to Zorvyn, a modern, highly-interactive personal finance tracking dashboard. I built this project to demonstrate a clean UI/UX, robust frontend state management, and real-time data reactivity without needing a heavy backend. 

Everything you do here happens live. If you add a $50 expense, the charts, balances, and insights instantly shift to reflect it.

---

## 🗺️ A Quick Tour of the App

Here is a breakdown of what you can do and where everything lives:

### 1. The Dashboard (Your Home Base)
When you first open the app, you land here. It gives you a bird's-eye view of your financial health.
- At the top, you'll see your **Total Balance, Income, and Expenses** calculated perfectly from your raw data.
- Below that, you have beautifully animated charts. The **Line Chart** tracks your trend over the last 6 months, while the **Pie Chart** gives you a dynamic breakdown of exactly where your money went this month.

### 2. Transactions (The Data Engine)
Click over to the **Transactions** tab on the left. This is where your actual spending data lives!
- You can heavily interact with this table: **Search** for specific things like "Salary" or use the **Dropdown** to only look at your Expenses.
- **Bonus Feature:** Need this data in Excel? Just click the **Export CSV** button and it will instantly download your parsed spreadsheet right to your computer.

### 3. Smart Insights (Your AI Advisor)
I didn't just want to show raw numbers, I wanted the app to *understand* them.
- If you head to the **Insights** tab, the app actively reads your arrays and generates observations for you.
- It will tell you exactly what your **highest spending category** is (and what % of your total spend it makes up) and warn you if your **Cash Flow is negative**. If you change your spending in the transactions tab, these AI insights will change their tone automatically!

### 4. Settings & Personalization
Head over to the **Settings** tab to truly make the app yours.
- **Dark/Light Mode:** You can toggle between a plush, premium Light Mode or an easy-on-the-eyes Soft Slate Dark Mode.
- **Global Currency:** Are you in Europe or India? Change the dropdown from `USD ($)` to `EUR (€)` or `INR (₹)`, and watch *every single number in the entire app* magically update its symbol.
- **Danger Zone / Reset:** Messed up your data? Hit the "Reset all Data" button to cleanly wipe your local storage and refresh the mock data back to factory settings.

---

## 🎭 Roles: Who can do what?

We built a strict Role-Based Access system (RBAC). You can swap between roles using the dropdown in the top right corner of the header!

- 👤 **Viewer Role:** This is the safe mode. Viewers can play with the dashboard, search through transactions, read insights, and export data. However, they **cannot** add, edit, or delete any of the financial data.
- 👑 **Admin Role:** Admins have the keys to the kingdom. If you switch to Admin and go to the Transactions tab, you will suddenly see an **"Add Transaction"** button appear, complete with a beautiful form to input new money. You'll also notice red **"X" (Delete)** buttons appear next to every transaction in the table, allowing you to permanently remove data.

---

## 🛠️ How It Was Built (The Tech Stuff)

- **React & Vite:** Built using functional components and React Hooks for maximum speed and zero lag.
- **Pure CSS Mastery:** Instead of using bulky UI libraries like Tailwind or Material UI, every single pixel, glass-pane shadow, and dynamic theme variable was hand-written using Vanilla CSS Modules and CSS Variables.
- **Context API + Local Storage:** There is no heavy backend! Everything is wrapped in a unified global React `<FinanceContext>`. If you refresh your page, you won't lose your data—it is instantly parsed and saved directly into your browser's persistent `localStorage`.
- **Recharts:** Used for generating the seamless, smooth SVG graphs.

---

## 🚀 How to Run the App Yourself

It takes less than 30 seconds to get the app running on your machine!

1. **Clone or Download** this repository.
2. Open your terminal and navigate to the folder:
   ```bash
   cd Zorvyn
   ```
3. Install the required Node packages:
   ```bash
   npm install
   ```
4. Start the lightning-fast Vite development server:
   ```bash
   npm run dev
   ```
5. Open your browser and go to `http://localhost:5173/`. 

Enjoy playing around with your funds!
