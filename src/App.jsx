import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import SEO from './components/SEO';
import { ThemeProvider, useTheme } from './context/ThemeContext';
import { useProgress } from './context/ProgressContext';
import { useTopics } from './hooks/useTopics';

// Lazy load components
const TopicViewer = lazy(() => import('./components/TopicViewer'));
const BattlePage = lazy(() => import('./components/Battle/BattlePage'));

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

// Layout Component (Formerly Home logic for structure)
// Handles Sidebar and Main Content wrapper
function Layout() {
  const { lastTopicId, updateCurrentTopic } = useProgress();
  const { topics, loading: topicsLoading, error: topicsError } = useTopics();
  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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


  // Show error state if topics failed to load
  if (topicsError) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        padding: '20px',
        textAlign: 'center'
      }}>
        <h2>❌ Error al cargar topics</h2>
        <p style={{ color: 'var(--text-secondary)', marginTop: '10px' }}>
          {topicsError.message || 'No se pudieron cargar los temas'}
        </p>
        <button
          onClick={() => window.location.reload()}
          style={{
            marginTop: '20px',
            padding: '10px 20px',
            background: 'var(--accent)',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Reintentar
        </button>
      </div>
    );
  }

  // Show loading state while topics are being fetched
  if (topicsLoading) {
    return (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'var(--bg-primary)',
        color: 'var(--text-primary)',
        gap: '24px'
      }}>
        {/* Animated Logo Container */}
        <div style={{
          position: 'relative',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          {/* Pulse Ring */}
          <div style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            border: '3px solid var(--primary)',
            opacity: '0.3',
            animation: 'pulse 2s ease-in-out infinite'
          }} />

          {/* Logo */}
          <img
            src="/logo.png"
            alt="Go Guru"
            style={{
              width: '80px',
              height: '80px',
              borderRadius: '50%',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              animation: 'float 3s ease-in-out infinite',
              position: 'relative',
              zIndex: 1
            }}
          />
        </div>

        {/* Loading Text with Dots Animation */}
        <div style={{
          fontSize: '1.2rem',
          fontWeight: '500',
          display: 'flex',
          alignItems: 'center',
          gap: '4px'
        }}>
          <span>Cargando topics</span>
          <span style={{ display: 'inline-flex', width: '30px' }}>
            <span style={{ animation: 'dot1 1.4s infinite' }}>.</span>
            <span style={{ animation: 'dot2 1.4s infinite' }}>.</span>
            <span style={{ animation: 'dot3 1.4s infinite' }}>.</span>
          </span>
        </div>

        {/* CSS Animations */}
        <style>{`
          @keyframes pulse {
            0%, 100% {
              transform: scale(1);
              opacity: 0.3;
            }
            50% {
              transform: scale(1.3);
              opacity: 0.1;
            }
          }

          @keyframes float {
            0%, 100% {
              transform: translateY(0px) rotate(0deg);
            }
            33% {
              transform: translateY(-10px) rotate(5deg);
            }
            66% {
              transform: translateY(-5px) rotate(-5deg);
            }
          }

          @keyframes dot1 {
            0%, 20%, 100% { opacity: 0; }
            40% { opacity: 1; }
          }

          @keyframes dot2 {
            0%, 40%, 100% { opacity: 0; }
            60% { opacity: 1; }
          }

          @keyframes dot3 {
            0%, 60%, 100% { opacity: 0; }
            80% { opacity: 1; }
          }
        `}</style>
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

