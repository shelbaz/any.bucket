"use client";
import { useRouter } from "next/navigation";
import { Button } from "./_components/buttons/Button";
import { Footer } from "./_components/marketing/Footer/Footer";
import { StyledImage } from "./_components/marketing/StyledImage/StyledImage";
import { TopNav } from "./_components/marketing/TopNav/TopNav";
import { CheckIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { PayButton } from "./_components/PayButton";
import { useContext } from "react";
import { SessionContext } from "./_context/SessionContext";

const features = [
  {
    title: "Add any S3-compatible bucket",
    description:
      "We support any S3-compatible object storage, including Amazon S3, Cloudflare R2, Backblaze B2, Wasabi, and more.",
    graphic:
      "https://file.swell.so/file.rocks/Marketing%20Site/upload-bucket%20(1).svg",
  },
  {
    title: "Upload, manage, and share files",
    description:
      "Upload files, organize them into folders, and share them with flexible privacy settings.",
    graphic:
      "https://file.swell.so/file.rocks/Marketing%20Site/upload-files.svg",
  },
  {
    title: "No more ugly cloud storage consoles",
    description:
      "Our out-of-the-way interface is designed to be simple, fast, and easy-to-use.",
    graphic:
      "https://file.swell.so/file.rocks/Marketing%20Site/ugly-console%20(1).png",
  },
];

const tiers = [
  {
    id: "tier1",
    name: "Pro (Lifetime)",
    description: "",
    price: "$19",
    features: [
      "Upload files",
      "Download files",
      "Move files",
      "Create folders",
      "Share files and folders",
      "Pay only for what you use",
      "No subscription",
    ],
    href: "#",
    mostPopular: true,
  },
];

export default function HomePage() {
  const router = useRouter();
  const { session } = useContext(SessionContext);
  return (
    <>
      <div className="lg:pb-14 lg:overflow-hidden relative">
        <TopNav />
        <div className="mx-auto max-w-screen-2xl lg:px-8 pt-10 sm:pt-16 lg:pt-8">
          <div className="lg:grid lg:grid-cols-1 lg:gap-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl text-center sm:px-6 lg:px-0 lg:flex lg:items-center">
              <div className="py-8 lg:py-16">
                <h1 className="mt-4 text-4xl md:text-6xl tracking-tight font-extrabold text-black sm:mt-5">
                  <div>Own your files.</div>
                  <div className="mt-4 md:mt-0">Ditch the subscriptions.</div>
                </h1>
                <div className="mt-10 sm:mt-12">
                  <div className="flex items-center justify-center">
                    <>
                      <Button
                        label="Get Started"
                        onClick={() => router.push("/signup")}
                        className="mr-4"
                      />
                      <Button
                        variant="secondary"
                        label="See how it works&nbsp;&nbsp;&nbsp;&#9658;"
                        onClick={() =>
                          console.log("HOW DOES THIS THING WORK?!")
                        }
                      />
                    </>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center sm:px-6 lg:px-0 lg:flex lg:items-center relative w-full">
              <img
                src="https://file.swell.so/file.rocks/Marketing%20Site/hero-1.png"
                className="h-auto w-full rounded-3xl"
                alt="A depiction of the file.rocks web app, where a user has set up a payment pipeline called Vendors + Partners."
              />
            </div>

            <div className="py-20 bg-zinc-50 lg:rounded-3xl my-20 border-4 border-zinc-100">
              <div className="max-w-xl mx-auto px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="mb-20 text-center text-3xl leading-8 font-extrabold tracking-tight text-zinc-900 sm:text-4xl">
                  How does it work?
                </h2>
                <dl className="space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8">
                  {features.map((feature) => (
                    <div
                      key={feature.title}
                      className="flex flex-col items-center"
                    >
                      <dt className="flex flex-col items-center">
                        <StyledImage
                          src={feature.graphic}
                          className="h-64 w-full relative"
                          aria-hidden="true"
                          alt={feature.title}
                          objectFit="contain"
                          layout="fill"
                        />
                        <p className="mt-4 text-xl font-bold text-zinc-900 text-center">
                          {feature.title}
                        </p>
                      </dt>
                      <dd className="mt-2 text-base text-zinc-500 text-center">
                        {feature.description}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>

            <div className="relative py-20 bg-zinc-900 lg:rounded-3xl">
              <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                  <div className="mt-6">
                    <h2 className="text-5xl font-extrabold tracking-tight text-white">
                      Upload, move, rename, and organize.
                    </h2>
                    <p className="mt-4 text-lg text-zinc-300">
                      Files and folders are easy to manage. Upload files,
                      organize them into folders, view thumbnails and file
                      types, and get shareable links.
                    </p>
                    {/*<div className="mt-6">*/}
                    {/*  <Button label="Get started" onClick={() => console.log("CLICK")} />*/}
                    {/*</div>*/}
                  </div>
                </div>
                <div className="flex items-center justify-center mt-12 lg:mt-0">
                  <img
                    className="w-96 rounded-2xl shadow-zinc-600 shadow-lg"
                    alt="Upload files to your S3-compatible bucket"
                    src="https://file.swell.so/file.rocks/Marketing Site/upload-files.gif"
                  />
                </div>
              </div>
            </div>

            <div className="py-24">
              <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-4xl text-center">
                  <h2 className="text-base font-semibold leading-7 text-zinc-600">
                    Pricing
                  </h2>
                  <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Pay Once, Own Forever
                  </p>
                </div>
                <p className="mx-auto mt-6 max-w-2xl text-center text-lg leading-8 text-gray-600">
                  After you purchase, you&apos;ll have access to all current and
                  future features.
                </p>
                <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-y-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                  {tiers.map((tier) => (
                    <div
                      key={tier.id}
                      className={clsx(
                        tier.mostPopular ? "lg:z-10" : "lg:mt-8",
                        "flex flex-col justify-between rounded-3xl bg-white p-8 ring-1 ring-gray-200 xl:p-10 col-span-1 lg:col-start-2"
                      )}
                    >
                      <div>
                        <div className="flex items-center justify-between gap-x-4">
                          <h3
                            id={tier.id}
                            className={clsx(
                              "text-zinc-900",
                              "text-xl font-semibold leading-8"
                            )}
                          >
                            {tier.name}
                          </h3>
                          {tier.mostPopular ? (
                            <p className="rounded-full bg-blue-600/10 px-2.5 py-1 text-xs font-semibold leading-5 text-blue-700">
                              🐦&nbsp;&nbsp;Early Bird
                            </p>
                          ) : null}
                        </div>
                        <p className="mt-4 text-sm leading-6 text-gray-600">
                          {tier.description}
                        </p>
                        <p className="mt-6 flex items-baseline gap-x-1">
                          <span className="text-6xl font-bold tracking-tight text-gray-900">
                            {tier.price}
                          </span>
                          <span className="text-lg ml-2 font-semibold leading-6 text-gray-600">
                            one time
                          </span>
                        </p>
                        <ul
                          role="list"
                          className="mt-8 space-y-3 text-sm leading-6 text-gray-600"
                        >
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex gap-x-3">
                              <CheckIcon
                                className="h-6 w-5 flex-none text-zinc-600"
                                aria-hidden="true"
                              />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {!session?.plan || session?.plan === "free" ? (
                        <PayButton
                          buttonClassName="w-full mt-12 !bg-black hover:!bg-zinc-800"
                          label="Purchase"
                        />
                      ) : (
                        <Button
                          label="Already Purchased"
                          isDisabled={true}
                          className="mt-12 w-full"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
