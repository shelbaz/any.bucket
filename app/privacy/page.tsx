import React from "react";
import { TopNav } from "../_components/marketing/TopNav/TopNav";
import { Footer } from "../_components/marketing/Footer/Footer";

const PrivacyPage = () => {
  return (
    <>
      <div className="lg:pb-14 lg:overflow-hidden relative">
        <TopNav />
        <div className="px-6 space-y-8 text-lg min-h-screen mx-auto max-w-3xl pt-24 pb-48">
          <p className="italic">Last Updated: June 7, 2024</p>
          <p>
            Welcome to file.rocks, a software-as-a-service (SaaS) located at{" "}
            <a href="https://www.file.rocks">https://www.file.rocks</a>. Your
            privacy is critically important to us. This Privacy Policy outlines
            how we collect, use, disclose, and safeguard your information when
            you visit our website and use our services.
          </p>
          <ol className="space-y-6">
            <li>
              Information We Collect a. Personal Information Identifiers: Such
              as name, email address, and IP address. Financial Information:
              Payment details for premium services. b. Non-Personal Information
              Usage Data: Information on how you interact with our services.
              Cookies: To enhance user experience and analyze service usage.
            </li>
            <li>
              How We Use Your Information Service Provision: To operate and
              maintain our services. Communication: To communicate with you
              about service updates or offers. Improvements: To enhance and
              personalize your user experience. Security: To protect against
              fraud and misuse of our services.
            </li>
            <li>
              Sharing of Information Service Providers: We may share information
              with vendors who help us operate our services. Legal Requirements:
              In response to lawful requests by public authorities.
            </li>
            <li>
              Data Security Measures: We employ industry-standard security
              measures to protect your data. Breach Notification: We will notify
              you in case of any breach that affects your personal information.
            </li>
            <li>
              Your Rights Access and Control: You can review, edit, or delete
              your personal information. Opt-Out: You can opt-out of marketing
              communications at any time.
            </li>
            <li>
              International Data Transfers Transfer: Your information may be
              transferred to, and maintained on, computers located outside of
              your state or country.
            </li>
            <li>
              Children&#39;s Privacy Age Limit: Our services are not intended
              for individuals under the age of 13.
            </li>
            <li>
              Changes to This Policy We reserve the right to modify this policy
              at any time. We will notify you of significant changes.
            </li>
            <li>
              Contact Us If you have any questions about this policy, please
              contact us at contact@file.rocks.
            </li>
          </ol>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default PrivacyPage;
