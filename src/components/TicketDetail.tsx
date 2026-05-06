import { useState, useRef, useEffect } from 'react';
import { Ticket, Comment, User } from '../types';
import { ArrowLeft, Send, AlignLeft, ShieldAlert } from 'lucide-react';

interface TicketDetailProps {
  ticket: Ticket;
  comments: Comment[];
  users: User[];
  currentUser: User;
  onUpdateStatus: (ticketId: string, status: Ticket['status']) => void;
  onAddComment: (ticketId: string, text: string) => void;
  onBack: () => void;
}

export default function TicketDetail({ ticket, comments, users, currentUser, onUpdateStatus, onAddComment, onBack }: TicketDetailProps) {
  const [newComment, setNewComment] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const author = users.find(u => u.id === ticket.authorId);
  const isAdmin = currentUser.role === 'admin';

  const handleSendComment = () => {
    if (!newComment.trim()) return;
    onAddComment(ticket.id, newComment);
    setNewComment('');
  };

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [comments]);

  const getStatusLabel = (status: Ticket['status']) => {
    switch(status) {
      case 'open': return 'Aberto';
      case 'in_progress': return 'Em Andamento';
      case 'resolved': return 'Resolvido';
    }
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch(status) {
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in_progress': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'resolved': return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 transition-colors font-bold uppercase tracking-wider text-sm"
      >
        <ArrowLeft className="w-5 h-5" /> Voltar
      </button>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Main Content (Left) */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Header */}
            <div className="p-6 border-b border-slate-100 bg-slate-50">
              <div className="flex items-center gap-3 mb-3">
                <span className="font-mono text-sm bg-slate-200 px-2 py-0.5 rounded text-slate-700 font-bold">{ticket.id}</span>
                <span className={`px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest border rounded text-white
                  ${ticket.priority === 'high' ? 'bg-red-500 border-red-600' : ticket.priority === 'medium' ? 'bg-amber-500 border-amber-600' : 'bg-slate-400 border-slate-500'}`}>
                  {ticket.priority === 'high' ? 'Urgente' : ticket.priority === 'medium' ? 'Prioridade Média' : 'Baixa Prioridade'}
                </span>
                {!isAdmin && (
                  <span className={`ml-auto px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border ${getStatusColor(ticket.status)}`}>
                    {getStatusLabel(ticket.status)}
                  </span>
                )}
              </div>
              <h1 className="text-2xl font-black text-slate-800 leading-tight mb-2">{ticket.title}</h1>
              <p className="text-sm font-medium text-slate-500">
                Aberto por <strong className="text-slate-700">{author?.name}</strong> em {new Date(ticket.createdAt).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>

            {/* Description */}
            <div className="p-6 bg-white">
              <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                <AlignLeft className="w-4 h-4 text-slate-400" /> Detalhes da Solicitação
              </h3>
              <p className="text-slate-700 whitespace-pre-wrap leading-relaxed text-lg">
                {ticket.description}
              </p>
            </div>
          </div>

          {/* Chat / Comentários */}
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 flex flex-col h-[500px]">
             <div className="p-4 border-b border-slate-100 bg-slate-50 font-bold text-slate-700">
               Discussão e Atualizações
             </div>
             
             <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50">
                {comments.length === 0 && (
                  <div className="h-full flex items-center justify-center text-slate-400 font-medium">
                    Nenhuma interação ainda. Escreva uma mensagem abaixo.
                  </div>
                )}
                {comments.map(comment => {
                  const commentAuthor = users.find(u => u.id === comment.authorId);
                  const isCurrentUser = comment.authorId === currentUser.id;
                  const isCommentAdmin = commentAuthor?.role === 'admin';
                  
                  return (
                    <div key={comment.id} className={`flex flex-col ${isCurrentUser ? 'items-end' : 'items-start'}`}>
                      <div className="flex items-center gap-2 mb-1 px-1">
                        <span className={`text-xs font-bold ${isCommentAdmin ? 'text-purple-600' : 'text-slate-500'}`}>
                          {isCurrentUser ? 'Você' : commentAuthor?.name}
                          {isCommentAdmin && !isCurrentUser && ' (Técnico TI)'}
                        </span>
                        <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                          {new Date(comment.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                      </div>
                      <div 
                        className={`px-5 py-3 rounded-2xl max-w-[85%] text-[15px] leading-relaxed relative ${
                          isCurrentUser 
                          ? 'bg-blue-600 text-white rounded-tr-sm shadow-md' 
                          : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm shadow-sm'
                        }`}
                      >
                        {comment.text}
                      </div>
                    </div>
                  );
                })}
                <div ref={chatEndRef} />
             </div>

             <div className="p-3 border-t border-slate-200 bg-white">
                <div className="flex gap-2">
                  <textarea
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder="Responda aqui..."
                    className="flex-1 bg-slate-100 border-transparent rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-blue-500 outline-none resize-none transition-all placeholder:text-slate-400 text-slate-800"
                    rows={1}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && !e.shiftKey) {
                        e.preventDefault();
                        handleSendComment();
                      }
                    }}
                  />
                  <button 
                    onClick={handleSendComment}
                    disabled={!newComment.trim()}
                    className="flex items-center justify-center w-12 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 text-white rounded-xl transition-colors shrink-0"
                  >
                    <Send className="w-5 h-5 ml-1" />
                  </button>
                </div>
             </div>
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="space-y-6">
          {isAdmin && (
             <div className="bg-purple-50 rounded-2xl border-2 border-purple-200 p-5 shadow-sm">
                <div className="flex items-center gap-2 text-purple-800 font-bold mb-4 uppercase tracking-widest text-xs">
                  <ShieldAlert className="w-5 h-5" /> Painel de Controle TI
                </div>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Alterar Status do Chamado:</label>
                    <select
                      value={ticket.status}
                      onChange={(e) => onUpdateStatus(ticket.id, e.target.value as Ticket['status'])}
                      className={`w-full border-2 text-sm font-bold uppercase tracking-wider rounded-xl px-4 py-3 outline-none cursor-pointer transition-colors shadow-sm
                        ${ticket.status === 'open' ? 'bg-white text-blue-700 border-blue-300 focus:border-blue-500' : 
                          ticket.status === 'in_progress' ? 'bg-white text-purple-700 border-purple-300 focus:border-purple-500' : 
                          'bg-white text-emerald-700 border-emerald-300 focus:border-emerald-500'}`}
                    >
                      <option value="open">Aberto</option>
                      <option value="in_progress">Em Andamento</option>
                      <option value="resolved">Marcado como Resolvido</option>
                    </select>
                  </div>

                  <p className="text-xs text-purple-600/80 font-medium leading-relaxed mt-4 bg-purple-100 p-3 rounded-lg">
                    Apenas os técnicos podem alterar o status do chamado. Ao resolver, não esqueça de avisar o usuário no chat.
                  </p>
                </div>
             </div>
          )}

          {!isAdmin && (
            <div className="bg-slate-50 rounded-2xl border border-slate-200 p-5">
               <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Status Atual</h3>
               <div className={`px-4 py-3 rounded-xl font-bold border ${getStatusColor(ticket.status)}`}>
                  {getStatusLabel(ticket.status)}
               </div>
               <p className="text-sm text-slate-500 mt-4 leading-relaxed">
                 O técnico de TI da sua empresa será notificado e vai te responder pelo chat ao lado.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
