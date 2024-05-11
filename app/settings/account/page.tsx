"use client";

import {
  BreadcrumbsTopbar,
  Breadcrumbs,
} from "@/app/_components/layout/Breadcrumbs";

const AccountPage = () => {
  return (
    <>
      <BreadcrumbsTopbar>
        <Breadcrumbs
          basePath="/settings"
          crumbs={[
            { title: "Settings", segment: "/" },
            { title: "Account", segment: "" },
          ]}
        />
      </BreadcrumbsTopbar>
      <div className="p-4 lg:p-12">
        <h1>Account</h1>
      </div>
    </>
  );
};

export default AccountPage;
