"use client";
import Link from "next/link";
import {
  Breadcrumbs,
  BreadcrumbsTopbar,
} from "../_components/layout/Breadcrumbs";
import { OptionCard } from "../_components/cards/OptionCard";

const settingsCards = [
  {
    title: "Buckets",
    description: "Add, remove, and manage S3-compatible buckets",
    icon: "🪣",
    path: "/settings/buckets",
  },
  {
    title: "Integrations",
    description: "Set OpenAI keys for generating images (more to come)",
    icon: "🔑",
    path: "/settings/integrations",
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
      <div className="grid gap-4 p-4 lg:p-12 max-w-screen-md mx-auto">
        {settingsCards.map((card) => (
          <OptionCard key={card.title} {...card} />
        ))}
      </div>
    </>
  );
};

export default SettingsPage;
