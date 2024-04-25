"use client";

import { useEffect, useState } from "react";
import { useVerifyPassword } from "../_hooks/password";
import { Button } from "../_components/buttons/Button";
import { useRouter } from "next/navigation";
import { Input } from "../_components/form/Input";

const PasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const { verifyPassword, bearerToken } = useVerifyPassword();
  const handleSubmitPassword = async (password: string) => {
    const verified = await verifyPassword({ password });
    if (verified) {
      router.push("/files");
    }
  };

  useEffect(() => {
    if (bearerToken) {
      router.push("/files");
    }
  }, [bearerToken]);

  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className="flex flex-col max-w-96 w-full">
        <h1 className="text-center text-2xl mb-4 font-semibold">
          Enter password
        </h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitPassword(password);
          }}
        >
          <Input
            id="rename-file"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="********"
            autoFocus
            type="password"
          />
          <Button type="submit" label="Submit" className="mt-2 w-full" />
        </form>
      </div>
    </div>
  );
};

export default PasswordPage;
