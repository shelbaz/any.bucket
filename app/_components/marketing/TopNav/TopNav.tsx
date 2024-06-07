"use client";
import { Fragment, useContext } from "react";
import { Popover, Transition } from "@headlessui/react";
import { CalendarIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import {
  Bars3Icon,
  BookmarkIcon,
  InformationCircleIcon,
  XMarkIcon,
} from "@heroicons/react/20/solid";
import { Button } from "../../buttons/Button";
import { Logo } from "../../Logo";
import { SessionContext } from "@/app/_context/SessionContext";

const resources = [
  {
    name: "Help Center",
    description:
      "Get all of your questions answered in our forums or contact support.",
    href: "/help",
    icon: InformationCircleIcon,
  },
  {
    name: "Guides",
    description:
      "Learn how to maximize our platform to get the most out of it.",
    href: "/guides",
    icon: BookmarkIcon,
  },
  {
    name: "Events",
    description:
      "See what meet-ups and other events we might be planning near you.",
    href: "/events",
    icon: CalendarIcon,
  },
  {
    name: "Security",
    description: "Understand how we take your privacy seriously.",
    href: "/security",
    icon: ShieldCheckIcon,
  },
];

export const TopNav = ({ className = "" }) => {
  const router = useRouter();
  const { session } = useContext(SessionContext);

  return (
    <Popover className="relative">
      {({ open }) => (
        <>
          <div
            className={`flex justify-between items-center px-4 py-6 sm:px-6 md:justify-start md:space-x-10 mx-auto ${className}`}
          >
            <div className="flex justify-start lg:w-0 lg:flex-1">
              <Logo
                href="/"
                src="https://file.swell.so/file.rocks/filerocks-logo-full.svg"
                height={64}
                width={200}
              />
            </div>
            <div className="-mr-2 -my-2 hidden">
              <Popover.Button className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                <span className="sr-only">Open menu</span>
                <Bars3Icon className="h-6 w-6 text-black" aria-hidden="true" />
              </Popover.Button>
            </div>
            {/* TODO: Bring back the hamburger menu by adding hidden md:flex instead */}
            <div className="flex items-center justify-end flex-1 lg:w-0">
              <div className="hidden md:flex-1 md:flex md:items-center md:justify-end md:mr-12">
                <Popover.Group as="nav" className="hidden md:flex space-x-10">
                  <a
                    href="/pricing"
                    className="text-base font-medium text-black hover:text-gray-900"
                  >
                    Pricing
                  </a>

                  {/* <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={clsx(
                            open ? "text-gray-900" : "text-black",
                            "group rounded-md inline-flex items-center text-base font-medium hover:text-gray-900 focus:outline-none"
                          )}
                        >
                          <span>More</span>
                          <ChevronDownIcon
                            className={clsx(
                              open ? "text-black" : "text-black",
                              "ml-2 h-5 w-5 group-hover:text-black"
                            )}
                            aria-hidden="true"
                          />
                        </Popover.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel
                            static
                            className="absolute z-10 right-0 mt-3 px-2 w-screen max-w-xs sm:px-0"
                          >
                            <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden">
                              <div className="relative grid gap-6 px-5 py-6 sm:gap-8 sm:p-8 bg-white">
                                {resources.map((item) => (
                                  <a
                                    key={item.name}
                                    href={item.href}
                                    className="-m-3 p-3 block rounded-md hover:bg-gray-50"
                                  >
                                    <p className="text-base font-medium text-gray-900">
                                      {item.name}
                                    </p>
                                    <p className="mt-1 text-sm text-black">
                                      {item.description}
                                    </p>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover> */}
                </Popover.Group>
              </div>
              {session?.email ? (
                <Button
                  variant="primary"
                  label="View My Files"
                  onClick={() => router.push("/files")}
                  className="mr-4 py-2"
                />
              ) : (
                <>
                  <Button
                    variant="secondary"
                    label="Log in"
                    onClick={() => router.push("/login")}
                    className="mr-4 py-2"
                  />
                  <Button
                    label="Get Started"
                    onClick={() => router.push("/signup")}
                    className="py-2 shadow-none"
                  />
                </>
              )}
            </div>
          </div>

          <Transition
            show={open}
            as={Fragment}
            enter="duration-200 ease-out"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="duration-100 ease-in"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <Popover.Panel
              focus
              static
              className="absolute top-0 inset-x-0 p-2 transition transform origin-top-right z-10 md:hidden"
            >
              <div className="rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-y-2 divide-gray-50 bg-white">
                <div className="pt-5 pb-6 px-5">
                  <div className="flex items-center justify-between">
                    <div>
                      <Logo
                        href="/"
                        src="https://file.swell.so/file.rocks/filerocks-logo-full.svg"
                        height={64}
                        width={200}
                      />
                    </div>
                    <div className="-mr-2">
                      <Popover.Button className="rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-black hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                        <span className="sr-only">Close menu</span>
                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                      </Popover.Button>
                    </div>
                  </div>
                </div>
                <div className="py-6 px-5">
                  <div className="grid grid-cols-2 gap-4">
                    <a
                      href="/pricing"
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      Pricing
                    </a>

                    <a
                      href="/docs"
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      Docs
                    </a>

                    <a
                      href="/enterprise"
                      className="text-base font-medium text-gray-900 hover:text-gray-700"
                    >
                      Enterprise
                    </a>
                    {resources.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="text-base font-medium text-gray-900 hover:text-gray-700"
                      >
                        {item.name}
                      </a>
                    ))}
                  </div>
                  <div className="mt-6">
                    <>
                      <a
                        href="#"
                        className="w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
                      >
                        Sign up
                      </a>
                      <p className="mt-6 text-center text-base font-medium text-black">
                        Existing customer?{" "}
                        <a
                          href="#"
                          className="text-indigo-600 hover:text-indigo-500"
                        >
                          Sign in
                        </a>
                      </p>
                    </>
                  </div>
                </div>
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  );
};
