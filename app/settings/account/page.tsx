"use client";

import { Input } from "@/app/_components/form/Input";
import {
  BreadcrumbsTopbar,
  Breadcrumbs,
} from "@/app/_components/layout/Breadcrumbs";
import { SessionContext } from "@/app/_context/SessionContext";
import { useContext } from "react";

const AccountPage = () => {
  const { session } = useContext(SessionContext);
  const email = session.email;
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
      <div className="p-4 lg:p-12 max-w-6xl mx-auto">
        <div className="flex justify-between items-end">
          <h1 className="text-2xl font-semibold text-zinc-800 -mb-1 flex items-center">
            <span>Account Details</span>
          </h1>
        </div>
        <div className="w-full max-w-sm mt-8">
          <form title="If you need to change your email, please email support@file.rocks">
            <label
              htmlFor="rename-file"
              className="block text-sm font-semibold text-zinc-800 mb-1"
            >
              Email Address
            </label>
            <Input value={email} readOnly />
          </form>
        </div>
      </div>
    </>
  );
};

export default AccountPage;
