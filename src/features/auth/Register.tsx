import { Button } from "@/components/ui/button";
import { AuthContainer } from "../../components/AuthContainer";
import { Input } from "@/components/ui/input";
import { useAuthContext } from "./context/AuthContext";
import { toast } from "sonner";

function Register() {
   const {handleRegister}=useAuthContext();
    const onSubmit=(e:React.FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      const data=Object.fromEntries(new FormData(e.currentTarget));
      if(data.password!==data.confirmPassword){
        toast.warning("Passwords do not match");
        return;
      }
      handleRegister(data);
    }
  return (
    <AuthContainer
      title="Register an account"
      onSubmit={onSubmit}
    >
      <Input type="text" name="name" placeholder="Name" className="w-full" />
      <Input type="email" name="email" placeholder="Email" className="w-full" />
      <Input type="password" name="password" placeholder="Password" className="w-full" />
      <Input type="password" name="confirmPassword" placeholder="Password" className="w-full" />
      <Button className="w-full">Register</Button>
    </AuthContainer>
  );
}

export default Register;
