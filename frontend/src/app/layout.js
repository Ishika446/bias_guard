import "./globals.css";
import Providers from "./providers";

export const metadata = {
  title: "BiasGuard AI — Patent Bias Detector",
  description:
    "Detect geographic & demographic bias in global patent data. Powered by AI vector search and real-time analysis.",
  keywords: ["patent analysis", "bias detection", "AI", "innovation"],
  openGraph: {
    title: "BiasGuard AI",
    description: "Uncover hidden bias in patent innovation data.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>

      <body style={{ background: "#050811", color: "#e2e8f0" }}>
        {/* 🔐 AUTH PROVIDER — wrapped in client boundary via Providers */}
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}