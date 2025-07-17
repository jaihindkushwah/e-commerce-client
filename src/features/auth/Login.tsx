import { Button } from "@/components/ui/button";
import { AuthContainer } from "../../components/AuthContainer";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "./context/AuthContext";

function Login() {
  const {handleLogin}=useAuthContext();
  const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault();
    const data=Object.fromEntries(new FormData(e.currentTarget));
    handleLogin(data);
  }
  return (
    <AuthContainer onSubmit={onSubmit}>
      <Input type="email" name="email" placeholder="Email" className="w-full" />
      <Input type="password" name="password" placeholder="Password" className="w-full" />
      <Button className="w-full" type="submit">Login</Button>
    </AuthContainer>
  );
}

export default Login;
