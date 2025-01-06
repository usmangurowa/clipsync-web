import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="mb-8 text-3xl font-bold">Privacy Policy</h1>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Introduction</h2>
        <p className="mb-4">
          ClipSync {'("we," "our," or "us")'} is committed to protecting your
          privacy. This Privacy Policy explains how we collect, use, and
          safeguard your information when you use our clipboard synchronization
          service.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Information We Collect</h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>Clipboard content that you choose to synchronize</li>
          <li>Device information (device type, operating system)</li>
          <li>Authentication data</li>
          <li>Usage statistics and analytics</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">
          How We Use Your Information
        </h2>
        <ul className="list-disc space-y-2 pl-6">
          <li>To provide clipboard synchronization services</li>
          <li>To improve our service functionality</li>
          <li>To ensure security of your data</li>
          <li>To respond to your requests or questions</li>
        </ul>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Data Security</h2>
        <p className="mb-4">
          We implement appropriate security measures to protect your data. All
          clipboard content is encrypted during transmission and storage. We
          regularly review and update our security practices to maintain data
          protection.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Data Retention</h2>
        <p className="mb-4">
          Clipboard data is temporarily stored and automatically deleted after
          synchronization is complete. We retain account information only as
          long as necessary to provide our services.
        </p>
      </section>

      <section className="mb-8">
        <h2 className="mb-4 text-2xl font-semibold">Contact Us</h2>
        <p className="mb-4">
          If you have any questions about this Privacy Policy, please contact us
          at:
          <br />
          <a
            href="mailto:clipsync.xyz@gmail.com"
            className="text-blue-600 hover:underline"
          >
            clipsync.xyz@gmail.com
          </a>
        </p>
      </section>

      <footer className="text-sm text-gray-600">
        Last updated: {new Date().toLocaleDateString()}
      </footer>
    </div>
  );
}
