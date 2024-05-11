"use client";

import {
  BreadcrumbsTopbar,
  Breadcrumbs,
} from "@/app/_components/layout/Breadcrumbs";

const IntegrationPage = () => {
  return (
    <>
      <BreadcrumbsTopbar>
        <Breadcrumbs
          basePath="/settings"
          crumbs={[
            { title: "Settings", segment: "/" },
            { title: "Keys", segment: "keys" },
            { title: "Integration", segment: "integration" },
          ]}
        />
      </BreadcrumbsTopbar>
      <div className="p-4 lg:p-12">
        <h1>Integration Page</h1>
      </div>
    </>
  );
};

export default IntegrationPage;
