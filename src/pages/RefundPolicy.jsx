import React from 'react';
import { Link } from 'react-router-dom';

const RefundPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <div className="card bg-base-100 shadow-md border">
        <div className="card-body prose sm:prose lg:prose-lg">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <h1 className="m-0">Refund Policy</h1>
            <div className="text-sm opacity-80">devconnect.services</div>
          </div>
          <p>
            DevConnect wants you to be satisfied. This policy explains when refunds are
            available and how to request one.
          </p>

      <h2>Digital Goods and Services</h2>
      <p>
        Purchases of digital goods or services are generally non-refundable unless
        required by law or when the product is defective or materially different from
        its description.
      </p>

      <h2>How to Request a Refund</h2>
      <p>
        To request a refund, contact support@devconnect.com with your order details and
        the reason for the request. We will review and respond within a reasonable
        timeframe.
      </p>

      <h2>Chargebacks</h2>
      <p>
        If you initiate a chargeback through your payment provider, DevConnect may
        investigate and, where appropriate, contest the chargeback if we believe the
        charge was valid.
      </p>

          <h2>Contact</h2>
          <p>For refund inquiries email <a href="mailto:support@devconnect.services" className="hover:underline">support@devconnect.services</a>.</p>

          <div className="mt-6">
            <Link to="/" className="btn btn-ghost btn-sm">← Back to Home</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
