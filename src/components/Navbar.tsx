import { User } from '../types';
import { PlusCircle, LogOut, LifeBuoy, Shield, User as UserIcon } from 'lucide-react';

interface NavbarProps {
  user: User;
  onLogout: () => void;
  onViewChange: (view: 'dashboard' | 'create') => void;
}

export default function Navbar({ user, onLogout, onViewChange }: NavbarProps) {
  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-10">
      <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
        
        <div className="flex items-center gap-4">
          <div 
            className="flex items-center gap-2 font-bold text-lg cursor-pointer hover:opacity-90 transition-opacity"
            onClick={() => onViewChange('dashboard')}
          >
            <LifeBuoy className="w-6 h-6 text-blue-400" />
            <span className="hidden sm:inline">HelpDesk Jurídico</span>
            <span className="sm:hidden">HelpDesk</span>
          </div>
          <span className="hidden md:inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold bg-slate-800 text-slate-400 border border-slate-700 tracking-wider">
            MVP DEMO
          </span>
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <div className="hidden sm:flex items-center gap-3 bg-slate-800 px-3 py-1.5 rounded-full border border-slate-700">
            {user.role === 'admin' ? <Shield className="w-4 h-4 text-purple-400" /> : <UserIcon className="w-4 h-4 text-blue-400" />}
            <span className="text-sm font-medium text-slate-200">
              <span className="text-slate-400 mr-1 text-xs">Simulando:</span>
              {user.name}
            </span>
          </div>

          {user.role === 'user' && (
            <button 
              onClick={() => onViewChange('create')}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 px-3 py-1.5 md:py-2 md:px-4 rounded-lg text-sm font-medium transition-colors"
            >
              <PlusCircle className="w-4 h-4" />
              <span className="hidden sm:inline">Novo Chamado</span>
              <span className="sm:hidden">Novo</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
