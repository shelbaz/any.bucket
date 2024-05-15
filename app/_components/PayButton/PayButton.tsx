"use client";
import clsx from "clsx";
import { Button } from "../buttons/Button";
import { useCallback, useContext, useEffect } from "react";
import { SessionContext } from "@/app/_context/SessionContext";
import { useUpdateWorkspace } from "@/app/_hooks/workspace/use-update-workspace";

export const PayButton = ({
  label = "Purchase - $19 (one time)",
  buttonClassName,
}: {
  label?: string;
  buttonClassName?: string;
}) => {
  const { session, updateSession } = useContext(SessionContext);
  const { updateWorkspace } = useUpdateWorkspace();

  const openCheckout = () => {
    // @ts-ignore
    if (!window.LemonSqueezy) return;
    const params = new URLSearchParams();
    params.set("checkout[email]", session.email);
    params.set("logo", "1");
    params.set("desc", "0");
    params.set("media", "0");
    const checkoutUrl =
      `https://buy.file.rocks/checkout/buy/${
        process.env.NODE_ENV === "production"
          ? "73e2a291-7914-4eb2-9623-3453c1fc3c84"
          : "171eab4d-6eaa-4204-8ae9-8bd72406a2e3"
      }?` + params.toString();
    // @ts-ignore
    window.LemonSqueezy.Url.Open(checkoutUrl);
  };

  const payHandler = useCallback(
    (event: any) => {
      if (event?.event === "Checkout.Success") {
        updateSession({ plan: "pro" });
        updateWorkspace(session.workspaceId, { plan: "pro" });
      }
    },
    [session, updateSession, updateWorkspace]
  );

  const setUpLemonSqueezy = useCallback(() => {
    // @ts-ignore
    if (!window.createLemonSqueezy) {
      setTimeout(setUpLemonSqueezy, 200);
      return;
    }
    // @ts-ignore
    window.createLemonSqueezy();
    // @ts-ignore
    LemonSqueezy.Setup({
      eventHandler: payHandler,
    });
  }, [payHandler]);

  useEffect(() => {
    setUpLemonSqueezy();
  }, [setUpLemonSqueezy]);

  return (
    <>
      <div>
        <Button
          type="button"
          label={label}
          className={clsx(
            "!bg-purple-600 hover:!bg-purple-800",
            buttonClassName
          )}
          onClick={openCheckout}
        />
      </div>
    </>
  );
};
