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
      <div>
        <h1>Keys</h1>
      </div>
    </>
  );
};

export default KeysPage;
