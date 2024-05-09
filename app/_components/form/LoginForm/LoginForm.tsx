"use client";
import { login } from "@/app/_lib/session";
import { useFormState } from "react-dom";
import { Input } from "../Input";
import { Button } from "../../buttons/Button";

export function LoginForm() {
  const [state, formAction] = useFormState<any, FormData>(login, undefined);

  return (
    <form action={formAction}>
      <section className="py-12 bg-white sm:py-16 lg:py-20">
        <div className="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
          <div className="grid grid-cols-1 gap-y-12 lg:gap-x-20 lg:grid-cols-2 2xl:gap-x-8">
            <div className="flex items-center">
              <div className="2xl:max-w-sm">
                <h1 className="text-3xl font-bold text-zinc-900">
                  Welcome Back 👋
                </h1>
                <p className="mt-4 mb-2 text-sm font-medium leading-6 text-zinc-500">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Turpis morbi pulvinar venenatis non.
                </p>

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
                          className="w-5 h-5 text-zinc-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                          />
                        </svg>
                      </div>

                      <Input
                        type="email"
                        name="email"
                        id=""
                        placeholder="Email address"
                        className="block w-full py-3 pl-12 pr-4 placeholder-zinc-500 border-zinc-300 rounded-lg focus:ring-zinc-600 focus:border-zinc-600 sm:text-sm caret-zinc-600"
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

                      <a
                        href="#"
                        title=""
                        className="text-sm font-medium text-zinc-600 hover:text-zinc-700"
                      >
                        {" "}
                        Forgot Password?{" "}
                      </a>
                    </div>
                    <div className="relative mt-2">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none">
                        <svg
                          className="w-5 h-5 text-zinc-400"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          stroke-width="2"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>

                      <Input
                        type="password"
                        name=""
                        id=""
                        placeholder="Password (min. 8 character)"
                        className="block w-full py-3 pl-12 pr-4 placeholder-zinc-500 border-zinc-300 rounded-lg focus:ring-zinc-600 focus:border-zinc-600 sm:text-sm caret-zinc-600"
                      />
                    </div>
                  </div>
                  <div>
                    <Button label="Log in" type="submit" className="w-full" />
                  </div>
                </div>

                <div className="mt-20">
                  <p className="text-sm font-normal text-zinc-500">
                    Don&apos;t have any?{" "}
                    <a
                      href="#"
                      title=""
                      className="font-bold text-zinc-900 hover:underline"
                    >
                      Create a free account
                    </a>
                  </p>
                </div>
              </div>
            </div>

            <div className="overflow-hidden text-center bg-zinc-100 rounded-2xl">
              <div className="flex items-center justify-center px-8 py-12 sm:px-12 sm:py-16 md:py-24 md:px-20">
                <div>
                  <img
                    className="w-auto mx-auto"
                    src="https://landingfoliocom.imgix.net/store/collection/clarity-dashboard/images/previews/sign-in/2/sign-in-illustration.png"
                    alt=""
                  />
                  <p className="mt-4 text-2xl font-bold text-zinc-900">
                    Build Beautiful Admin Panel
                  </p>
                  <p className="mt-4 text-sm font-medium text-zinc-500">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Turpis morbi pulvinar venenatis non.
                  </p>

                  <div className="flex items-center justify-center mt-16 space-x-1.5">
                    <div className="w-2.5 h-2.5 bg-zinc-600 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-zinc-300 rounded-full"></div>
                    <div className="w-2.5 h-2.5 bg-zinc-300 rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </form>
  );
}
