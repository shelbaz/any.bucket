import { getSession } from "@/app/_lib/session";
import { SignupForm } from "../_components/form/SignupForm";
import { redirect } from "next/navigation";

const SignupPage = async () => {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/files");
  }

  return <SignupForm />;
};

export default SignupPage;
