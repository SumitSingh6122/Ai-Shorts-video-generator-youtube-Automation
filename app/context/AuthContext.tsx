import { createContext } from "react";

export interface AuthContextType {
  user: {
    _id:string;
    name: string;
    email: string;
    pictureUrl: string;
    credits: number;
  } | null; 
}


export const AuthContext = createContext<AuthContextType | null>(null);
