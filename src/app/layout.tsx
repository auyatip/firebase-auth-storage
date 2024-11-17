"use client";
import React, { useState } from "react";
import "./globals.css";
import { MenuList } from "@/components/menuList";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <html>
      <body suppressHydrationWarning={true}>
        <div className="min-h-screen flex flex-col bg-gray-50">
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4">
              <div className="h-16 flex items-center justify-between gap-4">
                {/* Logo */}
                <div className="text-2xl font-bold">
                  <span className="text-purple-600">Athip</span>
                  <span className="text-gray-800">Shop</span>
                </div>
                <div
                  onClick={() => setIsMenuOpen(true)}
                  className="hover:text-purple-500 text-xl"
                >
                  Menu
                </div>
              </div>
            </div>
          </header>

          {isMenuOpen === true ? (
            <div className="fixed inset-0 z-50 ">
              <div
                className="absolute inset-0 bg-black bg-opacity-50"
                onClick={() => setIsMenuOpen(false)}
              />
              <div className="absolute inset-y-0 left-0 w-64 bg-white shadow-lg">
                <div className="p-4">
                  <MenuList />
                </div>
              </div>
            </div>
          ) : (
            ""
          )}

          {/* Main Content */}
          <main className="flex-1 max-w-7xl mx-auto px-4 py-6 w-full">
            <div className="bg-white rounded-lg shadow p-6">{children}</div>
          </main>

          {/* Footer */}
          <footer className="bg-white border-t border-gray-200">
            <div className="w-full flex flex-col items-center ">
              <div className="w-full flex gap-8 m-5 justify-center items-center">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 mb-4">
                    เกี่ยวกับเรา
                  </h3>
                  <p className="text-gray-600">Athip Thumakul Shop</p>
                </div>
                <MenuList />
              </div>
              <div className="mt-8 pt-8 border-t border-gray-200 text-center text-gray-600 text-sm">
                {/* © 2024 Athip Thumakul Shop. All rights reserved. */}
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
