import { getSession } from "@/app/_lib/session";
import { LoginForm } from "@/app/_components/form/LoginForm";
import { redirect } from "next/navigation";

const LoginPage = async () => {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/files");
  }

  return <LoginForm />;
};

export default LoginPage;
