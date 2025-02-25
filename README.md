# P2P Chat Application

A real-time peer-to-peer chat application built with React, WebSocket, and TypeScript. This application allows users to communicate directly with each other, featuring real-time messaging, online status indicators, and offline message storage.

## Features

- 🔐 User authentication with email and phone number
- 🔍 Search users by phone number
- 💬 Real-time messaging
- 🟢 Online status indicators
- 📱 Responsive design
- 💾 Offline message storage
- 🚪 User logout functionality

## Tech Stack

- **Frontend:**
  - React 18
  - TypeScript
  - Tailwind CSS
  - Zustand (State Management)
  - React Router DOM
  - Lucide React (Icons)

- **Backend:**
  - Node.js
  - WebSocket (ws)

## Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (v18 or higher)
- npm (v9 or higher)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd p2p-chat
```

2. Install dependencies:
```bash
npm install
```

## Running the Application

1. Start the WebSocket server:
```bash
npm run server
```

2. In a new terminal, start the frontend development server:
```bash
npm run dev
```

The application will be available at `http://localhost:5173`

## Project Structure

```
p2p-chat/
├── src/
│   ├── pages/
│   │   ├── Chat.tsx        # Main chat interface
│   │   └── SignUp.tsx      # User registration
│   ├── store/
│   │   └── userStore.ts    # Global state management
│   ├── App.tsx             # Root component
│   └── main.tsx           # Entry point
├── server/
│   └── index.js           # WebSocket server
└── package.json
```

## Usage

1. **Sign Up:**
   - Open the application in your browser
   - Enter your name, email, and phone number
   - Click "Sign Up"

2. **Start a Chat:**
   - Click "Add New Chat"
   - Enter the phone number of the user you want to chat with
   - Click the search icon or press Enter

3. **Sending Messages:**
   - Select a chat from the sidebar
   - Type your message in the input field
   - Press Enter or click the send button

4. **Logout:**
   - Click the logout button in the top-right corner

## Development

### Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run preview` - Preview the production build
- `npm run server` - Start the WebSocket server
- `npm run lint` - Run ESLint

### Environment Variables

The application uses the following environment variables:

```env
PORT=8080 # WebSocket server port
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- [Vite](https://vitejs.dev/) - Frontend build tool
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Lucide](https://lucide.dev/) - Icon library
- [Zustand](https://zustand-demo.pmnd.rs/) - State management# pumpkin-assignment
