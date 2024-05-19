import { getSession } from "@/app/_lib/session";
import { redirect } from "next/navigation";
import { ResetPasswordForm } from "../_components/form/ResetPasswordForm";

const ResetPasswordPage = async () => {
  const session = await getSession();

  if (session.isLoggedIn) {
    redirect("/files");
  }

  return <ResetPasswordForm />;
};

export default ResetPasswordPage;
