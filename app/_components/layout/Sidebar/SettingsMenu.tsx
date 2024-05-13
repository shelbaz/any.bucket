import { Button } from "../../buttons/Button";
import {
  ArrowRightStartOnRectangleIcon,
  Cog6ToothIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import {
  BuildingOffice2Icon,
  KeyIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { Menu, MenuItems, MenuItem, MenuButton } from "@headlessui/react";
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
  <MenuItem>
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
  </MenuItem>
);

export const SettingsMenu = async () => {
  const { session } = use(SessionContext);

  return (
    <div className="relative">
      <Menu>
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
          <MenuButton as={Fragment}>
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
          </MenuButton>
        </div>

        <MenuItems className="bg-white border overflow-hidden rounded-xl min-w-52 border-zinc-200 shadow-md shadow-slate-100 absolute bottom-full right-0 mb-1 p-1">
          <SettingsMenuItem
            label="Add a Bucket"
            Icon={PlusIcon}
            href="/settings/buckets?new=true"
          />
          <SettingsMenuItem
            label="API Keys"
            Icon={KeyIcon}
            href="/settings/keys"
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
        </MenuItems>
      </Menu>
    </div>
  );
};
