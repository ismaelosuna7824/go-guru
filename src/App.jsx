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

      // Set initial topic based on URL if present, otherwise fall back to history or first topic
      // The topic will be handled dynamically by the route, but we might want to default logic here if needed.
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
        currentTopicId={currentTopicId}
        onSelectTopic={(id) => {
          // Navigate to the topic URL
          navigate(`/${id}`);
          setIsSidebarOpen(false);
        }}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />

      <main className="main-content">
        {/* We can remove the local header button since it's in Sidebar now */}
        {/* Render the matching child route */}
        <Suspense fallback={<div className="p-8 text-center" style={{ color: 'var(--text-secondary)' }}>Cargando...</div>}>
          {/* Pass props to outlet if needed, e.g. currentTopic */}
          <Outlet context={{ topics, currentTopic, setIsSidebarOpen }} />
        </Suspense>
      </main>
    </div>
  );
}

// Wrapper for TopicViewer to consume URL params
import { useParams, Navigate } from 'react-router-dom';

function TopicViewerRoute() {
  const { topicId } = useParams();
  const { updateCurrentTopic } = useProgress();
  // Get topics from context, defaulting to empty array if undefined to prevent crash
  const { topics = [], setIsSidebarOpen } = useOutletContext() || {};

  // Find the topic based on URL param
  const topic = topics ? topics.find(t => t.id === topicId) : null;

  useEffect(() => {
    if (topicId && topic) {
      updateCurrentTopic(topicId);
    }
  }, [topicId, topic, updateCurrentTopic]);

  if (!topics || topics.length === 0) return <div>Cargando...</div>;

  // If we are at root / and have topics, redirect to the first one
  if (!topicId) {
    if (topics.length > 0) {
      return <Navigate to={`/${topics[0].id}`} replace />;
    }
  }

  if (topicId && !topic) {
    return <div>Tema no encontrado</div>;
  }

  return <TopicViewer topic={topic} onOpenSidebar={() => setIsSidebarOpen(true)} />;
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Index route redirects to first topic in TopicViewerRoute logic or we can be explicit */}
        <Route index element={<TopicViewerRoute />} />
        <Route path=":topicId" element={<TopicViewerRoute />} />
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

