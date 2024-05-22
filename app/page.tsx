"use client";
import { useRouter } from "next/navigation";
import { Button } from "./_components/buttons/Button";
import { Footer } from "./_components/marketing/Footer/Footer";
import { StyledImage } from "./_components/marketing/StyledImage/StyledImage";
import { TopNav } from "./_components/marketing/TopNav/TopNav";

const features = [
  {
    title: "Add any S3-compatible bucket",
    description:
      "We support any S3-compatible object storage, including Amazon S3, Cloudflare R2, Backblaze B2, Wasabi, and more.",
    graphic:
      "https://file.swell.so/file.rocks/Marketing%20Site/upload-bucket.svg",
  },
  {
    title: "Upload, manage, and share files",
    description:
      "Each recipient has control of their own payout method and schedule.",
    graphic:
      "https://file.swell.so/file.rocks/Marketing%20Site/upload-files.svg",
  },
  {
    title: "Say goodbye to ugly cloud storage consoles",
    description:
      "We have out-of-the-box embeds for analytics, billing, and checkout.",
    graphic: "/images/graphics/embed-graphic.png",
  },
];

export default function HomePage() {
  const router = useRouter();
  return (
    <>
      <div className="lg:pb-14 lg:overflow-hidden relative">
        <TopNav />
        <div className="mx-auto max-w-7xl lg:px-8 pt-10 sm:pt-16 lg:pt-8">
          <div className="lg:grid lg:grid-cols-1 lg:gap-8">
            <div className="mx-auto max-w-md px-4 sm:max-w-3xl text-center sm:px-6 lg:px-0 lg:flex lg:items-center">
              <div className="py-8 lg:py-16">
                <h1 className="mt-4 text-4xl md:text-6xl tracking-tight font-extrabold text-black sm:mt-5">
                  <div>Own your own files.</div>
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

            <div className="mx-auto max-w-md px-4 sm:max-w-none text-center sm:px-6 lg:px-0 lg:flex lg:items-center relative">
              {/* <StyledImage
                src={BackgroundCircles}
                className="-top-2/3 left-1/2 -translate-x-1/2 absolute min-w-screen h-auto -z-10"
                alt="Abstract circle outlines in the background"
              />
              <StyledImage
                src={PipelineGraphic}
                className="w-full h-auto"
                alt="A depiction of the file.rocks web app, where a user has set up a payment pipeline called Vendors + Partners."
              /> */}
            </div>

            <div className="py-20">
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

            <div className="relative pt-20 pb-24">
              <div className="relative">
                <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                  <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-16 lg:max-w-none lg:mx-0 lg:px-0">
                    <div>
                      <div></div>
                      <div className="mt-6">
                        <h2 className="text-5xl font-extrabold tracking-tight text-zinc-900">
                          Accept payments and set up flexible payouts
                        </h2>
                        <p className="mt-4 text-lg text-zinc-500">
                          Semper curabitur ullamcorper posuere nunc sed. Ornare
                          iaculis bibendum malesuada faucibus lacinia porttitor.
                          Pulvinar laoreet sagittis viverra duis. In venenatis
                          sem arcu pretium pharetra at. Lectus viverra dui
                          tellus ornare pharetra.
                        </p>
                        {/*<div className="mt-6">*/}
                        {/*  <Button label="Get started" onClick={() => console.log("CLICK")} />*/}
                        {/*</div>*/}
                      </div>
                    </div>
                    {/*<div className="mt-8 border-t border-zinc-200 pt-6">*/}
                    {/*  <blockquote>*/}
                    {/*    <div>*/}
                    {/*      <p className="text-base text-zinc-500">*/}
                    {/*        &ldquo;Cras velit quis eros eget rhoncus lacus ultrices sed diam. Sit orci risus aenean curabitur*/}
                    {/*        donec aliquet. Mi venenatis in euismod ut.&rdquo;*/}
                    {/*      </p>*/}
                    {/*    </div>*/}
                    {/*    <footer className="mt-3">*/}
                    {/*      <div className="flex items-center space-x-3">*/}
                    {/*        <div className="flex-shrink-0">*/}
                    {/*          <img*/}
                    {/*            className="h-6 w-6 rounded-full"*/}
                    {/*            src="https://images.unsplash.com/photo-1509783236416-c9ad59bae472?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=1024&h=1024&q=80"*/}
                    {/*            alt=""*/}
                    {/*          />*/}
                    {/*        </div>*/}
                    {/*        <div className="text-base font-medium text-zinc-700">Marcia Hill, Digital Marketing Manager</div>*/}
                    {/*      </div>*/}
                    {/*    </footer>*/}
                    {/*  </blockquote>*/}
                    {/*</div>*/}
                  </div>
                  <div className="mt-12 sm:mt-16 lg:mt-0">
                    <div className="px-10 lg:px-0 lg:m-0 lg:relative lg:h-full">
                      {/* <StyledImage
                      className="w-full rounded-xl lg:absolute lg:left-0 lg:w-full lg:h-auto lg:max-w-none"
                      src={PipelinesGraphic}
                      alt="Pipelines"
                    /> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-24">
              <div className="lg:mx-auto lg:max-w-7xl lg:px-8 lg:grid lg:grid-cols-2 lg:grid-flow-col-dense lg:gap-24">
                <div className="px-4 max-w-xl mx-auto sm:px-6 lg:py-32 lg:max-w-none lg:mx-0 lg:px-0 lg:col-start-2">
                  <div>
                    <div></div>
                    <div className="mt-6">
                      <h2 className="text-5xl font-extrabold tracking-tight text-zinc-900">
                        A perfect fit for any product or marketplace
                      </h2>
                      <p className="mt-4 text-lg text-zinc-500">
                        Semper curabitur ullamcorper posuere nunc sed. Ornare
                        iaculis bibendum malesuada faucibus lacinia porttitor.
                        Pulvinar laoreet sagittis viverra duis. In venenatis sem
                        arcu pretium pharetra at. Lectus viverra dui tellus
                        ornare pharetra.
                      </p>
                      {/*<div className="mt-6">*/}
                      {/*  <Button label="Get started" onClick={() => console.log('CLICK')} />*/}
                      {/*</div>*/}
                    </div>
                  </div>
                </div>
                <div className="mt-12 sm:mt-16 lg:mt-0 lg:col-start-1">
                  <div className="px-10 lg:px-0 lg:m-0 lg:relative lg:h-full">
                    {/* <StyledImage
                      className="w-full h-auto lg:absolute lg:right-0 lg:h-full lg:w-auto lg:max-w-none"
                      src={PipelineCardsGraphic}
                      alt="Customer profile user interface"
                    /> */}
                  </div>
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
