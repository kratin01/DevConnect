import React from 'react';
import { Link } from 'react-router-dom';

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="card bg-base-100 shadow-md border">
        <div className="card-body prose sm:prose lg:prose-lg">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <h1 className="m-0">Terms of Service</h1>
            <div className="text-sm opacity-80">devconnect.services</div>
          </div>
          <p>
            These Terms of Service govern your use of DevConnect. By accessing or using the
            Service you agree to be bound by these terms. If you do not agree, do not use the
            Service.
          </p>

      <h2>Use of Service</h2>
      <p>
        You may use the Service to create a developer profile, connect with other
        developers, and share information. You agree to provide accurate information and
        to comply with applicable laws.
      </p>

      <h2>Accounts</h2>
      <p>
        You are responsible for maintaining the security of your account and password.
        DevConnect is not liable for any loss or damage from unauthorized access to your
        account.
      </p>

      <h2>Prohibited Conduct</h2>
      <p>
        You must not misuse the Service. Prohibited activities include harassment,
        impersonation, sending spam, uploading malicious content, or violating others'
        rights.
      </p>

      <h2>Payment and Fees</h2>
      <p>
        Certain parts of the Service may require payment. Payments are handled by
        third-party processors and subject to their terms. We are not responsible for
        their practices.
      </p>

      <h2>Limitation of Liability</h2>
      <p>
        To the extent permitted by law, DevConnect and its affiliates are not liable for
        indirect, incidental, or consequential damages arising from your use of the
        Service.
      </p>

          <h2>Contact</h2>
          <p>Questions about these terms should be sent to <a href="mailto:support@devconnect.services" className="hover:underline">support@devconnect.services</a>.</p>

          <div className="mt-6">
            <Link to="/" className="btn btn-ghost btn-sm">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
