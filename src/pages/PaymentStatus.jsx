import React, { useCallback, useEffect, useRef, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
  FaSpinner,
  FaRedoAlt,
  FaDownload,
  FaArrowLeft,
} from "react-icons/fa";
import { toast } from "react-toastify";
import SEO from "../components/seo/SEO";
import { getClientRegistration } from "../api/clientRegistrationApi";

const POLL_INTERVAL_MS = 2000;
const POLL_TIMEOUT_MS = 30000;
const MAX_ATTEMPTS = Math.ceil(POLL_TIMEOUT_MS / POLL_INTERVAL_MS);

const TERMINAL_STATUSES = ["success", "failed", "cancelled", "refunded"];

const formatINR = (amount) => {
  if (amount === null || amount === undefined || amount === "") return "—";
  try {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(Number(amount));
  } catch {
    return `₹${amount}`;
  }
};

const PaymentStatus = () => {
  const [searchParams] = useSearchParams();
  const registrationId =
    searchParams.get("registration_id") || searchParams.get("id");
  const orderIdFromUrl = searchParams.get("order_id");

  const [registration, setRegistration] = useState(null);
  const [phase, setPhase] = useState("loading"); // loading | polling | success | failed | timeout | error | missing
  const [errorMsg, setErrorMsg] = useState("");
  const attemptsRef = useRef(0);
  const timerRef = useRef(null);

  const clearTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  const fetchStatus = useCallback(
    async (isManualRefresh = false) => {
      if (!registrationId) return;
      try {
        const res = await getClientRegistration(registrationId);
        const data = res.data;
        setRegistration(data);

        const status = data?.payment_status;
        if (status === "success") {
          setPhase("success");
          clearTimer();
          return;
        }
        if (status === "failed" || status === "cancelled") {
          setPhase("failed");
          clearTimer();
          return;
        }
        if (status === "refunded") {
          setPhase("failed");
          clearTimer();
          return;
        }

        // pending / initiated / anything else → keep polling
        if (isManualRefresh) {
          attemptsRef.current = 0;
        }

        if (attemptsRef.current >= MAX_ATTEMPTS) {
          setPhase("timeout");
          clearTimer();
          return;
        }
        setPhase("polling");
        attemptsRef.current += 1;
        timerRef.current = setTimeout(
          () => fetchStatus(false),
          POLL_INTERVAL_MS
        );
      } catch (err) {
        console.error("Payment status fetch error:", err);
        clearTimer();
        if (err.response?.status === 404) {
          setErrorMsg("Registration not found. Please check the link.");
        } else if (err.request) {
          setErrorMsg("Server not responding. Please try again.");
        } else {
          setErrorMsg("Could not fetch payment status.");
        }
        setPhase("error");
      }
    },
    [registrationId]
  );

  useEffect(() => {
    if (!registrationId) {
      setPhase("missing");
      return;
    }
    attemptsRef.current = 0;
    fetchStatus(false);
    return () => clearTimer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registrationId]);

  const handleManualRefresh = () => {
    if (!registrationId) return;
    clearTimer();
    attemptsRef.current = 0;
    setPhase("loading");
    fetchStatus(true);
  };

  const handleDownloadReceipt = () => {
    // Placeholder until backend exposes a receipt endpoint
    toast.info("Receipt download will be available shortly.");
  };

  return (
    <div className="ps-page">
      <SEO
        title="Payment Status | Jenika Ventures Private Limited"
        description="Confirming your registration payment with Jenika Ventures Private Limited."
      />

      <style>{`
        .ps-page { font-family: "Montserrat", sans-serif; background: #f4f5f7; min-height: 100vh; }
        .ps-wrap { padding: 80px 0 100px; }
        .ps-card {
          max-width: 640px; margin: 0 auto;
          background: #fff; border-radius: 18px;
          padding: 36px 32px;
          border: 1px solid #ececf0;
          box-shadow: 0 30px 70px -35px rgba(0,0,0,0.25);
        }
        .ps-icon {
          width: 84px; height: 84px; margin: 0 auto 18px;
          border-radius: 50%; display: flex; align-items: center; justify-content: center;
          font-size: 40px;
        }
        .ps-icon--success { background: #e6f9ee; color: #1ea24a; }
        .ps-icon--failed  { background: #fdecee; color: #d63b44; }
        .ps-icon--warn    { background: #fff4e0; color: #c98b1a; }
        .ps-icon--info    { background: #eaf2ff; color: #2563eb; }
        .ps-spin { animation: ps-spin 1s linear infinite; }
        @keyframes ps-spin { from { transform: rotate(0); } to { transform: rotate(360deg); } }

        .ps-title { font-size: 26px; font-weight: 700; text-align: center; margin: 0 0 6px; color: #1f1f1f; }
        .ps-sub   { font-size: 14.5px; text-align: center; color: #5d5d5d; margin: 0 0 22px; }

        .ps-receipt {
          margin-top: 20px; border: 1px solid #ececf0; border-radius: 12px; overflow: hidden;
        }
        .ps-receipt__row {
          display: flex; gap: 16px; padding: 12px 16px;
          border-bottom: 1px solid #f1f1f4; font-size: 14px;
        }
        .ps-receipt__row:last-child { border-bottom: none; }
        .ps-receipt__row dt { flex: 0 0 200px; color: #8a8a8a; font-weight: 500; }
        .ps-receipt__row dd { flex: 1; color: #1f1f1f; font-weight: 600; margin: 0; word-break: break-word; }

        .ps-actions {
          margin-top: 26px; display: flex; gap: 12px; flex-wrap: wrap; justify-content: center;
        }
        .ps-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          padding: 13px 26px; border-radius: 100px; border: none; cursor: pointer;
          font-size: 14.5px; font-weight: 700; transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .ps-btn--primary {
          background: linear-gradient(90deg, #be973e 3.99%, #f5ebac 55.49%, #b49249 100%);
          color: #2b1a00;
          box-shadow: 0 12px 26px -10px rgba(180,146,73,0.85);
        }
        .ps-btn--primary:hover:not(:disabled) { transform: translateY(-2px); }
        .ps-btn--ghost {
          background: #fff; color: #3a3a3a; border: 1.5px solid #e4e4ea;
        }
        .ps-btn--ghost:hover { border-color: #b49249; }
        .ps-btn--danger {
          background: linear-gradient(327deg, #c80a17 18%, #000) 60%; color: #fff;
        }

        .ps-progress {
          margin-top: 18px; height: 4px; background: #f1f1f4; border-radius: 100px; overflow: hidden;
        }
        .ps-progress__bar {
          height: 100%; background: linear-gradient(90deg, #be973e, #f5ebac, #b49249);
          animation: ps-bar 1.5s ease-in-out infinite;
        }
        @keyframes ps-bar {
          0%   { width: 10%; margin-left: 0; }
          50%  { width: 60%; margin-left: 20%; }
          100% { width: 10%; margin-left: 90%; }
        }

        .ps-meta {
          margin-top: 10px; font-size: 12px; color: #9a9a9a; text-align: center;
        }
      `}</style>

      <section className="ps-wrap">
        <div className="container">
          <div className="ps-card">
            {phase === "missing" && (
              <>
                <div className="ps-icon ps-icon--warn">
                  <FaExclamationTriangle />
                </div>
                <h1 className="ps-title">Missing Reference</h1>
                <p className="ps-sub">
                  We couldn't find a registration reference in this link.
                  Please return to the registration form and try again.
                </p>
                <div className="ps-actions">
                  <Link to="/client-registration" className="ps-btn ps-btn--primary">
                    <FaArrowLeft /> Back to Registration
                  </Link>
                </div>
              </>
            )}

            {(phase === "loading" || phase === "polling") && (
              <>
                <div className="ps-icon ps-icon--info">
                  <FaSpinner className="ps-spin" />
                </div>
                <h1 className="ps-title">
                  {phase === "loading"
                    ? "Checking your payment…"
                    : "Confirming with Yes Bank…"}
                </h1>
                <p className="ps-sub">
                  Please don't close this tab. This usually takes a few
                  seconds.
                </p>
                <div className="ps-progress">
                  <div className="ps-progress__bar" />
                </div>
                {registrationId && (
                  <p className="ps-meta">Reference: #{registrationId}</p>
                )}
              </>
            )}

            {phase === "success" && registration && (
              <>
                <div className="ps-icon ps-icon--success">
                  <FaCheckCircle />
                </div>
                <h1 className="ps-title">Payment Successful 🎉</h1>
                <p className="ps-sub">
                  Your registration with Jenika Ventures is confirmed. Our team
                  will reach out to you shortly.
                </p>

                <dl className="ps-receipt">
                  <div className="ps-receipt__row">
                    <dt>Client ID</dt>
                    <dd>{registration.client_id || `JV-${registration.id}`}</dd>
                  </div>
                  <div className="ps-receipt__row">
                    <dt>Amount Paid</dt>
                    <dd>{formatINR(registration.registration_fee_amount)}</dd>
                  </div>
                  <div className="ps-receipt__row">
                    <dt>Transaction ID</dt>
                    <dd>{registration.gateway_transaction_id || "—"}</dd>
                  </div>
                  {orderIdFromUrl && (
                    <div className="ps-receipt__row">
                      <dt>Order ID</dt>
                      <dd>{orderIdFromUrl}</dd>
                    </div>
                  )}
                  {registration.payment_completed_at && (
                    <div className="ps-receipt__row">
                      <dt>Completed At</dt>
                      <dd>
                        {new Date(
                          registration.payment_completed_at
                        ).toLocaleString("en-IN")}
                      </dd>
                    </div>
                  )}
                  <div className="ps-receipt__row">
                    <dt>Status</dt>
                    <dd>
                      {registration.payment_status_display ||
                        registration.payment_status}
                    </dd>
                  </div>
                </dl>

                <div className="ps-actions">
                  <button
                    type="button"
                    className="ps-btn ps-btn--primary"
                    onClick={handleDownloadReceipt}
                  >
                    <FaDownload /> Download Receipt
                  </button>
                  <Link to="/" className="ps-btn ps-btn--ghost">
                    Back to Home
                  </Link>
                </div>
              </>
            )}

            {phase === "failed" && registration && (
              <>
                <div className="ps-icon ps-icon--failed">
                  <FaTimesCircle />
                </div>
                <h1 className="ps-title">
                  {registration.payment_status === "cancelled"
                    ? "Payment Cancelled"
                    : registration.payment_status === "refunded"
                    ? "Payment Refunded"
                    : "Payment Failed"}
                </h1>
                <p className="ps-sub">
                  {registration.payment_status === "cancelled"
                    ? "You cancelled the payment on Yes Bank checkout. You can retry whenever you're ready."
                    : registration.payment_status === "refunded"
                    ? "This registration's payment was refunded. Contact us for assistance."
                    : "Yes Bank could not complete this transaction. No amount has been deducted; if it was, it will be refunded automatically."}
                </p>

                <dl className="ps-receipt">
                  <div className="ps-receipt__row">
                    <dt>Reference</dt>
                    <dd>{registration.client_id || `#${registration.id}`}</dd>
                  </div>
                  <div className="ps-receipt__row">
                    <dt>Amount</dt>
                    <dd>{formatINR(registration.registration_fee_amount)}</dd>
                  </div>
                  <div className="ps-receipt__row">
                    <dt>Status</dt>
                    <dd>
                      {registration.payment_status_display ||
                        registration.payment_status}
                    </dd>
                  </div>
                </dl>

                <div className="ps-actions">
                  <Link
                    to="/client-registration"
                    className="ps-btn ps-btn--primary"
                  >
                    <FaRedoAlt /> Retry Payment
                  </Link>
                  <Link to="/contact" className="ps-btn ps-btn--ghost">
                    Contact Support
                  </Link>
                </div>
              </>
            )}

            {phase === "timeout" && (
              <>
                <div className="ps-icon ps-icon--warn">
                  <FaExclamationTriangle />
                </div>
                <h1 className="ps-title">Still Processing…</h1>
                <p className="ps-sub">
                  We haven't received a final confirmation from Yes Bank yet.
                  Don't worry — if the amount was debited, it will reflect
                  shortly. You can refresh below to check again.
                </p>
                {registration && (
                  <dl className="ps-receipt">
                    <div className="ps-receipt__row">
                      <dt>Reference</dt>
                      <dd>
                        {registration.client_id || `#${registration.id}`}
                      </dd>
                    </div>
                    <div className="ps-receipt__row">
                      <dt>Current Status</dt>
                      <dd>
                        {registration.payment_status_display ||
                          registration.payment_status}
                      </dd>
                    </div>
                  </dl>
                )}
                <div className="ps-actions">
                  <button
                    type="button"
                    className="ps-btn ps-btn--primary"
                    onClick={handleManualRefresh}
                  >
                    <FaRedoAlt /> Check Again
                  </button>
                  <Link to="/contact" className="ps-btn ps-btn--ghost">
                    Contact Support
                  </Link>
                </div>
              </>
            )}

            {phase === "error" && (
              <>
                <div className="ps-icon ps-icon--failed">
                  <FaTimesCircle />
                </div>
                <h1 className="ps-title">Something Went Wrong</h1>
                <p className="ps-sub">{errorMsg || "Please try again."}</p>
                <div className="ps-actions">
                  <button
                    type="button"
                    className="ps-btn ps-btn--primary"
                    onClick={handleManualRefresh}
                  >
                    <FaRedoAlt /> Try Again
                  </button>
                  <Link to="/" className="ps-btn ps-btn--ghost">
                    Back to Home
                  </Link>
                </div>
              </>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentStatus;
