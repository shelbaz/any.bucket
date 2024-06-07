"use client";
import { Fragment, Suspense, useContext, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import {
  Cog6ToothIcon,
  Bars3Icon,
  FolderIcon,
  SparklesIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  Cog6ToothIcon as Cog6ToothIconSolid,
  StarIcon,
} from "@heroicons/react/16/solid";
import clsx from "clsx";
import { usePathname } from "next/navigation";
import { FileInput } from "../../upload/FileInput";
import { _Object } from "@aws-sdk/client-s3";
import { UploadContext } from "@/app/_context/UploadContext";
import { Logo } from "../../Logo";
import { SettingsMenu } from "./SettingsMenu";
import { SessionContext } from "@/app/_context/SessionContext";
import { Button } from "../../buttons/Button";
import { startCase } from "lodash";

const navigation = [
  { name: "Files", href: "/files", icon: FolderIcon },
  { name: "Create", href: "/create", icon: SparklesIcon },
  { name: "Settings", href: "/settings", icon: Cog6ToothIcon },
];

export const noSidebarPages = [
  "/login",
  "/signup",
  "/",
  "/forgot-password",
  "/reset-password",
  "/privacy",
  "/terms",
];

export const Sidebar = ({ children }: { children?: React.ReactNode }) => {
  const { session } = useContext(SessionContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const currentRootPath = pathname.split("/")[1];
  const { setFiles, setUploadModalIsOpen } = useContext(UploadContext);

  const uploadFiles = (files: File[]) => {
    setFiles(files);
    setUploadModalIsOpen(true);
  };

  // Don't show the sidebar on auth or landing page
  if (noSidebarPages.includes(pathname)) {
    return null;
  }

  return (
    <Suspense>
      <Transition.Root show={sidebarOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-50 lg:hidden"
          onClose={setSidebarOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="transition-opacity ease-linear duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity ease-linear duration-300"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-zinc-900/80" />
          </Transition.Child>

          <div className="fixed inset-0 flex">
            <Transition.Child
              as={Fragment}
              enter="transition ease-in-out duration-300 transform"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition ease-in-out duration-300 transform"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <Dialog.Panel className="relative mr-16 flex w-full max-w-xs flex-1">
                <Transition.Child
                  as={Fragment}
                  enter="ease-in-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in-out duration-300"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="absolute left-full top-0 flex w-16 justify-center pt-5">
                    <button
                      type="button"
                      className="-m-2.5 p-2.5"
                      onClick={() => setSidebarOpen(false)}
                    >
                      <span className="sr-only">Close sidebar</span>
                      <XMarkIcon
                        className="h-6 w-6 text-white"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </Transition.Child>
                {/* MOBILE Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white pt-4 pb-2">
                  <div className="flex shrink-0 items-center px-6 pb-2">
                    <Logo
                      height={1}
                      width={136}
                      src="https://file.swell.so/file.rocks/filerocks-logo-full.svg"
                    />
                  </div>
                  <nav className="flex flex-1 flex-col">
                    <ul role="list" className="flex flex-1 flex-col gap-y-7">
                      <li>
                        <ul role="list" className="-mx-2 space-y-1 px-4">
                          {navigation.map((item) => (
                            <li key={item.name}>
                              <a
                                href={item.href}
                                className={clsx(
                                  item.href === `/${currentRootPath}`
                                    ? "bg-zinc-50 text-black"
                                    : "text-zinc-700 hover:text-black hover:bg-zinc-50",
                                  "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                                )}
                              >
                                <item.icon
                                  className={clsx(
                                    item.href === `/${currentRootPath}`
                                      ? "text-black"
                                      : "text-zinc-400 group-hover:text-black",
                                    "h-6 w-6 shrink-0"
                                  )}
                                  aria-hidden="true"
                                />
                                {item.name}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </li>
                      <li className="pt-4 mt-auto border-t border-zinc-200 px-4">
                        <div>{children}</div>
                        <Suspense>
                          <SettingsMenu />
                        </Suspense>
                      </li>
                    </ul>
                  </nav>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>

      {/* Static sidebar for desktop */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 border-r border-zinc-200 bg-white pt-4">
          <div className="flex shrink-0 items-center px-6 pb-2">
            <Logo
              height={1}
              width={136}
              src="https://file.swell.so/file.rocks/filerocks-logo-full.svg"
            />
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              <li>
                <ul role="list" className="-mx-2 space-y-1 px-6">
                  {navigation.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className={clsx(
                          item.href === `/${currentRootPath}`
                            ? "bg-zinc-50 text-black"
                            : "text-zinc-700 hover:text-black hover:bg-zinc-50",
                          "group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold"
                        )}
                      >
                        <item.icon
                          className={clsx(
                            item.href === `/${currentRootPath}`
                              ? "text-black"
                              : "text-zinc-400 group-hover:text-black",
                            "h-6 w-6 shrink-0"
                          )}
                          aria-hidden="true"
                        />
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </li>
              <li className="pt-4 mt-auto border-t border-zinc-200 pl-6 pr-4">
                <div>{children}</div>
                <Suspense
                  fallback={
                    <div className="flex items-center justify-between">
                      <div>
                        {session.isLoggedIn ? (
                          <>
                            <h3
                              className="line-clamp-1 font-medium text-sm text-zinc-900"
                              style={{ overflowWrap: "anywhere" }}
                              title={session.email || "Anonymous"}
                            >
                              {session.email || "Anonymous"}
                            </h3>
                            <p className="flex items-center text-xs text-zinc-500">
                              {startCase(session.plan || "free")} Account
                              {session.plan === "pro" && (
                                <StarIcon className="h-3 w-3 ml-1" />
                              )}
                            </p>
                          </>
                        ) : null}
                      </div>
                      <div>
                        <Button
                          type="submit"
                          variant="secondary"
                          Icon={<Cog6ToothIconSolid />}
                          className="border-transparent hover:!border-transparent text-zinc-500 !px-2 hover:bg-zinc-100"
                          title="Settings"
                        />
                      </div>
                    </div>
                  }
                >
                  <SettingsMenu />
                </Suspense>
              </li>

              <li className="mb-8 px-6">
                <FileInput onInput={uploadFiles} />
              </li>
            </ul>
          </nav>
        </div>
      </div>

      <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-white px-4 py-4 shadow-sm sm:px-6 lg:hidden">
        <button
          type="button"
          className="-m-2.5 p-2.5 text-zinc-700 lg:hidden"
          onClick={() => setSidebarOpen(true)}
        >
          <span className="sr-only">Open sidebar</span>
          <Bars3Icon className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>
    </Suspense>
  );
};
