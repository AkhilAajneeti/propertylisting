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
  FaBuilding,
  FaPhoneAlt,
  FaEnvelope,
} from "react-icons/fa";
import { toast } from "react-toastify";
import { jsPDF } from "jspdf";
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

// Loads the brand logo downscaled + JPEG-compressed (color + grayscale) so the
// embedded receipt PDF stays small. White background blends on the white page.
const loadLogoForPdf = (url, maxDim = 640) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(
        1,
        maxDim / Math.max(img.naturalWidth, img.naturalHeight)
      );
      const w = Math.max(1, Math.round(img.naturalWidth * scale));
      const h = Math.max(1, Math.round(img.naturalHeight * scale));
      const render = (filter) => {
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
        if (filter) ctx.filter = filter;
        ctx.drawImage(img, 0, 0, w, h);
        return canvas.toDataURL("image/jpeg", 0.82);
      };
      resolve({ color: render(null), gray: render("grayscale(1)"), width: w, height: h });
    };
    img.onerror = reject;
    img.src = url;
  });

// Rasterizes an inline SVG (gold circle + red glyph) to a small transparent PNG
// for the PDF footer icons.
const svgToPng = (svg, size = 64) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = size;
      canvas.height = size;
      canvas.getContext("2d").drawImage(img, 0, 0, size, size);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = reject;
    img.src = "data:image/svg+xml;base64," + btoa(svg);
  });

const ICON_BG = "#f0d68a";
const ICON_FG = "#c80a17";
const iconSvg = (transform, path) =>
  `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="32" fill="${ICON_BG}"/><g transform="${transform}"><path fill="${ICON_FG}" d="${path}"/></g></svg>`;
