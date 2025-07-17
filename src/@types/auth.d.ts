import type React from "react";

export type UserRole= "customer" | "partner" | "admin";

export interface IUser {
    _id:Types.ObjectId;
    name:string,
    email:string,
    password:string,
    role:UserRole,
    available?:boolean
    verfied?:boolean
}

export interface IAuthContextType {
  isAuthenticated: boolean;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
  user: IUser|null;
  setUser: React.Dispatch<React.SetStateAction<IUser|null>>;
  handleLogin: (credentials: Partial<IUser>) => void;
  handleRegister: (credentials: Partial<IUser>) => void;
  handleLogout: () => void;
  handleResetPassword: (email: string) => void;
  
}