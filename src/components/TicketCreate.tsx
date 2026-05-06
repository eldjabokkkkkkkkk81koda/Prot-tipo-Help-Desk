import { useState } from 'react';
import { Ticket } from '../types';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';

interface TicketCreateProps {
  onCreate: (ticket: Pick<Ticket, 'title' | 'description' | 'priority' | 'status'>) => void;
  onCancel: () => void;
}

export default function TicketCreate({ onCreate, onCancel }: TicketCreateProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<Ticket['priority']>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !description.trim()) return;
    
    onCreate({
      title,
      description,
      priority,
      status: 'open'
    });
  };

  return (
    <div className="max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-300">
      <button 
        onClick={onCancel}
        className="flex items-center gap-2 text-slate-500 hover:text-slate-800 mb-6 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4" /> Voltar
      </button>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 bg-slate-50 text-slate-800">
          <h2 className="text-2xl font-bold">Abrir Solicitação de TI</h2>
          <p className="text-sm text-slate-500 mt-1">Preencha os detalhes para suporte, automação de processos ou liberação de acessos (IA, Softwares).</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">Título da Solicitação</label>
            <input 
              type="text"
              required
              value={title}
              onChange={e => setTitle(e.target.value)}
              placeholder="Ex: Erro no robô de extração do PJe..."
              className="w-full border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-800 mb-1.5">Descrição Detalhada</label>
            <textarea 
              required
              value={description}
              onChange={e => setDescription(e.target.value)}
              rows={5}
              placeholder="Descreva o que você precisa ou qual problema está enfrentando. Se for erro de automação/IA, informe o link ou processo afetado."
              className="w-full border border-slate-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none resize-none transition-shadow"
            />
          </div>

          <div>
             <label className="block text-sm font-semibold text-slate-800 mb-1.5">Nível de Urgência (Prioridade)</label>
             <select 
              value={priority}
              onChange={e => setPriority(e.target.value as any)}
              className="w-full md:w-1/2 border border-slate-300 rounded-lg px-4 py-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none bg-white transition-shadow"
            >
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>

          <div className="pt-4 flex items-center justify-end gap-3 border-t border-slate-100">
            <button 
              type="button" 
              onClick={onCancel}
              className="px-5 py-2.5 rounded-lg text-slate-600 hover:bg-slate-100 font-medium transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="flex items-center gap-2 px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-sm"
            >
              <CheckCircle2 className="w-5 h-5" /> Enviar Chamado
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
