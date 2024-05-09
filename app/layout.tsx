import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./_components/layout/Sidebar";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./_context/AppContext";
import { MediaProvider } from "./_context/MediaContext";
import { MediaPlayer } from "./_components/MediaPlayer";
import { ConfirmModalWrapper } from "./_components/modals/ConfirmModal/ConfirmModalWrapper";
import { EnsureBearerToken } from "./_components/EnsureBearerToken";
import { UploadModal } from "./_components/modals/UploadModal/UploadModal";
import { UploadProvider } from "./_context/UploadContext";
import { Suspense } from "react";
import { LogoutWrapper } from "./_components/form/LogoutWrapper";
import { Main } from "./_components/layout/Main";
import { Button } from "./_components/buttons/Button";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/16/solid";
import { SessionData } from "./_lib";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "S3 File Management - file.rocks",
  description: "S3 file management system built with Next.js and Tailwind CSS.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html className="h-full bg-white">
      <body className="h-full">
        <Suspense>
          <AppProvider>
            <UploadProvider>
              <MediaProvider>
                <div>
                  <Sidebar>
                    <LogoutWrapper>
                      {(session: SessionData) => (
                        <div className="flex items-center justify-between">
                          <div>
                            {session.isLoggedIn ? (
                              <>
                                <p className="text-xs text-zinc-500">
                                  Logged in as
                                </p>
                                <h3 className="line-clamp-1 font-medium text-sm text-zinc-900">
                                  {session.email || "Anonymous"}
                                </h3>
                              </>
                            ) : null}
                          </div>
                          <Button
                            type="submit"
                            variant="secondary"
                            Icon={<ArrowRightStartOnRectangleIcon />}
                            className="border-transparent hover:!border-transparent hover:bg-zinc-100 text-zinc-600 !px-2"
                            title="Log out"
                          />
                        </div>
                      )}
                    </LogoutWrapper>
                  </Sidebar>
                  <Main>
                    <div className="relative min-h-screen">
                      {children}
                      <MediaPlayer />
                    </div>
                  </Main>
                </div>
                <ConfirmModalWrapper />
                <EnsureBearerToken />
                <UploadModal />
              </MediaProvider>
            </UploadProvider>
          </AppProvider>
        </Suspense>
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