const BUILDING_SVG = iconSvg(
  "translate(20,16) scale(0.0625)",
  "M48 0C21.5 0 0 21.5 0 48L0 464c0 26.5 21.5 48 48 48l96 0 0-80c0-26.5 21.5-48 48-48s48 21.5 48 48l0 80 96 0c26.5 0 48-21.5 48-48l0-416c0-26.5-21.5-48-48-48L48 0zM64 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zm112-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zM272 240c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM80 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16zm96 16c0-8.8 7.2-16 16-16l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32zM272 96l32 0c8.8 0 16 7.2 16 16l0 32c0 8.8-7.2 16-16 16l-32 0c-8.8 0-16-7.2-16-16l0-32c0-8.8 7.2-16 16-16z"
);
const PHONE_SVG = iconSvg(
  "translate(16,16) scale(0.0625)",
  "M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"
);
const MAIL_SVG = iconSvg(
  "translate(16,16) scale(0.0625)",
  "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48L48 64zM0 176L0 384c0 35.3 28.7 64 64 64l384 0c35.3 0 64-28.7 64-64l0-208L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"
);

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

  const handleDownloadReceipt = async () => {
    if (!registration) {
      toast.error("Receipt details are not ready yet.");
      return;
    }

    const clientId = registration.client_id || `JV-${registration.id}`;
    const completedAt = registration.payment_completed_at
      ? new Date(registration.payment_completed_at).toLocaleString("en-IN")
      : new Date().toLocaleString("en-IN");
    const status =
      registration.payment_status_display ||
      registration.payment_status ||
      "Success";

    const rawAmount = registration.registration_fee_amount;
    const amount =
      rawAmount === null || rawAmount === undefined || rawAmount === ""
        ? "-"
        : `Rs. ${new Intl.NumberFormat("en-IN").format(Number(rawAmount))}`;

    const rows = [
      ["Client ID", clientId],
      ["Amount Paid", amount],
      ["Transaction ID", registration.gateway_transaction_id || "-"],
      ...(orderIdFromUrl ? [["Order ID", orderIdFromUrl]] : []),
      ["Completed At", completedAt],
      ["Status", status],
    ];

    try {
      const doc = new jsPDF({ unit: "pt", format: "a4" });
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const marginX = 48;

      // Brand logo (top-right) + faint centered watermark — letterhead style
      let logo = null;
      try {
        logo = await loadLogoForPdf("/JV-Logo.png");
      } catch {
        logo = null;
      }
      if (logo) {
        const logoW = 132;
        const logoH = (logoW * logo.height) / logo.width;
        doc.addImage(
          logo.color,
          "JPEG",
          pageWidth - marginX - logoW,
          40,
          logoW,
          logoH
        );

        try {
          const wmW = pageWidth * 0.55;
          const wmH = (wmW * logo.height) / logo.width;
          doc.setGState(new doc.GState({ opacity: 0.06 }));
          doc.addImage(
            logo.gray,
            "JPEG",
            (pageWidth - wmW) / 2,
            (pageHeight - wmH) / 2 - 30,
            wmW,
            wmH
          );
          doc.setGState(new doc.GState({ opacity: 1 }));
        } catch {
          // watermark is optional — ignore if opacity isn't supported
        }
      }

      // Title + success badge
      doc.setTextColor(31, 31, 31);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.text("Payment Receipt", marginX, 150);

      doc.setFillColor(230, 249, 238);
      doc.roundedRect(marginX, 166, 152, 24, 12, 12, "F");
      doc.setTextColor(30, 162, 74);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("PAYMENT SUCCESSFUL", marginX + 16, 181.5);

      // Receipt rows
      let y = 244;
      rows.forEach(([label, value]) => {
        doc.setFont("helvetica", "normal");
        doc.setFontSize(11);
        doc.setTextColor(138, 138, 138);
        doc.text(String(label), marginX, y);

        doc.setFont("helvetica", "bold");
        doc.setFontSize(11.5);
        doc.setTextColor(31, 31, 31);
        doc.text(String(value), pageWidth - marginX, y, { align: "right" });

        doc.setDrawColor(238, 238, 240);
        doc.line(marginX, y + 13, pageWidth - marginX, y + 13);

        y += 36;
      });

      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(154, 154, 154);
      doc.text(
        `This is a system-generated receipt. Generated on ${new Date().toLocaleString(
          "en-IN"
        )}.`,
        marginX,
        y + 22
      );

      // Red contact footer band — matches the letterhead
      const footerH = 84;
      const footerY = pageHeight - footerH;
      doc.setFillColor(240, 214, 138);
      doc.rect(0, footerY - 3, pageWidth, 3, "F");
      doc.setFillColor(200, 10, 23);
      doc.rect(0, footerY, pageWidth, footerH, "F");

      doc.setDrawColor(240, 214, 138);
      doc.setLineWidth(0.7);
      doc.line(290, footerY + 18, 290, footerY + footerH - 18);
      doc.line(422, footerY + 18, 422, footerY + footerH - 18);

      // Gold circle icons (rasterized from inline SVG, vertically centered)
      let icons = {};
      try {
        const [bld, phn, mail] = await Promise.all([
          svgToPng(BUILDING_SVG),
          svgToPng(PHONE_SVG),
          svgToPng(MAIL_SVG),
        ]);
        icons = { bld, phn, mail };
      } catch {
        icons = {};
      }
      const iconSize = 24;
      const iconY = footerY + footerH / 2 - iconSize / 2;
      if (icons.bld)
        doc.addImage(icons.bld, "PNG", 34, iconY, iconSize, iconSize);
      if (icons.phn)
        doc.addImage(icons.phn, "PNG", 300, iconY, iconSize, iconSize);
      if (icons.mail)
        doc.addImage(icons.mail, "PNG", 430, iconY, iconSize, iconSize);

      // Column 1 — corporate office address
      doc.setTextColor(240, 214, 138);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8.5);
      doc.text("Corporate Office :-", 66, footerY + 30);
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(7.5);
      const addrLines = doc.splitTextToSize(
        "203-205, 2nd Floor, Tower-1, Assotech Business Cresterra, Sector 135, Noida, Uttar Pradesh 201304",
        208
      );
      doc.text(addrLines, 66, footerY + 42);

      // Column 2 — phone numbers
      doc.setFontSize(9);
      doc.text("+91-9999570772", 332, footerY + 39);
      doc.text("+91-9953000867", 332, footerY + 53);

      // Column 3 — email / website
      doc.setFontSize(8.5);
      doc.text("info@jenikaventures.com", 462, footerY + 39);
      doc.text("www.jenikaventures.com", 462, footerY + 53);

      doc.save(`Receipt-${clientId}.pdf`);
    } catch (err) {
      console.error("Receipt generation error:", err);
      toast.error("Could not generate the receipt. Please try again.");
    }
  };

  return (
    <div className="ps-page">
      <SEO
        title="Payment Status | Jenika Ventures Private Limited"
        description="Confirming your registration payment with Jenika Ventures Private Limited."
      />

      <style>{`
        .ps-page { font-family: "Montserrat", sans-serif; background: #f4f5f7; min-height: 100vh; }
        .ps-wrap { padding: 60px 0 90px; }

        /* Letterhead sheet */
        .ps-sheet {
          position: relative;
          max-width: 820px; margin: 0 auto;
          background: #fff; border-radius: 6px;
          border: 1px solid #e6e6ec;
          box-shadow: 0 30px 70px -35px rgba(0,0,0,0.3);
          overflow: hidden;
          display: flex; flex-direction: column;
          min-height: 880px;
        }
        .ps-sheet__head {
          display: flex; justify-content: flex-end;
          padding: 30px 44px 0; position: relative; z-index: 2;
        }
        .ps-sheet__head img { width: 200px; height: auto; }
        .ps-sheet__watermark {
          position: absolute; top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 62%; max-width: 520px;
          opacity: 0.06; filter: grayscale(1);
          pointer-events: none; user-select: none; z-index: 0;
        }
        .ps-sheet__body {
          position: relative; z-index: 1;
          flex: 1; padding: 24px 56px 48px;
          display: flex; flex-direction: column; justify-content: center;
        }

        /* Red contact footer */
        .ps-sheet__footer {
          position: relative; z-index: 2;
          background: #c80a17; border-top: 3px solid #f0d68a;
          display: grid; grid-template-columns: 1.5fr 1fr 1.3fr;
        }
        .ps-foot__col {
          display: flex; align-items: center; gap: 11px;
          padding: 16px 20px; color: #fff;
          font-size: 11.5px; line-height: 1.45; font-weight: 600;
        }
        .ps-foot__col + .ps-foot__col { border-left: 1px solid rgba(245,235,172,0.45); }
        .ps-foot__col strong { display: block; color: #f0d68a; font-weight: 700; font-size: 12px; margin-bottom: 3px; }
        .ps-foot__col span { display: block; }
        .ps-foot__col a { display: block; color: #fff; text-decoration: none; }
        .ps-foot__col .ps-foot__icon {
          width: 32px; height: 32px; flex-shrink: 0; border-radius: 50%;
          background: #f0d68a; color: #c80a17;
          display: flex; align-items: center; justify-content: center; font-size: 14px;
        }
        .ps-foot__col .ps-foot__icon svg { display: block; }
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

        @media (max-width: 768px) {
          .ps-wrap { padding: 30px 0 50px; }
          .ps-sheet { min-height: auto; border-radius: 6px; }
          .ps-sheet__head { justify-content: center; padding: 24px 20px 0; }
          .ps-sheet__head img { width: 160px; }
          .ps-sheet__body { padding: 20px 22px 36px; }
          .ps-sheet__watermark { width: 80%; }
          .ps-sheet__footer { grid-template-columns: 1fr; }
          .ps-foot__col + .ps-foot__col { border-left: none; border-top: 1px solid rgba(245,235,172,0.45); }
        }
      `}</style>

      <section className="ps-wrap">
        <div className="container">
          <div className="ps-sheet">
            <div className="ps-sheet__head">
              <img src="/JV-Logo.png" alt="Jenika Ventures" />
            </div>
            <img
              className="ps-sheet__watermark"
              src="/JV-Logo.png"
              alt=""
              aria-hidden="true"
            />

            <div className="ps-sheet__body">
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

            <div className="ps-sheet__footer">
              <div className="ps-foot__col">
                <span className="ps-foot__icon">
                  <FaBuilding />
                </span>
                <div>
                  <strong>Corporate Office :-</strong>
                  <span>
                    203-205, 2nd Floor, Tower-1, Assotech Business Cresterra,
                    Sector 135, Noida, Uttar Pradesh 201304
                  </span>
                </div>
              </div>
              <div className="ps-foot__col">
                <span className="ps-foot__icon">
                  <FaPhoneAlt />
                </span>
                <div>
                  <span>+91-9999570772</span>
                  <span>+91-9953000867</span>
                </div>
              </div>
              <div className="ps-foot__col">
                <span className="ps-foot__icon">
                  <FaEnvelope />
                </span>
                <div>
                  <a href="mailto:info@jenikaventures.com">
                    info@jenikaventures.com
                  </a>
                  <a
                    href="https://www.jenikaventures.com"
                    target="_blank"
                    rel="noreferrer"
                  >
                    www.jenikaventures.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PaymentStatus;
