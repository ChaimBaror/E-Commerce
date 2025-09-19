import React from 'react';
import { CartProvider } from '../contexts/CartContext';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "E-Commerce App",
  description: "A simple e-commerce application built with Next.js and Material-UI",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <main>
          <NextIntlClientProvider messages={messages}>
            <CartProvider>{children}</CartProvider>
          </NextIntlClientProvider>
        </main>
      </body>
    </html>
  );
}

