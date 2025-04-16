"use client";
import React, { ReactNode, useContext, useEffect, useState } from "react";

import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./config/firebase";
import { AuthContext } from "./context/AuthContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";

interface ProviderProps {
  children: ReactNode;
}
interface UserType{
    _id: string;
    name: string;
    email: string;
    pictureUrl: string;
    credits: number;
    isActive:boolean;
    role:string;
 
}

const Provider: React.FC<ProviderProps> = ({ children }) => {
  const [user, setUser] = useState<UserType | null>(null);
  const CreateUser = useMutation(api.user.CreateNewUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      console.log(user);
     

      if (user?.displayName && user?.email) {
        try {
          const result = await CreateUser({
            name: user?.displayName,
            email:user?.email,
            pictureUrl: user?.photoURL || "",
          });
          
          setUser({ 
            _id:result._id,
            name: result.name,
            email: result.email,
            pictureUrl: result.pictureUrl || "",
            credits: result.credits,
            isActive:result.isActive || false,
            role:result.role || 'user',
          });
        } catch (error) {
          console.error("Error creating user:", error);
        }
      }
    });

    return () => unsubscribe();
  },[CreateUser]); 

  return (
    <AuthContext.Provider value={{user}}>
    
        {children}
      
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuthContext must be used within an AuthContext.Provider");
  return context;
};

export default Provider;
