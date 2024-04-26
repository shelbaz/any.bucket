export const BreadcrumbsTopbar = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="flex items-center py-2 px-3 border-b border-zinc-200 sticky top-14 lg:top-0 bg-white z-10">
    {children}
  </div>
);
