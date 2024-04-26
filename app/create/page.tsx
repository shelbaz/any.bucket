"use client";
import Link from "next/link";
import {
  Breadcrumbs,
  BreadcrumbsTopbar,
} from "../_components/layout/Breadcrumbs";

const createTypes = [
  {
    title: "Generate Images",
    description: "DALL-E 2, DALL-E 3, and more coming soon",
    icon: "🖼️",
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
            <Link
              key={card.title}
              href={card.path}
              className="col-span-12 sm:col-span-6 xl:col-span-4"
            >
              <div className="flex bg-white p-6 border border-zinc-200 rounded-xl duration-100 hover:bg-zinc-50 hover:border-zinc-300 cursor-pointer items-center">
                <div className="mr-2 text-3xl">{card.icon}</div>
                <div className="flex flex-col">
                  <h3 className="text-2xl font-semibold text-zinc-800">
                    {card.title}
                  </h3>
                  <p className="mt-1 text-xl text-zinc-700">
                    {card.description}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default CreatePage;
