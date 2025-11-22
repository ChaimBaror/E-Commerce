import React from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import ThemeProvider from '../components/ThemeProvider';
import { AuthProvider } from '../contexts/AuthContext';
import type { Metadata } from "next";
import '../styles/globals.css';

export const metadata: Metadata = {
  title: "Online Store",
  description: "Online Store for buying products with secure payment and free shipping in Israel",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  console.log("Locale in layout:", locale);
  

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <main>
          <NextIntlClientProvider messages={messages}>
            <AuthProvider>
              <ThemeProvider>
                {children}
              </ThemeProvider>
            </AuthProvider>
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}

