"use client";
import { createMountPoint, createReactTreeMounter } from "react-confirm";

export const ConfirmModalWrapper = () => {
  const mounter = createReactTreeMounter();
  const MountPoint = createMountPoint(mounter);
  return <MountPoint />;
};
