"use client";
import Link from "next/link";
import {
  Breadcrumbs,
  BreadcrumbsTopbar,
} from "../_components/layout/Breadcrumbs";

const settingsCards = [
  {
    title: "Buckets",
    description: "Add, remove, and manage S3-compatible buckets",
    icon: "🪣",
    path: "/settings/buckets",
  },
  {
    title: "API Keys",
    description: "Open AI keys for generating images and more",
    icon: "🔑",
    path: "/settings/keys",
  },
  {
    title: "Workspace",
    description: "Manage your workspace name, members, and billing",
    icon: "🏢",
    path: "/settings/workspace",
  },
  {
    title: "Account",
    description: "Update your email and password",
    icon: "👤",
    path: "/settings/account",
  },
];

const SettingsPage = () => {
  return (
    <>
      <BreadcrumbsTopbar>
        <Breadcrumbs
          basePath="/settings"
          crumbs={[{ title: "Settings", segment: "" }]}
        />
      </BreadcrumbsTopbar>
      <div className="grid grid-cols-12 gap-4 p-4 lg:p-12 max-w-screen-md mx-auto">
        {settingsCards.map((card) => (
          <Link key={card.title} href={card.path} className="col-span-12">
            <div className="flex h-full bg-white p-6 border border-zinc-200 rounded-xl duration-100 hover:bg-zinc-50 hover:border-zinc-300 cursor-pointer items-center">
              <div className="mr-6 text-7xl">{card.icon}</div>
              <div className="flex flex-col">
                <h3 className="text-2xl font-semibold text-zinc-800">
                  {card.title}
                </h3>
                <p className="mt-1 text-xl text-zinc-700">{card.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SettingsPage;
