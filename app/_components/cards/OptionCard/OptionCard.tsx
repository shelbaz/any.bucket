import Link from "next/link";

export const OptionCard = ({
  title,
  path,
  icon,
  description,
}: {
  title: string;
  path: string;
  icon: React.ReactNode;
  description: string;
}) => (
  <Link key={title} href={path} className="w-full h-full">
    <div className="flex bg-white p-6 border border-zinc-200 rounded-xl duration-100 hover:bg-zinc-50 hover:border-zinc-300 cursor-pointer items-center">
      <div className="mr-6 text-7xl">{icon}</div>
      <div className="flex flex-col">
        <h3 className="text-2xl font-semibold text-zinc-800">{title}</h3>
        <p className="mt-1 text-xl text-zinc-700">{description}</p>
      </div>
    </div>
  </Link>
);
