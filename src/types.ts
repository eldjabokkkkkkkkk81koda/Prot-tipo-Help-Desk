export type Role = 'user' | 'admin';
export type Priority = 'low' | 'medium' | 'high';
export type Status = 'open' | 'in_progress' | 'resolved';

export interface User {
  id: string;
  name: string;
  role: Role;
}

export interface Ticket {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  status: Status;
  authorId: string;
  createdAt: string;
}

export interface Comment {
  id: string;
  ticketId: string;
  authorId: string;
  text: string;
  createdAt: string;
}
