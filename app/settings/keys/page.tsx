"use client";

import {
  BreadcrumbsTopbar,
  Breadcrumbs,
} from "@/app/_components/layout/Breadcrumbs";

const KeysPage = () => {
  return (
    <>
      <BreadcrumbsTopbar>
        <Breadcrumbs
          basePath="/settings"
          crumbs={[
            { title: "Settings", segment: "/" },
            { title: "Keys", segment: "" },
          ]}
        />
      </BreadcrumbsTopbar>
      <div className="p-4 lg:p-12">
        <h1>Keys</h1>
      </div>
    </>
  );
};

export default KeysPage;
