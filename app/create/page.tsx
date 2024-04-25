"use client";
import Link from "next/link";
import { Breadcrumbs } from "../_components/layout/Breadcrumbs";

const createTypes = [
  {
    title: "Text to Image",
    description: "Generate images from text",
    icon: "🖼️",
    path: "/create/image",
  },
];

const CreatePage = () => {
  return (
    <>
      <div className="flex items-center py-2 px-3 border-t border-b border-zinc-200">
        <Breadcrumbs
          basePath="/create"
          crumbs={[{ title: "Create", segment: "/" }]}
        />
      </div>
      <div className="grid grid-cols-12 gap-4 p-4 lg:p-12">
        {createTypes.map((card) => {
          return (
            <Link
              key={card.title}
              href={card.path}
              className="col-span-12 sm:col-span-6 xl:col-span-4"
            >
              <div className="bg-white p-6 border border-zinc-200 rounded-xl duration-100 hover:bg-zinc-50 hover:border-zinc-300 cursor-pointer">
                <h3 className="text-2xl font-semibold text-zinc-800">
                  {card.title}
                </h3>
                <p className="mt-1 text-xl text-zinc-700">{card.description}</p>
              </div>
            </Link>
          );
        })}
      </div>
    </>
  );
};

export default CreatePage;
