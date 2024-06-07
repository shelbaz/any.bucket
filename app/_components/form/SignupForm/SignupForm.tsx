"use client";
import { signup } from "@/app/_lib/session";
import { useFormState } from "react-dom";
import { Input } from "../Input";
import { Button } from "../../buttons/Button";
import Link from "next/link";
import { Logo } from "../../Logo";

export function SignupForm() {
  const [state, formAction] = useFormState<any, FormData>(signup, undefined);

  return (
    <>
      <div className="bg-white fixed top-0 left-0 w-full px-6 py-4 z-50 border-b border-zinc-100 lg:border-transparent">
        <Logo
          href="/"
          src="https://file.swell.so/file.rocks/filerocks-logo-full.svg"
          height={64}
          width={200}
        />
      </div>
      <form action={formAction}>
        <section className="py-36 bg-white lg:py-20">
          <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-lg lg:max-w-7xl w-full">
            <div className="grid grid-cols-1 gap-y-12 lg:gap-x-20 lg:grid-cols-2 2xl:gap-x-8 w-full">
              <div className="flex items-center">
                <div className="2xl:max-w-sm w-full">
                  <h1 className="text-3xl text-center font-bold text-zinc-900 mb-4">
                    Sign up
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
                      <Button
                        label="Sign up"
                        type="submit"
                        className="w-full"
                      />
                      {state?.error && (
                        <div className="mt-4 text-sm text-center text-red-600">
                          {state.error}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="mt-6">
                    <p className="text-sm text-center font-normal text-zinc-500">
                      Already have an account?{" "}
                      <Link
                        href="/login"
                        className="font-bold text-zinc-900 hover:underline"
                      >
                        Log in
                      </Link>
                    </p>
                  </div>
                </div>
              </div>

              <div className="overflow-hidden text-center bg-zinc-100 rounded-2xl">
                <div className="flex items-center justify-center px-8 py-12 sm:px-12 sm:py-16 md:py-24 md:px-20">
                  <div>
                    <img
                      className="w-auto mx-auto"
                      src="https://file.swell.so/file.rocks/login-screen@2x.png"
                      alt=""
                    />
                    <p className="mt-6 text-2xl font-bold text-zinc-900">
                      Manage Any S3-Compatible Storage
                    </p>
                    <p className="mt-4 text-sm font-medium text-zinc-500">
                      You&apos;re tired of paying for Dropbox, Google Drive, or
                      iCloud... But you don&apos;t want to give up the
                      convenience of a cloud storage service. file.rocks is the
                      ease of cloud with the ownership of S3.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    </>
  );
}
