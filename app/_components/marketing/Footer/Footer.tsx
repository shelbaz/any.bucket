import Link from "next/link";

export const Footer = () => {
  return (
    <footer className="relative py-12 overflow-hidden bg-black lg:py-20 xl:py-24 sm:py-16">
      <div className="relative px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-y-12 lg:grid-cols-2 xl:grid-cols-7 gap-x-8 xl:gap-x-16">
          <div className="max-w-md mx-auto text-center xl:col-span-3 lg:max-w-sm lg:mx-0 lg:text-left">
            <p className="text-3xl font-normal text-white sm:text-4xl lg:text-5xl">
              No more cloud storage subscriptions.
            </p>
          </div>

          <div className="overflow-hidden lg:-ml-12 lg:-my-8 bg-base-900 rounded-xl xl:col-span-4">
            <div className="p-8 sm:p-12">
              <div className="grid grid-cols-2 gap-y-12 sm:grid-cols-3 gap-x-12 xl:gap-x-16">
                <div>
                  <h6 className="text-base font-semibold text-white">
                    Platform
                  </h6>

                  <ul className="mt-6 space-y-4">
                    <li>
                      <a
                        href="#pricing"
                        title=""
                        className="flex text-base font-normal text-gray-400 transition-all transform hover:text-white duration hover:translate-x-1"
                      >
                        Pricing
                      </a>
                    </li>
                    <li>
                      <Link
                        href="/login"
                        className="flex text-base font-normal text-gray-400 transition-all transform hover:text-white duration hover:translate-x-1"
                      >
                        Log in
                      </Link>
                    </li>

                    <li>
                      <a
                        href="mailto:support@file.rocks"
                        title=""
                        className="flex text-base font-normal text-gray-400 transition-all transform hover:text-white duration hover:translate-x-1"
                      >
                        Contact Us
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h6 className="text-base font-semibold text-white">
                    Resources
                  </h6>

                  <ul className="mt-6 space-y-4">
                    <li>
                      <a
                        href="https://blog.file.rocks"
                        target="_blank"
                        title="Files Rock - Block"
                        className="flex text-base font-normal text-gray-400 transition-all transform hover:text-white duration hover:translate-x-1"
                      >
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>

                <div>
                  <h6 className="text-base font-semibold text-white">Legal</h6>

                  <ul className="mt-6 space-y-4">
                    <li>
                      <Link
                        href="/privacy"
                        className="flex text-base font-normal text-gray-400 transition-all transform hover:text-white duration hover:translate-x-1"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
