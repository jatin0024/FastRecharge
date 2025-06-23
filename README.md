# FastRecharge

FastRecharge is a modern FASTag auto-recharge platform that helps users manage their FASTag balances, link bank accounts, and automate recharges. Built with React, TypeScript, Tailwind CSS, and Chart.js, it provides a beautiful, production-ready user experience.

## Features

- **User Authentication**: Register and login securely.
- **FASTag Management**: Link your FASTag and view real-time balance.
- **Bank Account Linking**: Securely connect your bank account for recharges.
- **Auto-Recharge**: Set minimum balance thresholds and recharge amounts for automatic top-ups.
- **Manual Recharge**: Instantly recharge your FASTag with preset or custom amounts.
- **Transaction History**: View, search, and filter all your FASTag transactions.
- **Analytics**: Visualize your FASTag balance history with interactive charts.
- **Settings**: Manage auto-recharge preferences and linked accounts.
- **Responsive Design**: Fully responsive and mobile-friendly UI.
- **Beautiful UI**: Built with Tailwind CSS and Lucide icons for a modern look.

- ![image](https://github.com/user-attachments/assets/0c8453e4-4e56-484b-bfcf-e0b893d1a8ff)
- ![image](https://github.com/user-attachments/assets/377d948d-debd-47f2-b490-077f94c5ab71)



## Tech Stack

- **Frontend**: React, TypeScript, React Router, Framer Motion
- **Styling**: Tailwind CSS, PostCSS
- **Charts**: Chart.js, react-chartjs-2
- **Icons**: Lucide React
- **State Management**: React Context API
- **Build Tool**: Vite

## Project Structure

```
src/
  components/
    auth/
    dashboard/
    layout/
  contexts/
  pages/
    auth/
    dashboard/
    settings/
    transactions/
  App.tsx
  main.tsx
  index.css
public/
index.html
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm

### Installation

1. **Clone the repository:**
   ```sh
   git clone https://github.com/yourusername/fastrecharge.git
   cd fastrecharge
   ```

2. **Install dependencies:**
   ```sh
   npm install
   ```

3. **Start the development server:**
   ```sh
   npm run dev
   ```

4. **Open in your browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### Build for Production

```sh
npm run build
```

### Lint the Code

```sh
npm run lint
```

## Demo Credentials

For demo purposes, you can log in with:
- **Email:** demo@example.com
- **Password:** password

Or register a new account.

## Customization

- Update branding, links, and contact info in [`src/components/layout/Footer.tsx`](src/components/layout/Footer.tsx).
- Adjust authentication logic in [`src/contexts/AuthContext.tsx`](src/contexts/AuthContext.tsx).
- Modify FASTag and bank logic in [`src/contexts/FasTagContext.tsx`](src/contexts/FasTagContext.tsx).

## License

This project is for demonstration and educational purposes.

---
