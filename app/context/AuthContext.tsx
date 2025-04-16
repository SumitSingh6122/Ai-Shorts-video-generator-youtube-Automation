import { createContext } from "react";

export interface AuthContextType {
  user: {
    _id:string;
    name: string;
    email: string;
    pictureUrl: string;
    credits: number;
    isActive:boolean;
    role:string;
  } | null; 
}


export const AuthContext = createContext<AuthContextType | null>(null);
