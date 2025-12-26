import React from "react";

const PrivacyPolicy = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* Hero Banner */}
      <div className="PrivacyBanner" role="img" aria-label="Career Banner">
        <div className="content ">
          <h1>Privacy Policy</h1>
        </div>
      </div>
      <section className="pb-5 pt-3">
        <div className="container">
          <div className="bg-white p-2 p-sm-5 rounded shadow">
            <h2 className="pb-3 text-center text-gradient">Who We Are</h2>
            <hr />
            {/* Header */}
            {/* <div className="border-start border-5 border-warning ps-4 mb-4 fst-italic">
            <h6 className="mb-1">Effective Date: 16 July 2025</h6>
            <h6 className="mb-1">
              Celebration Spaces (A Unit of AAJneeti Connect Ltd.)
            </h6>
            <h6 className="mb-0">
              Website:{" "}
              <a
                href="https://celebrationspaces.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                https://celebrationspaces.com
              </a>
            </h6>
          </div> */}

            {/* Intro */}
            <h4 className="text-gradient">Introduction: </h4>
            <p>
              <strong className="fs-5">Jenika Ventures</strong> (“we”, “our”,
              “us”) respects your privacy and is committed to protecting the
              personal information you share with us. This Privacy Policy
              explains how we collect, use, disclose, and safeguard your
              information when you visit our website, submit your details, or
              interact with us through any online or offline channels.
            </p>

            {/* Information Collection */}
            <h4 className="mt-4"> Information We Collect</h4>
            <p>
              As a real estate channel partner, we may collect the following
              types of information:
            </p>

            <h5 className="mt-3">Personal Information:</h5>
            <ul className="privacy">
              <li>Name</li>
              <li>Mobile number</li>
              <li>Email address</li>
              <li>City / Location</li>
              <li>Budget range and property preferences</li>
              <li>
                Investment goals (residential / commercial / international)
              </li>
            </ul>

            <h5 className="mt-3">Automatically Collected Information:</h5>
            <ul className="privacy">
              <li>IP address</li>
              <li>Browser type and device information</li>
              <li>Pages visited on our website</li>
              <li>Time spent on pages and interaction data</li>
            </ul>

            {/* Non-Personal Info */}
            <h5 className="mt-3">Third-Party Lead Sources:</h5>
            <p>We may receive your information through:</p>
            <ul className="privacy">
              <li>Social media platforms (Meta, Google, LinkedIn, etc.)</li>
              <li>Property portals</li>
              <li>Event registrations, expos, and investor summits</li>
              <li>Developer-authorized lead transfers</li>
            </ul>

            <h5>How We Use Your Information:</h5>
            <p>
              We use the collected information for purposes including but not
              limited to:
            </p>
            <ul className="privacy">
              <li>Connecting you with suitable real estate opportunities</li>
              <li>
                Providing property details, pricing, brochures, and site visit
                assistance
              </li>
              <li>Offering investment guidance and project comparisons</li>
              <li>
                Sharing updates on new launches, exclusive offers, and events
              </li>
              <li>
                Improving our services, marketing strategies, and customer
                experience
              </li>
              <li>Fulfilling legal and regulatory obligations</li>
            </ul>

            {/* Cookies */}
            <h4 className="mt-4">Data Security:</h4>
            <p>
              Jenika Ventures follows reasonable administrative, technical, and
              physical security measures to protect your personal data from
              unauthorized access, misuse, loss, or disclosure.
            </p>
            <p>
              While we strive to protect your data, no digital transmission or
              storage method can be guaranteed to be 100% secure.
            </p>
            <p>
              We do not sell or rent your personal information to third parties.
            </p>

            {/* Security */}
            <h4 className="mt-4">Sharing of Information:</h4>
            <p>Your information may be shared only with:</p>
            <ul className="privacy">
              <li>Authorized real estate developers for property inquiries</li>
              <li>
                Financial or legal partners (only when required for transaction
                support)
              </li>
              <li>
                Technology and marketing service providers assisting us in
                operations
              </li>
            </ul>
            <p>
              All such parties are obligated to maintain confidentiality and use
              data solely for agreed purposes.
            </p>

            {/* Rights */}
            <h4 className="mt-4">Cookies & Tracking Technologies:</h4>
            <p>We may use cookies and similar technologies to:</p>
            <ul className="privacy">
              <li>Understand website traffic and user behavior</li>
              <li>Improve website functionality and performance</li>
              <li>Deliver relevant advertisements and remarketing campaigns</li>
            </ul>
            <p>
              You can control cookie settings through your browser preferences.
            </p>

            {/* Rights */}
            <h4 className="mt-4">User Consent:</h4>
            <p>
              By providing your personal information to Jenika Ventures through
              our website, forms, phone calls, WhatsApp, emails, or events, you
              consent to the collection and use of your information as described
              in this Privacy Policy.
            </p>
            <p>
              You may opt out of marketing communications at any time by
              contacting us.
            </p>

            <h4 className="mt-4">Third-Party Links:</h4>
            <p>
              Our website may contain links to third-party websites (developers,
              partners, portals). We are not responsible for the privacy
              practices or content of such external websites.
            </p>

            <h4>Data Retention:</h4>
            <p>We retain personal information only as long as necessary to:</p>
            <ul className="privacy">
              <li>Fulfill the purposes outlined in this policy</li>
              <li>Comply with legal, regulatory, or business requirements</li>
            </ul>

            <h4>Your Rights Regarding Personal Data:</h4>
            <p>You have the right to:</p>
            <ul className="privacy">
              <li>Request access to your personal information</li>
              <li>Request correction or deletion of your data</li>
              <li>Withdraw consent for communication</li>
            </ul>
            <p>
              To exercise these rights, please contact us using the details
              below.
            </p>

            <h2>Updates to This Policy</h2>
            <p>
              Jenika Ventures may update this Privacy Policy from time to time.
              Any changes will be posted on this page with an updated effective
              date.
            </p>

            {/* Contact */}

            <h4 className="mt-4">Contact Information</h4>
            <p>
              If you have any questions or concerns regarding this Privacy
              Policy, please contact:
            </p>

            <div className="border-start border-4 border-danger ps-4 privacyContact">
              <p className="color-mehroon">
                <strong>Jenika Ventures</strong>
              </p>
              <p>
                Email:{" "}
                <a href="mailto:privacy@jenikaventures.com">
                  privacy@jenikaventures.com
                </a>
              </p>
              <p>
                Phone: <a href="tel:9999570772">9999570772</a>
              </p>
              <p>
                Website:{" "}
                <a
                  href="https://jenikaventures.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  jenikaventures.com
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
