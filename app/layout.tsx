import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { siteConfig } from "@/config/site";
import { ThemeProvider } from "@/contexts/theme-context";
import ErrorBoundary from "@/components/error-boundary";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import ClientRoot from "@/components/client-root";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.title,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [...siteConfig.keywords],
  authors: [
    {
      name: siteConfig.author.name,
      url: siteConfig.url,
    },
  ],
  creator: siteConfig.author.name,
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: siteConfig.url,
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: siteConfig.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [siteConfig.ogImage],
    creator: `@${siteConfig.author.name}`,
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  metadataBase: new URL(siteConfig.url),
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased min-h-screen bg-background text-foreground`}
      >
        <ErrorBoundary>
          <ThemeProvider>
            <SmoothCursor />
            <div className="relative min-h-screen flex flex-col">
              {/* 用于包裹 children 和导航栏的客户端组件 */}
              <ClientRoot>{children}</ClientRoot>
              {/* 页脚 */}
              <footer className="mt-auto">
                {/* 动态引入 FooterSection 以避免 SSR 问题 */}
                {typeof window !== 'undefined' && (
                  <div>Footer content will be loaded dynamically</div>
                )}
              </footer>
            </div>
          </ThemeProvider>
        </ErrorBoundary>
        <Analytics />
      </body>
    </html>
  );
}
