import { Button } from "@/components/ui/button";
import { AuthContainer } from "../../components/AuthContainer";
import { Input } from "@/components/ui/input";

function Login() {
  return (
    <AuthContainer onSubmit={(e) => e.preventDefault()}>
      <Input type="email" placeholder="Email" className="w-full" />
      <Input type="password" placeholder="Password" className="w-full" />
      <Button className="w-full">Login</Button>
    </AuthContainer>
  );
}

export default Login;
