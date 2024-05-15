"use client";
import Link from "next/link";
import {
  Breadcrumbs,
  BreadcrumbsTopbar,
} from "../_components/layout/Breadcrumbs";
import { OptionCard } from "../_components/cards/OptionCard";

const createTypes = [
  {
    title: "Generate Images",
    description: "DALL-E 2, DALL-E 3, and more coming soon",
    icon: "🌄",
    path: "/create/image",
  },
];

const CreatePage = () => {
  return (
    <>
      <BreadcrumbsTopbar>
        <Breadcrumbs
          basePath="/create"
          crumbs={[{ title: "Create", segment: "/" }]}
        />
      </BreadcrumbsTopbar>
      <div className="grid grid-cols-12 gap-4 p-4 lg:p-12">
        {createTypes.map((card) => {
          return (
            <div
              key={card.title}
              className="col-span-12 sm:col-span-6 xl:col-span-4 h-full"
            >
              <OptionCard {...card} />
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CreatePage;
