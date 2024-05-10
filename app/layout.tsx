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
import { Main } from "./_components/layout/Main";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, defaultSession, sessionOptions } from "./_lib";
import { createContext } from "react";
import { SessionProvider } from "./_context/SessionContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "S3 File Management - file.rocks",
  description: "S3 file management system built with Next.js and Tailwind CSS.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return (
    <html className="h-full bg-white">
      <body className="h-full">
        <Suspense>
          <SessionProvider session={JSON.parse(JSON.stringify(session))}>
            <AppProvider>
              <UploadProvider>
                <MediaProvider>
                  <div>
                    <Sidebar />
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
          </SessionProvider>
        </Suspense>
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
