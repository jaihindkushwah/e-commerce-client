import type { IAuthContextType, IUser } from "@/@types/auth";
import { clearDataFromSessionStorage, } from "@/lib/utils";
import { authService } from "@/services/auth.service";
import { createContext, useCallback, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
export const AuthContext = createContext<IAuthContextType>(
  {} as IAuthContextType
);
export function useAuthContext() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuthContext must be used within a AuthContextProvider");
  }
  return context;
}

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate=useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<IUser | null>(null);
  const [inputUser, setInputUser] = useState<Partial<IUser>| null>(null);
  const handleLogin = useCallback(
    async(user: Partial<IUser>) => {
      try {
        const data=await authService.login(user);
        console.log(data);
        setIsAuthenticated(true);
        navigate("/");
      } catch (error:any) {
        console.log(error);
        if(error?.data?.message?.error){
          toast.error(error.data.message.error);
        }
        else{
          toast.error(error.message);
        }
        
      }
    },
    []
  );
  const handleRegister = useCallback(
    async(user: Partial<IUser>) => {
      try {
        const data=await authService.register(user);
        console.log(data);
        setIsAuthenticated(true);
        setIsAuthenticated(true);
        navigate("/");
      } catch (error:any) {
        console.log(error);
        if(error?.data?.message?.error){
          toast.error(error.data.message.error);
        }
        else{
          toast.error(error.message);
        }
        
      }
    },
    []
  );

  const handleLogout = useCallback(() => {
    clearDataFromSessionStorage("token");
    setUser(null);
    setIsAuthenticated(false);
    navigate("/");
  }, []);

  const handleResetPassword = useCallback((email: string) => {
    console.log(email);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        handleLogin,
        handleRegister,
        handleLogout,
        handleResetPassword,
        inputUser,
        setInputUser
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
