import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SEO from './components/SEO';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useProgress } from './context/ProgressContext';

// Lazy load components
const TopicViewer = lazy(() => import('./components/TopicViewer'));
const BattlePage = lazy(() => import('./components/Battle/BattlePage'));

// Start fetching topics immediately (in parallel with React rendering)
const topicsPromise = import('./data/topics');

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




// Layout Component (Formerly Home logic for structure)
// Handles Sidebar and Main Content wrapper
function Layout() {
  const { lastTopicId, updateCurrentTopic } = useProgress();
  const [topics, setTopics] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
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
  }, [lastTopicId]);

  // Context-like prop passing for the specific topic viewer case
  // When we are at root '/', we want to show the TopicViewer.
  // The Sidebar needs to know about currentTopicId.
  // We can pass context via Outlet, but easier to just manage state here if Sidebar controls it.

  // NOTE: If we are in /battle, currentTopicId might be irrelevant for the view, 
  // but Sidebar still highlights it. Maybe we deselect if not in topic mode?
  // Let's keep it simple.

  useEffect(() => {
    if (currentTopicId && location.pathname === '/') {
      updateCurrentTopic(currentTopicId);
    }
  }, [currentTopicId, updateCurrentTopic, location.pathname]);

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

  const currentTopic = topics.find(t => t.id === currentTopicId);

  return (
    <div className="app-layout">
      <SEO />
      <Sidebar
        topics={topics}
        currentTopicId={location.pathname === '/' ? currentTopicId : null} // Only highlight if at home
        onSelectTopic={(id) => {
          setCurrentTopicId(id);
          setIsSidebarOpen(false);
          navigate('/'); // Ensure we go back to home when a topic is selected
        }}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="main-content">
        {/* We can remove the local header button since it's in Sidebar now */}
        {/* Render the matching child route */}
        <Suspense fallback={<div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>Cargando...</div>}>
          {/* Pass props to outlet if needed, e.g. currentTopic */}
          <Outlet context={{ currentTopic, setIsSidebarOpen }} />
        </Suspense>
      </main>
    </div>
  );
}

// Wrapper for TopicViewer to consume Outlet context
function TopicViewerRoute() {
  const { currentTopic, setIsSidebarOpen } = useOutletContext();
  if (!currentTopic) return null;
  return <TopicViewer topic={currentTopic} onOpenSidebar={() => setIsSidebarOpen(true)} />;
}

// Helper to use context (since TopicViewerRoute is a distinct component now or we can just inline)


function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<TopicViewerRoute />} />
      </Route>
      {/* 
         Battle Mode outside of Layout to remove Sidebar as requested.
         It will take full screen 
      */}
      <Route
        path="/battle/*"
        element={
          <Suspense fallback={<div style={{ color: 'white', padding: '20px' }}>Cargando Batalla...</div>}>
            <BattlePage />
          </Suspense>
        }
      />
    </Routes>
  );
}

function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AppContent />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;

