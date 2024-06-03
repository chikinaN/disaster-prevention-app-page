import { create } from "zustand";

type UserState = {
  user: {
		name: string;
		email: string;
	};
	setUser: (name: string, email: string) => void;
};

export const useUserStore = create<UserState>((set) => ({
  user: {
		name: "",
		email: "",
	},
	setUser: (name, email) => set(() => ({ user: { name, email } })),
}));
