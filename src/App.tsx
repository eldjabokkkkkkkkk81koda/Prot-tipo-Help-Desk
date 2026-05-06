import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import { User, Ticket, Comment } from './types';
import { mockUsers, mockTickets, mockComments } from './mockData';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Dashboard from './components/Dashboard';
import TicketCreate from './components/TicketCreate';
import TicketDetail from './components/TicketDetail';

// Custom hook to sync state across multiple open tabs in real-time
function useSharedState<T>(key: string, initialValue: T): [T, (val: T | ((prev: T) => T)) => void] {
  const [state, setState] = useState<T>(() => {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : initialValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  useEffect(() => {
    const handleStorage = (e: StorageEvent) => {
      if (e.key === key && e.newValue) {
        setState(JSON.parse(e.newValue));
      }
    };
    window.addEventListener('storage', handleStorage);
    return () => window.removeEventListener('storage', handleStorage);
  }, [key]);

  return [state, setState];
}

function Workspace({ 
  currentUser, 
  tickets, 
  setTickets, 
  comments, 
  setComments 
}: { 
  currentUser: User, 
  tickets: Ticket[], 
  setTickets: any, 
  comments: Comment[], 
  setComments: any 
}) {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'dashboard' | 'create' | 'detail'>('dashboard');
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  const handleCreateTicket = (ticketInfo: Pick<Ticket, 'title' | 'description' | 'priority' | 'status'>) => {
    const newTicket: Ticket = {
      ...ticketInfo,
      id: `TKT-${1000 + tickets.length + 1}`,
      authorId: currentUser.id,
      createdAt: new Date().toISOString(),
    };
    setTickets([newTicket, ...tickets]);
    setCurrentView('dashboard');
  };

  const handleUpdateTicketStatus = (ticketId: string, status: Ticket['status']) => {
    setTickets(tickets.map((t: Ticket) => t.id === ticketId ? { ...t, status } : t));
  };

  const handleAddComment = (ticketId: string, text: string) => {
    const newComment: Comment = {
      id: `c${Date.now()}`,
      ticketId,
      authorId: currentUser.id,
      text,
      createdAt: new Date().toISOString(),
    };
    setComments([...comments, newComment]);
  };

  const navigateToDetail = (ticketId: string) => {
    setSelectedTicketId(ticketId);
    setCurrentView('detail');
  };

  const selectedTicket = tickets.find((t: Ticket) => t.id === selectedTicketId);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 font-sans selection:bg-blue-200">
      <Navbar user={currentUser} onLogout={() => navigate('/')} onViewChange={setCurrentView} />
      
      <main className="max-w-5xl mx-auto p-4 py-8 md:p-8">
        {currentView === 'dashboard' && (
          <Dashboard 
            tickets={tickets} 
            users={mockUsers}
            currentUser={currentUser}
            onViewTicket={navigateToDetail} 
          />
        )}
        
        {currentView === 'create' && (
          <TicketCreate 
            onCreate={handleCreateTicket} 
            onCancel={() => setCurrentView('dashboard')} 
          />
        )}
        
        {currentView === 'detail' && selectedTicket && (
          <TicketDetail 
            ticket={selectedTicket}
            comments={comments.filter((c: Comment) => c.ticketId === selectedTicket.id)}
            users={mockUsers}
            currentUser={currentUser}
            onUpdateStatus={handleUpdateTicketStatus}
            onAddComment={handleAddComment}
            onBack={() => setCurrentView('dashboard')}
          />
        )}
      </main>
    </div>
  );
}

export default function App() {
  // Shared state persists and syncs between /advogado and /ti tabs
  const [tickets, setTickets] = useSharedState<Ticket[]>('helpdesk_tickets_v2', mockTickets);
  const [comments, setComments] = useSharedState<Comment[]>('helpdesk_comments_v2', mockComments);

  const adminUser = mockUsers.find(u => u.role === 'admin')!;
  const advogadoUser = mockUsers.find(u => u.id === 'u1')!; // João Silva

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/ti/*" element={
          <Workspace 
            currentUser={adminUser}
            tickets={tickets} setTickets={setTickets}
            comments={comments} setComments={setComments}
          />
        } />
        <Route path="/advogado/*" element={
          <Workspace 
            currentUser={advogadoUser}
            tickets={tickets} setTickets={setTickets}
            comments={comments} setComments={setComments}
          />
        } />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
