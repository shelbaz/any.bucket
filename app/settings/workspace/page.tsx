"use client";

import {
  BreadcrumbsTopbar,
  Breadcrumbs,
} from "@/app/_components/layout/Breadcrumbs";

const WorkspacePage = () => {
  return (
    <>
      <BreadcrumbsTopbar>
        <Breadcrumbs
          basePath="/settings"
          crumbs={[
            { title: "Settings", segment: "/" },
            { title: "Workspace", segment: "" },
          ]}
        />
      </BreadcrumbsTopbar>
      <div>
        <h1>Workspace</h1>
      </div>
    </>
  );
};

export default WorkspacePage;
