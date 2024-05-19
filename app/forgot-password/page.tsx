import { getSession } from "@/app/_lib/session";
import { redirect } from "next/navigation";
import { ForgotPasswordForm } from "../_components/form/ForgotPasswordForm";

const ForgotPasswordPage = async () => {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/files");
  }

  return <ForgotPasswordForm />;
};

export default ForgotPasswordPage;
