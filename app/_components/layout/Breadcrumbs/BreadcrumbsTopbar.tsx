export const BreadcrumbsTopbar = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="flex items-center py-2 px-3 border-t border-b border-zinc-200">
    {children}
  </div>
);
