import { User, Ticket, Comment } from './types';

export const mockUsers: User[] = [
  { id: 'u1', name: 'João Silva', role: 'user' },
  { id: 'u2', name: 'Maria Souza', role: 'user' },
  { id: 'u3', name: 'João Vitor', role: 'admin' },
];

export const mockTickets: Ticket[] = [
  { 
    id: 'TKT-1001', 
    title: 'Erro no robô de extração do PJe', 
    description: 'O script automatizado que faz o download das publicações do diário oficial está falhando intermitentemente desde a atualização do layout do tribunal de ontem.', 
    priority: 'high', 
    status: 'open', 
    authorId: 'u1', 
    createdAt: new Date(Date.now() - 86400000).toISOString() // 1 day ago
  },
  { 
    id: 'TKT-1002', 
    title: 'Acesso à IA para análise de contratos', 
    description: 'Preciso de licenciamento para a nova ferramenta de IA. Tenho uma demanda de Due Diligence da fusão da empresa XYZ e preciso analisar 400 contratos até quarta-feira.', 
    priority: 'medium', 
    status: 'in_progress', 
    authorId: 'u2', 
    createdAt: new Date(Date.now() - 3600000).toISOString() // 1 hour ago
  },
  { 
    id: 'TKT-1003', 
    title: 'Nova automação de petições iniciais', 
    description: 'Gostaria de agendar uma reunião com a equipe de TI para desenharmos um fluxo no Zapier/Make que gere a primeira versão das petições de massa baseado nas respostas de um form do cliente.', 
    priority: 'low', 
    status: 'open', 
    authorId: 'u2', 
    createdAt: new Date(Date.now() - 7200000).toISOString() // 2 hours ago
  },
  { 
    id: 'TKT-1004', 
    title: 'Assistente virtual gerando jurisprudência antiga', 
    description: 'O nosso chatbot interno treinado com a base do escritório sugeriu um precedente do STJ que foi superado no mês passado. Precisamos atualizar os embeddings do banco de dados.', 
    priority: 'high', 
    status: 'resolved', 
    authorId: 'u1', 
    createdAt: new Date(Date.now() - 172800000).toISOString() // 2 days ago
  }
];

export const mockComments: Comment[] = [
  { 
    id: 'c1', 
    ticketId: 'TKT-1002', 
    authorId: 'u3', 
    text: 'Olá Maria, estou liberando o seu acesso ao modelo avançado agora mesmo. O convite vai chegar no seu email corporativo em 5 minutos.', 
    createdAt: new Date(Date.now() - 1800000).toISOString() // 30 min ago
  },
  { 
    id: 'c2', 
    ticketId: 'TKT-1004', 
    authorId: 'u3', 
    text: 'Identifiquei o problema. O indexador da base vetorial estava travado. Forcei a sincronização e agora ele já considera as jurisprudências de 2024. Pede pra testarem novamente, por favor.', 
    createdAt: new Date(Date.now() - 86400000).toISOString() 
  }
];
