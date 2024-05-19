import * as React from "react";

interface EmailTemplateProps {
  email: string;
  token: string;
}

export const ResetPasswordTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  email,
  token,
}) => (
  <div>
    <h1>Reset Your Password</h1>
    <p>
      You recently requested to reset your password for your account. Click the
      link below to reset it.
    </p>
    <a
      href={`https://www.file.rocks/reset-password?email=${email}&token=${token}`}
    >
      Reset Your Password
    </a>
  </div>
);
