import { create } from 'zustand';

interface User {
  name: string;
  email: string;
  phone: string;
  online: boolean;
}

interface ChatUser {
  name: string;
  phone: string;
  lastMessage: string;
  time: string;
  online: boolean;
  unread?: number;
}

interface UserStore {
  user: User | null;
  chatUsers: ChatUser[];
  setUser: (user: User | null) => void;
  addChatUser: (user: ChatUser) => void;
  setChatUsers: (users: ChatUser[]) => void;
}

export const useUserStore = create<UserStore>((set) => ({
  user: null,
  chatUsers: [],
  setUser: (user) => set({ user }),
  addChatUser: (newUser) => set((state) => ({
    chatUsers: [...state.chatUsers.filter(u => u.phone !== newUser.phone), newUser]
  })),
  setChatUsers: (users) => set({ chatUsers: users }),
}));