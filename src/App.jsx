import { useState, useEffect, lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, Outlet, useLocation, useOutletContext } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import ActivityBar from './components/ActivityBar';
import StatusBar from './components/StatusBar';
import AchievementNotification from './components/AchievementNotification';
import SEO from './components/SEO';
import { ThemeProvider } from './context/ThemeContext';
import { useProgress } from './context/ProgressContext';
import { useTopics } from './hooks/useTopics';

// Lazy load components
const TopicViewer = lazy(() => import('./components/TopicViewer'));
const BattlePage = lazy(() => import('./components/Battle/BattlePage'));
const LearningPathSelector = lazy(() => import('./components/LearningPathSelector'));

// Layout Component
function Layout() {
  const { lastTopicId, updateCurrentTopic } = useProgress();
  const { topics, loading: topicsLoading, error: topicsError } = useTopics();
  const [currentTopicId, setCurrentTopicId] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [activeView, setActiveView] = useState('search');

  // Multi-tab state: array of topic IDs
  const [openTabs, setOpenTabs] = useState(() => {
    try {
      const saved = localStorage.getItem('openTabs');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const navigate = useNavigate();
  const location = useLocation();

  // Save open tabs to localStorage
  useEffect(() => {
    localStorage.setItem('openTabs', JSON.stringify(openTabs));
  }, [openTabs]);

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

  // Add topic to tabs when navigating (new tabs added at the beginning)
  const handleOpenTopic = (id) => {
    if (!openTabs.includes(id)) {
      setOpenTabs(prev => [id, ...prev]);
    }
    navigate(`/${id}`);
    // Close sidebar on mobile after selecting
    if (window.innerWidth <= 768) {
      setIsSidebarOpen(false);
    }
  };

  // Reorder tabs via drag and drop
  const handleReorderTabs = (newOrder) => {
    setOpenTabs(newOrder);
  };

  const handleCloseTab = (id, e) => {
    e.stopPropagation();
    const newTabs = openTabs.filter(tabId => tabId !== id);
    setOpenTabs(newTabs);

    // If closing current tab, navigate to last remaining tab or first topic
    if (location.pathname === `/${id}`) {
      if (newTabs.length > 0) {
        navigate(`/${newTabs[newTabs.length - 1]}`);
      } else if (topics.length > 0) {
        navigate(`/${topics[0].id}`);
      }
    }
  };

  const handleCloseAllTabs = () => {
    setOpenTabs([]);
    if (topics.length > 0) {
      navigate(`/${topics[0].id}`);
    }
  };

  if (topicsError) {
    return (
      <div style={{ padding: 20, color: 'red' }}>Error loading topics</div>
    );
  }

  const currentTopic = topics.find(t => t.id === currentTopicId);

  return (
    <div className="vscode-layout">
      <SEO />

      {/* Mobile Menu Button */}
      <button
        className="mobile-menu-btn"
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{
          position: 'fixed',
          top: '8px',
          left: '8px',
          zIndex: 200,
          background: 'var(--vscode-button-bg)',
          color: 'var(--vscode-button-fg)',
          border: 'none',
          borderRadius: '4px',
          padding: '8px',
          cursor: 'pointer',
          display: 'none', // Hidden by default, shown via CSS on mobile
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        <span className="material-icons" style={{ fontSize: '20px' }}>menu</span>
      </button>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() => setIsSidebarOpen(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0,0,0,0.5)',
            zIndex: 99,
            display: 'none' // Hidden by default, shown via CSS on mobile when sidebar is open
          }}
        />
      )}

      {/* Workbench Area (ActivityBar + Sidebar + Editor) */}
      <div className="workbench">
        <ActivityBar
          activeView={activeView}
          onViewChange={setActiveView}
          isSidebarOpen={isSidebarOpen}
          onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        />

        <Sidebar
          topics={topics}
          currentTopicId={currentTopicId}
          onSelectTopic={handleOpenTopic}
          isOpen={isSidebarOpen}
          activeView={activeView}
        />

        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', minWidth: 0 }}>
          {topicsLoading ? (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#888' }}>
              Loading...
            </div>
          ) : (
            <Suspense fallback={<div style={{ padding: '20px', color: '#888' }}>Loading Editor...</div>}>
              <Outlet context={{ topics, currentTopic, setIsSidebarOpen, openTabs, setOpenTabs, handleCloseTab, handleCloseAllTabs, handleReorderTabs }} />
            </Suspense>
          )}
        </main>
      </div>

      <StatusBar totalTopics={topics.length} />
      <AchievementNotification />
    </div>
  );
}


import { useParams, Navigate } from 'react-router-dom';

function TopicViewerRoute() {
  const { topicId } = useParams();
  const { updateCurrentTopic } = useProgress();
  const { topics = [], setIsSidebarOpen } = useOutletContext() || {};

  const topic = topics ? topics.find(t => t.id === topicId) : null;

  useEffect(() => {
    if (topicId && topic) {
      updateCurrentTopic(topicId);
    }
  }, [topicId, topic, updateCurrentTopic]);

  if (!topics || topics.length === 0) return null;

  if (!topicId) {
    if (topics.length > 0) {
      return <Navigate to={`/${topics[0].id}`} replace />;
    }
  }

  if (topicId && !topic) {
    return <div style={{ padding: '20px', color: '#888' }}>File not found.</div>;
  }

  return <TopicViewer topic={topic} onOpenSidebar={() => setIsSidebarOpen(true)} />;
}

function LearningPathsRoute() {
  const navigate = useNavigate();
  const { setOpenTabs, openTabs } = useOutletContext() || {};

  const handleSelectTopic = (topicId) => {
    // Add to tabs if not already open
    if (setOpenTabs && !openTabs?.includes(topicId)) {
      setOpenTabs(prev => [topicId, ...prev]);
    }
    navigate(`/${topicId}`);
  };

  const handleOpenPathTopics = (topics) => {
    if (!setOpenTabs || !topics?.length) return;

    // Add all topics from the path to tabs (in order)
    setOpenTabs(prev => {
      const newTabs = [...topics];
      // Add any existing tabs that aren't in this path
      prev.forEach(tab => {
        if (!newTabs.includes(tab)) {
          newTabs.push(tab);
        }
      });
      return newTabs;
    });

    // Navigate to first uncompleted topic
    navigate(`/${topics[0]}`);
  };

  return (
    <div style={{ flex: 1, overflow: 'auto', background: 'var(--vscode-editor-bg)' }}>
      <SEO
        title="Rutas de Aprendizaje"
        description="Explora caminos estructurados para aprender Go (Golang) desde principiante hasta experto."
        width="100%"
      />
      <LearningPathSelector
        onSelectTopic={handleSelectTopic}
        onOpenPathTopics={handleOpenPathTopics}
      />
    </div>
  );
}

function AppContent() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Index route redirects to first topic in TopicViewerRoute logic or we can be explicit */}
        <Route index element={<TopicViewerRoute />} />
        <Route path="learning-paths" element={<LearningPathsRoute />} />
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

