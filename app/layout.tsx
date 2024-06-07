import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "./_components/layout/Sidebar";
import { Toaster } from "react-hot-toast";
import { AppProvider } from "./_context/AppContext";
import { MediaProvider } from "./_context/MediaContext";
import { MediaPlayer } from "./_components/MediaPlayer";
import { ConfirmModalWrapper } from "./_components/modals/ConfirmModal/ConfirmModalWrapper";
import { UploadModal } from "./_components/modals/UploadModal/UploadModal";
import { UploadProvider } from "./_context/UploadContext";
import { Suspense } from "react";
import { Main } from "./_components/layout/Main";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { SessionData, sessionOptions } from "./_lib";
import { SessionProvider } from "./_context/SessionContext";
import { updateSession } from "./_lib/session";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Own Your Files, Ditch Your Subscriptions | file.rocks",
  description:
    "A clean bring-your-own S3 bucket cloud storage management system.",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getIronSession<SessionData>(cookies(), sessionOptions);
  return (
    <html className="h-full bg-white">
      <Script id="affiliate-config">{`window.lemonSqueezyAffiliateConfig = { "store": "filerocks" };`}</Script>
      <Script
        id="affiliate-script"
        src="https://lmsqueezy.com/affiliate.js"
        defer
      />
      <Script
        id="lemon.js"
        src="https://assets.lemonsqueezy.com/lemon.js"
        strategy="lazyOnload"
      />
      <body className="h-full">
        <SessionProvider
          session={JSON.parse(JSON.stringify(session))}
          updateSession={updateSession}
        >
          <AppProvider>
            <UploadProvider>
              <MediaProvider>
                <div>
                  <Sidebar />
                  <Main>
                    <div className="relative min-h-screen">
                      {children}
                      <MediaPlayer
                        session={JSON.parse(JSON.stringify(session))}
                      />
                    </div>
                  </Main>
                </div>
                <ConfirmModalWrapper />
                <UploadModal />
              </MediaProvider>
            </UploadProvider>
          </AppProvider>
        </SessionProvider>
        <Toaster position="bottom-center" reverseOrder={false} />
      </body>
    </html>
  );
}
