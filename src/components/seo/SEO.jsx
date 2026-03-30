import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";

const SEO = ({
  title = "Jenika Ventures",
  description = "Best real estate projects in Delhi NCR",
  image = "/Jenikalogo.png",
  type = "website",
  noindex = false,
}) => {
  const location = useLocation();

  const baseUrl = "https://jenikaventures.com";

  // ✅ Remove query params automatically
  let cleanPath = location.pathname;

  // ✅ Remove trailing slash (except home)
  if (cleanPath !== "/" && cleanPath.endsWith("/")) {
    cleanPath = cleanPath.slice(0, -1);
  }
  const imageUrl = image.startsWith("http") ? image : baseUrl + image;
  const canonicalUrl = baseUrl + cleanPath;

  return (
    <Helmet>
      {/* ✅ Title */}
      <title>{title}</title>

      {/* ✅ Canonical */}
      <link rel="canonical" href={canonicalUrl} />

      {/* ✅ Meta Description */}
      <meta name="description" content={description} />
      {/* ✅ Robots */}
      <meta
        name="robots"
        content={noindex ? "noindex, nofollow" : "index, follow"}
      />

      {/* ✅ Open Graph (important for sharing) */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={type} />
      <meta property="og:image" content={imageUrl} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEO;
