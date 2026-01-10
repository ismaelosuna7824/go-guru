import { useState, useEffect, lazy, Suspense } from 'react';
import Sidebar from './components/Sidebar';
// Lazy load TopicViewer to reduce initial bundle size
const TopicViewer = lazy(() => import('./components/TopicViewer'));
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useProgress } from './context/ProgressContext';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="toggle-theme-btn"
      onClick={toggleTheme}
      aria-label="Toggle theme"
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? '☀️' : '🌙'}
    </button>
  );
}

// Start fetching topics immediately (in parallel with React rendering)
const topicsPromise = import('./data/topics');

function AppContent() {
  const { lastTopicId, updateCurrentTopic } = useProgress();
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize currentTopicId only after topics are loaded
  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    // Data should be fetching/fetched by now
    topicsPromise.then(module => {
      setTopics(module.topics);
      setIsLoading(false);

      // Set initial topic
      if (lastTopicId && module.topics.find(t => t.id === lastTopicId)) {
        setCurrentTopicId(lastTopicId);
      } else if (module.topics.length > 0) {
        setCurrentTopicId(module.topics[0].id);
      }
    });
  }, [lastTopicId]); // Added lastTopicId dependency to match logic use but simplistic check is fine

  const currentTopic = topics.find(t => t.id === currentTopicId);

  useEffect(() => {
    if (currentTopicId) {
      updateCurrentTopic(currentTopicId);
    }
  }, [currentTopicId, updateCurrentTopic]);

  // Reset to first topic when progress is reset
  useEffect(() => {
    if (lastTopicId === null && topics.length > 0) {
      setCurrentTopicId(topics[0].id);
    }
  }, [lastTopicId, topics]);

  if (isLoading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)'
      }}>
        Cargando...
      </div>
    );
  }

  return (
    <div className="app-layout">
      <Sidebar
        topics={topics} // Pass loaded topics
        currentTopicId={currentTopicId}
        onSelectTopic={(id) => {
          setCurrentTopicId(id);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="main-content">
        <Suspense fallback={<div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>Cargando tema...</div>}>
          <TopicViewer
            topic={currentTopic}
            onOpenSidebar={() => setIsSidebarOpen(true)}
          />
        </Suspense>
      </main>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;

