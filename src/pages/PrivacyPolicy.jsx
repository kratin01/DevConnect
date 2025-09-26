import React from 'react';
import { Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="card bg-base-100 shadow-md border">
        <div className="card-body prose sm:prose lg:prose-lg">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <h1 className="m-0">Privacy Policy</h1>
            <div className="text-sm opacity-80">devconnect.services</div>
          </div>
          <p>
            DevConnect (“we”, “us”, or “our”) is committed to protecting the privacy of our
            users. This Privacy Policy explains what information we collect, how we use it,
            and the choices you have regarding your information.
          </p>

      <h2>Information We Collect</h2>
      <ul>
        <li>Account information: name, email, username, password.</li>
        <li>Profile details: bio, skills, location, links you provide.</li>
        <li>Usage data: pages visited, interactions, preferences.</li>
      </ul>

      <h2>How We Use Your Information</h2>
      <p>
        We use information to provide and improve the Service, communicate with you,
        personalize your experience, and for analytics and security purposes. We do not
        sell your personal information to third parties.
      </p>

      <h2>Third-Party Services</h2>
      <p>
        We may use third-party services (for example, payment processors or analytics
        providers). Those services have their own privacy policies and we encourage you
        to review them. When you make payments, your payment information is processed by
        the relevant payment provider and not stored on our servers.
      </p>

      <h2>Your Rights</h2>
      <p>
        You can request access to, correction of, or deletion of your personal data by
        contacting us at support@devconnect.com. We will respond to requests in
        accordance with applicable law.
      </p>

          <h2>Contact</h2>
          <p>If you have questions about this Privacy Policy, email us at <a href="mailto:support@devconnect.services" className="hover:underline">support@devconnect.services</a>.</p>

          <div className="mt-6">
            <Link to="/" className="btn btn-ghost btn-sm">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
