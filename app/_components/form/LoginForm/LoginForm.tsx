"use client";
import { login } from "@/app/_lib/session";
import { useFormState } from "react-dom";
import { Input } from "../Input";
import { Button } from "../../buttons/Button";
import Link from "next/link";
import { Logo } from "../../Logo";

export function LoginForm() {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);

  return (
    <>
      <form action={formAction}>
        <section className="py-12 px-4 bg-white h-screen flex md:items-center md:justify-center bg-grid">
          <div className="md:max-w-sm mx-auto w-full">
            <h1 className="text-3xl text-center font-bold text-zinc-900 mb-4">
              Log in
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
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-zinc-900"
                  >
                    Password
                  </label>
                  {/* <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-zinc-500 hover:text-zinc-700"
                >
                  Forgot Password?
                </Link> */}
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
                    name="password"
                    id="password"
                    placeholder="Password (min. 8 character)"
                    className="block w-full pl-12"
                  />
                </div>
              </div>
              <div>
                <Button label="Log in" type="submit" className="w-full" />
              </div>
            </div>

            <div className="mt-6">
              <p className="text-sm text-center font-normal text-zinc-500">
                Don&apos;t have any?{" "}
                <Link
                  href="/signup"
                  className="font-bold text-zinc-900 hover:underline"
                >
                  Create an account
                </Link>
              </p>
            </div>
          </div>
        </section>
      </form>
      <div className="fixed top-4 left-6">
        <Logo href="/" />
      </div>
    </>
  );
}
