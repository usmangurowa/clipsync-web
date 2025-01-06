import React from "react";

export default function TermsOfService() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <h1 className="mb-6 text-3xl font-bold">Terms of Service</h1>

      <section className="space-y-6">
        <div>
          <h2 className="mb-3 text-xl font-semibold">1. Acceptance of Terms</h2>
          <p className="text-gray-700">
            By accessing and using ClipSync, you accept and agree to be bound by
            the terms and conditions outlined in this agreement.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold">2. Service Description</h2>
          <p className="text-gray-700">
            ClipSync is a cloud-based clipboard synchronization service that
            allows users to share clipboard content across multiple devices.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold">
            3. User Responsibilities
          </h2>
          <ul className="list-disc pl-6 text-gray-700">
            <li>You must be at least 13 years old to use this service</li>
            <li>
              You are responsible for maintaining the confidentiality of your
              account
            </li>
            <li>You agree not to share inappropriate or illegal content</li>
            <li>
              You are responsible for all activities that occur under your
              account
            </li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold">4. Privacy and Data</h2>
          <p className="text-gray-700">
            We collect and process personal data as described in our Privacy
            Policy. By using ClipSync, you agree to our data handling practices.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold">
            5. Service Modifications
          </h2>
          <p className="text-gray-700">
            We reserve the right to modify or discontinue the service at any
            time, with or without notice. We shall not be liable to you or any
            third party for any modification, suspension, or discontinuance of
            the service.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-xl font-semibold">
            6. Limitation of Liability
          </h2>
          <p className="text-gray-700">
            ClipSync is provided {'"as is"'} without any warranties. We are not
            liable for any damages arising from the use of our service.
          </p>
        </div>

        <div className="mt-8">
          <p className="text-sm text-gray-500">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>
      </section>
    </div>
  );
}
