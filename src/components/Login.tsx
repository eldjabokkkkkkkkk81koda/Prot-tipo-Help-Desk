import { Shield, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <div className="mb-8 text-center max-w-lg">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-bold tracking-wider mb-4 border border-blue-200">
          PROTÓTIPO MVP DE DEMONSTRAÇÃO
        </div>
        <h1 className="text-4xl font-extrabold text-slate-800 mb-3 tracking-tight">HelpDesk Jurídico</h1>
        <p className="text-slate-600 text-lg">Para testar o sistema, escolha qual persona você deseja simular agora:</p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 w-full max-w-4xl">
        {/* Painel TI */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg border-2 border-purple-100 hover:border-purple-300 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-purple-100 p-3 rounded-xl border border-purple-200">
              <Shield className="w-6 h-6 text-purple-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Visão da TI</h2>
              <p className="text-sm text-slate-500">Recebe e resolve os chamados</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <Link
              to="/ti"
              className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-purple-500 hover:bg-purple-50 transition-all font-medium text-slate-700 hover:text-purple-700 shadow-sm group"
            >
              <span>Acessar Painel (João Vitor)</span>
              <span className="text-xs bg-white text-purple-700 px-3 py-1.5 rounded-lg shadow-sm border border-purple-100 group-hover:bg-purple-600 group-hover:text-white transition-colors">Entrar →</span>
            </Link>
          </div>
        </div>

        {/* Painel Advogados */}
        <div className="flex-1 bg-white p-6 rounded-2xl shadow-lg border-2 border-blue-100 hover:border-blue-300 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-blue-100 p-3 rounded-xl border border-blue-200">
              <BookOpen className="w-6 h-6 text-blue-700" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-slate-800">Visão dos Advogados</h2>
              <p className="text-sm text-slate-500">Abrem os chamados e acompanham</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <Link
              to="/advogado"
              className="w-full flex items-center justify-between p-4 rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50 transition-all font-medium text-slate-700 hover:text-blue-700 shadow-sm group"
            >
              <span>Acessar Painel (João Silva)</span>
              <span className="text-xs bg-white text-blue-700 px-3 py-1.5 rounded-lg shadow-sm border border-blue-100 group-hover:bg-blue-600 group-hover:text-white transition-colors">Entrar →</span>
            </Link>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-slate-400 text-sm max-w-lg text-center">
        Dica: Abra a <strong>Visão da TI</strong> em uma aba, e a <strong>Visão dos Advogados</strong> em outra aba. As ações sincronizam em tempo real entre as duas abas!
      </div>
    </div>
  );
}
