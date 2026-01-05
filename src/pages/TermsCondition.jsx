import React from "react";

const TermsCondition = () => {
  return (
    <div style={{ overflowX: "hidden" }}>
      {/* Hero Banner */}
      <div className="PrivacyBanner" role="img" aria-label="Career Banner">
        <div className="content ">
          <h1>Terms & Conditions</h1>
        </div>
      </div>
      <section className="pb-5 pt-3">
        <div className="container">
          <div className="bg-white p-2 p-sm-5 rounded shadow">
            <h2 className="pb-1 text-center text-gradient">
              Welcome to Jenika Ventures{" "}
            </h2>
            <p className="text-center text-gradient">
              (“Company”, “we”, “our”, “us”).
            </p>
            <hr />

            {/* Intro */}

            <p className="fw-semibold">
              By accessing or using this website, you acknowledge that you have
              read, understood, and agree to be bound by these Terms &
              Conditions along with our Privacy Policy. If you do not agree,
              please discontinue using the website.
            </p>

            {/* Information Collection */}
            <h4 className="mt-4">1. Website Purpose</h4>
            <p>
              This website is designed to provide general information about real
              estate projects, property investments, and related services. The
              information provided is for informational purposes only and does
              not constitute legal, financial, or investment advice.
            </p>

            <h5 className="mt-3">2. Acceptance of Privacy Policy</h5>
            <p>
              By using this website, submitting inquiry forms, or sharing
              personal details, you expressly consent to the collection, use,
              storage, and processing of your information as described in our
              Privacy Policy.
            </p>

            <h5 className="mt-3">3. Information Accuracy</h5>
            <p>
              While we make reasonable efforts to keep information accurate and
              updated, Jenika Ventures does not warrant the accuracy,
              completeness, or reliability of property details, pricing,
              availability, or project timelines. All information is subject to
              change without notice.
            </p>

            {/* Non-Personal Info */}
            <h5 className="mt-3">4. Property Information Disclaimer</h5>

            <ul className="privacy">
              <li>
                Images, layouts, floor plans, videos, brochures, and
                descriptions are indicative only.
              </li>
              <li>
                Actual specifications may vary due to developer changes,
                approvals, or regulatory requirements.
              </li>
              <li>Nothing on this website constitutes an offer, allotment, or
                commitment.
              </li>
            </ul>

            <h5>5. User Data & Privacy Alignment</h5>
            <ul className="privacy">
              <li>
                Any personal data shared through forms, calls, emails, or chat
                features is handled in accordance with our Privacy Policy.
              </li>
              <li>We do not sell or misuse personal data.</li>
              <li>
                Data may be shared with developers or service partners only to
                fulfill your inquiry or service request.
              </li>
            </ul>

            {/* Cookies */}
            <h4 className="mt-4">6. Cookies & Tracking</h4>
            <p>
              This website may use cookies and tracking technologies to improve
              user experience, analyze traffic, and support marketing efforts.
            </p>
            <p>
              By continuing to use the website, you consent to such use as
              detailed in the Privacy Policy.
            </p>

            {/* Security */}
            <h4 className="mt-4">7. Third-Party Links</h4>
            <p>
              The website may contain links to third-party websites, including
              developer or partner sites. We are not responsible for their
              content, privacy practices, or terms. Users are advised to review
              their respective policies.
            </p>

            {/* Rights */}
            <h4 className="mt-4">8. Intellectual Property Rights</h4>
            <p>
              All content on this website—including text, images, logos,
              graphics, videos, and design—is the intellectual property of
              Jenika Ventures.
            </p>

            <p>
              Unauthorized copying, reproduction, or distribution is strictly
              prohibited.
            </p>

            {/* --->Rights */}
            <h4 className="mt-4">9. Limitation of Liability</h4>
            <p>
              Jenika Ventures shall not be liable for any direct, indirect,
              incidental, or consequential damages arising from:
            </p>
            <ul className="privacy">
              <li>Use of this website</li>
              <li>Reliance on information provided</li>
              <li>Technical issues or data transmission delays</li>
            </ul>

            <h4 className="mt-4">10. Modification of Terms</h4>
            <p>
              We reserve the right to update or modify these Terms & Conditions
              and the Privacy Policy at any time.
            </p>
            <p>
              Continued use of the website implies acceptance of the revised
              terms.
            </p>

            <h4>11. Governing Law & Jurisdiction</h4>
            <p>
              These Terms & Conditions shall be governed by the laws of India,
              and any disputes shall be subject to the jurisdiction of competent
              courts.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default TermsCondition;
