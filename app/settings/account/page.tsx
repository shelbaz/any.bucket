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
      <div>
        <h1>Account</h1>
      </div>
    </>
  );
};

export default AccountPage;
