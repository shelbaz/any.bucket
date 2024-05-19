"use client";
import { updatePassword } from "@/app/_lib/session";
import { useFormState } from "react-dom";
import { Input } from "../Input";
import Link from "next/link";
import { Logo } from "../../Logo";
import { Button } from "../../buttons/Button";
import { useSearchParams } from "next/navigation";

export function ResetPasswordForm() {
  const query = useSearchParams();
  const email = query.get("email");
  const token = query.get("token");
  const [state, formAction] = useFormState<any, FormData>(
    updatePassword,
    undefined
  );

  if (state?.success) {
    return (
      <section className="py-12 px-4 bg-white h-screen flex items-center justify-center bg-grid">
        <div className="md:max-w-sm mx-auto w-full">
          <h1 className="text-3xl text-center font-bold text-zinc-900 mb-4">
            {state.success}
          </h1>
          <Link
            href="/login"
            className="block text-center text-zinc-900 font-bold hover:underline"
          >
            Log in
          </Link>
        </div>
      </section>
    );
  }

  return (
    <>
      <form
        action={(data) => {
          formAction(data);
        }}
      >
        <section className="py-12 px-4 bg-white h-screen flex items-center justify-center bg-grid">
          <div className="md:max-w-sm mx-auto w-full">
            <h1 className="text-3xl text-center font-bold text-zinc-900 mb-4">
              Enter a new password
            </h1>

            <div className="space-y-6">
              <div>
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-zinc-900"
                >
                  Email
                </label>
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-zinc-800"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>

                  <Input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email address"
                    className="block w-full pl-12"
                    readOnly
                    value={(email ?? "").replace(" ", "+")}
                  />
                </div>
              </div>

              <div hidden>
                <label
                  htmlFor="token"
                  className="text-sm font-medium text-zinc-900"
                >
                  Reset Token
                </label>
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-zinc-800"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>

                  <Input
                    type="token"
                    name="token"
                    id="token"
                    placeholder="Reset Token"
                    className="block w-full pl-12"
                    readOnly
                    value={token ?? ""}
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="new-password"
                    className="text-sm font-medium text-zinc-900"
                  >
                    New Password
                  </label>
                </div>
                <div className="relative mt-2">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                    <svg
                      className="w-5 h-5 text-zinc-800"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                  </div>

                  <Input
                    type="password"
                    name="new-password"
                    id="new-password"
                    placeholder="Password (min. 8 character)"
                    className="block w-full pl-12"
                  />
                </div>
              </div>
              <Button label="Reset Password" type="submit" className="w-full" />
              {state?.error && (
                <div className="mt-4 text-sm text-center text-red-600">
                  {state.error}
                </div>
              )}
            </div>

            <div className="mt-6">
              <p className="text-sm text-center font-normal text-zinc-500">
                Remembered your password?{" "}
                <Link
                  href="/login"
                  className="font-bold text-zinc-900 hover:underline"
                >
                  Log in
                </Link>
              </p>
            </div>
          </div>
        </section>
      </form>
      <div className="fixed top-4 left-6">
        <Logo
          href="/"
          src="https://file.swell.so/file.rocks/filerocks-logo-full.svg"
          height={64}
          width={200}
        />
      </div>
    </>
  );
}
