"use client";

import { useState } from "react";
import { useVerifyPassword } from "../_hooks/password";
import { Button } from "../_components/buttons/Button";
import { useRouter } from "next/navigation";

const PasswordPage = () => {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const { verifyPassword } = useVerifyPassword();
  const handleSubmitPassword = async (password: string) => {
    const verified = await verifyPassword({ password });
    if (verified) {
      router.replace("/files");
    }
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center">
      <div className="flex flex-col max-w-96 w-full">
        <h1 className="text-center text-2xl mb-4 font-semibold">
          Enter password
        </h1>
        <input
          id="rename-file"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="********"
          autoFocus
          className="py-2 px-3 border border-zinc-900 rounded w-full focus:outline-none focus:shadow"
          type="password"
        />
        <Button
          label="Submit"
          onClick={() => handleSubmitPassword(password)}
          className="mt-2 w-full"
        />
      </div>
    </div>
  );
};

export default PasswordPage;
