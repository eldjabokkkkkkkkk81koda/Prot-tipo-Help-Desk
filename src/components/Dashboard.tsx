import { useState } from 'react';
import { Ticket, User } from '../types';
import { Clock, CheckCircle2, CircleDashed, AlertCircle, Inbox } from 'lucide-react';

interface DashboardProps {
  tickets: Ticket[];
  users: User[];
  currentUser: User;
  onViewTicket: (id: string) => void;
}

export default function Dashboard({ tickets, users, currentUser, onViewTicket }: DashboardProps) {
  const [filter, setFilter] = useState<'all' | 'open' | 'in_progress' | 'resolved'>('all');

  const viewableTickets = currentUser.role === 'admin' 
    ? tickets 
    : tickets.filter(t => t.authorId === currentUser.id);

  const filteredTickets = viewableTickets.filter(t => filter === 'all' ? true : t.status === filter);

  // Sorting
  const sortedTickets = [...filteredTickets].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

  // Stats
  const stats = {
    total: viewableTickets.length,
    open: viewableTickets.filter(t => t.status === 'open').length,
    inProgress: viewableTickets.filter(t => t.status === 'in_progress').length,
    resolved: viewableTickets.filter(t => t.status === 'resolved').length,
  };

  const StatusIcon = ({ status }: { status: Ticket['status'] }) => {
    switch(status) {
      case 'open': return <CircleDashed className="w-5 h-5 text-blue-500" />;
      case 'in_progress': return <Clock className="w-5 h-5 text-purple-500" />;
      case 'resolved': return <CheckCircle2 className="w-5 h-5 text-emerald-500" />;
    }
  };

  const PriorityBadge = ({ priority }: { priority: Ticket['priority'] }) => {
    const colors = {
      low: 'bg-slate-100 text-slate-700',
      medium: 'bg-amber-100 text-amber-800',
      high: 'bg-red-100 text-red-800'
    };
    const labels = { low: 'Prioridade Baixa', medium: 'Prioridade Média', high: 'Urgente' };
    
    return (
      <span className={`px-2.5 py-1 text-xs font-bold rounded-full ${colors[priority]} flex items-center gap-1 shrink-0 uppercase tracking-wider`}>
        {priority === 'high' && <AlertCircle className="w-3.5 h-3.5" />}
        {labels[priority]}
      </span>
    );
  };

  const StatusBadge = ({ status }: { status: Ticket['status'] }) => {
    const colors = {
      open: 'bg-blue-100 text-blue-800 border-blue-200',
      in_progress: 'bg-purple-100 text-purple-800 border-purple-200',
      resolved: 'bg-emerald-100 text-emerald-800 border-emerald-200'
    };
    const labels = { open: 'Aberto', in_progress: 'Em Andamento', resolved: 'Resolvido' };
    
    return (
      <span className={`px-2.5 py-1 text-xs font-bold uppercase tracking-wider border rounded-full ${colors[status]}`}>
        {labels[status]}
      </span>
    );
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800">
            {currentUser.role === 'admin' ? 'Fila de Atendimento TI' : 'Meus Chamados'}
          </h1>
          <p className="text-slate-500 mt-1 font-medium">
            {currentUser.role === 'admin' 
              ? 'Visão geral de todos os chamados da empresa.' 
              : 'Acompanhe os tickets que você abriu para a equipe de TI.'}
          </p>
        </div>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center">
          <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Total</span>
          <span className="text-2xl font-black text-slate-800 mt-1">{stats.total}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center border-b-4 border-b-blue-500">
          <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Abertos</span>
          <span className="text-2xl font-black text-blue-600 mt-1">{stats.open}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center border-b-4 border-b-purple-500">
          <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Em Andamento</span>
          <span className="text-2xl font-black text-purple-600 mt-1">{stats.inProgress}</span>
        </div>
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col justify-center border-b-4 border-b-emerald-500">
          <span className="text-slate-500 text-sm font-semibold uppercase tracking-wider">Resolvidos</span>
          <span className="text-2xl font-black text-emerald-600 mt-1">{stats.resolved}</span>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center justify-between">
          <h2 className="font-bold text-slate-700">Lista de Chamados</h2>
          <label className="flex items-center gap-2">
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider hidden sm:inline">Filtrar:</span>
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value as any)}
              className="border border-slate-300 rounded-lg px-3 py-1.5 text-sm bg-white font-medium text-slate-700 focus:outline-none focus:ring-2 focus:ring-blue-500 outline-none"
            >
              <option value="all">Ver Todos</option>
              <option value="open">Abertos</option>
              <option value="in_progress">Em Andamento</option>
              <option value="resolved">Resolvidos</option>
            </select>
          </label>
        </div>

        <div className="divide-y divide-slate-100">
          {sortedTickets.map(ticket => {
            const author = users.find(u => u.id === ticket.authorId);
            return (
              <div 
                key={ticket.id}
                onClick={() => onViewTicket(ticket.id)}
                className="p-5 hover:bg-slate-50 transition-colors cursor-pointer flex flex-col lg:flex-row lg:items-center justify-between gap-4 group"
              >
                <div className="flex items-start lg:items-center gap-4 flex-1">
                  <div className="mt-1 lg:mt-0 p-2 bg-slate-100 rounded-xl group-hover:bg-white group-hover:shadow-sm border border-transparent group-hover:border-slate-200 transition-all shrink-0">
                    <StatusIcon status={ticket.status} />
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-xs font-bold text-slate-400">{ticket.id}</span>
                      <PriorityBadge priority={ticket.priority} />
                    </div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1 group-hover:text-blue-600 transition-colors">{ticket.title}</h3>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                      {currentUser.role === 'admin' && (
                        <>
                          <span className="text-slate-700 bg-slate-100 px-2 rounded">{author?.name}</span>
                          <span>•</span>
                        </>
                      )}
                      <span>{new Date(ticket.createdAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center lg:justify-end">
                  <StatusBadge status={ticket.status} />
                </div>
              </div>
            );
          })}
          
          {sortedTickets.length === 0 && (
            <div className="flex flex-col items-center justify-center py-20 text-slate-500 bg-white">
              <Inbox className="w-16 h-16 text-slate-200 mb-4" />
              <p className="font-bold text-xl text-slate-700">Nenhum chamado listado</p>
              <p className="text-slate-500 mt-1">Sua fila está limpa para este filtro.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
