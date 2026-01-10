# 🐹 Go Guru

**Go Guru** is an interactive web platform designed to master the **Go** programming language (Golang). From basic syntax to advanced concurrency patterns, Go Guru provides structured learning with real-world examples, immediate feedback, and progress tracking.

![Go Guru Preview](/public/logo.png)

## ✨ Features

- **📚 Structured Learning Path**: Carefully curated topics ranging from "Getting Started" to "Advanced Concepts".
- **📝 Interactive Topics**:
  - **Conceptual Guides**: Deep dive into theory with rich text formatting.
  - **Real World Use Cases**: Practical examples showing how concepts are applied in industry.
  - **Interactive Challenges**: Exercises with hidden solutions to test your knowledge.
  - **Testing Examples**: Learn how to write unit tests for each concept.
- **💾 Smart Progress Tracking**:
  - Automatically saves your reading progress locally.
  - Marks topics as **Completed** (✓) only when you've read to the end.
  - Remembers your "Last Active Topic" so you can pick up where you left off.
- **🎨 Modern UI/UX**:
  - **Dark/Light Mode**: Fully responsive theme switching.
  - **Responsive Design**: Optimized for Desktop (sticky sidebar) and Mobile (drawer menu).
  - **Syntax Highlighting**: Beautiful code rendering for easy reading.
- **🔍 Quick Navigation**:
  - **Search**: Instantly filter topics by keyword.
  - **Categories**: Expandable/Collapsible topic groups.

## 🛠️ Tech Stack

Built with a modern frontend stack for performance and developer experience:

- **Frontend Framework**: [React](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: Vanilla CSS with **CSS Variables** for dynamic theming.
- **Analytics**: [Firebase Analytics](https://firebase.google.com/) for usage tracking.
- **Routing**: Custom component-based routing for lightweight performance.
- **State Management**: React Context API (`ProgressContext`, `ThemeContext`).

## 🚀 Getting Started

Follow these steps to run the project locally.

### Prerequisites

- Node.js (v18 or higher)
- pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/go-guru.git
   cd go-guru
   ```

2. **Install Dependencies**
   ```bash
   pnpm install
   ```

3. **Run Development Server**
   ```bash
   pnpm dev
   ```
   Open [http://localhost:5173](http://localhost:5173) in your browser.

## 📂 Project Structure

```bash
src/
├── components/      # UI Components (Sidebar, TopicViewer, etc.)
├── context/         # React Contexts (Progress, Theme)
├── data/            # Static content data (topics.js)
├── styles/          # Global styles and themes (index.css)
├── firebase.js      # Firebase configuration
├── App.jsx          # Main application layout and logic
└── main.jsx         # Entry point
```

## 🧪 Scripts

- `pnpm dev`: Start development server.
- `pnpm build`: Build for production.
- `pnpm preview`: Preview production build locally.
- `pnpm lint`: Run ESLint.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---

Built with ❤️ by [Ismael Osuna](https://www.linkedin.com/in/ismael-osuna)
