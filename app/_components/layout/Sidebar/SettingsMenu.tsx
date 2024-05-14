import { Button } from "../../buttons/Button";
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
} from "@heroicons/react/16/solid";
import {
  AdjustmentsVerticalIcon,
  BuildingOffice2Icon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, use } from "react";
import { SessionContext } from "@/app/_context/SessionContext";
import clsx from "clsx";
import Link from "next/link";

export const SettingsMenuItem = ({
  label,
  href,
  Icon,
}: {
  label: string;
  href: string;
  Icon?: React.FC<React.SVGProps<SVGSVGElement>>;
}) => (
  <Menu.Item>
    {({ active }) => (
      <Link href={href}>
        <div
          className={clsx(
            "flex items-center py-2 px-2 rounded-lg cursor-pointer text-sm font-medium border space-x-3",
            active
              ? "bg-zinc-50 text-zinc-900 border-zinc-100"
              : "bg-white text-zinc-700 border-transparent"
          )}
        >
          {Icon && <Icon className="h-5 w-5" />}
          <span>{label}</span>
        </div>
      </Link>
    )}
  </Menu.Item>
);

export const SettingsMenu = async () => {
  const { session } = use(SessionContext);

  return (
    <div className="relative">
      <Menu>
        {({ open }) => (
          <>
            <div className="flex items-center justify-between">
              <div>
                {session.isLoggedIn ? (
                  <>
                    <p className="text-xs text-zinc-500">Logged in as</p>
                    <h3
                      className="line-clamp-1 font-medium text-sm text-zinc-900"
                      style={{ overflowWrap: "anywhere" }}
                      title={session.email || "Anonymous"}
                    >
                      {session.email || "Anonymous"}
                    </h3>
                  </>
                ) : null}
              </div>
              <Menu.Button as={Fragment}>
                {({ open }) => (
                  <div>
                    <Button
                      type="submit"
                      variant="secondary"
                      Icon={<Cog6ToothIcon />}
                      className={clsx(
                        "border-transparent hover:!border-transparent text-zinc-500 !px-2",
                        open ? "bg-zinc-100" : "hover:bg-zinc-100"
                      )}
                      title="Settings"
                    />
                  </div>
                )}
              </Menu.Button>
            </div>

            <Transition.Root
              show={open}
              as={Fragment}
              enter="transition ease-out duration-100 delay-0"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in delay-0 duration-300"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="bg-white border overflow-hidden rounded-xl min-w-52 border-zinc-200 shadow-md shadow-slate-100 absolute bottom-full right-0 mb-1 p-1">
                <SettingsMenuItem
                  label="Manage Buckets"
                  Icon={AdjustmentsVerticalIcon}
                  href="/settings/buckets"
                />
                <SettingsMenuItem
                  label="Integrations"
                  Icon={KeyIcon}
                  href="/settings/integrations"
                />
                <SettingsMenuItem
                  label="Workspace Settings"
                  Icon={BuildingOffice2Icon}
                  href="/settings/workspace"
                />
                <SettingsMenuItem
                  label="Account Settings"
                  Icon={UserCircleIcon}
                  href="/settings/account"
                />
                <SettingsMenuItem
                  label="Log out"
                  Icon={ArrowRightStartOnRectangleIcon}
                  href="/api/logout"
                />
              </Menu.Items>
            </Transition.Root>
          </>
        )}
      </Menu>
    </div>
  );
};
