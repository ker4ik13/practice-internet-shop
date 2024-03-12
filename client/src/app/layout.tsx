"use client";

import favicon from "@/data/admin/favicon.svg";
import { AuthProvider } from "@/shared/helpers/auth";
import { store } from "@/shared/store";
import "@fontsource/inter";
import { Provider } from "react-redux";
import ThemeRegistry from "./ThemeRegistry";
import "./styles";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <ThemeRegistry
          options={{
            key: "joy",
          }}
        >
          <html lang="ru">
            <head>
              <meta
                name="theme-color"
                media="(prefers-color-scheme: light)"
                content="eaf2fb"
              />
              <meta
                name="theme-color"
                media="(prefers-color-scheme: dark)"
                content="18191b"
              />
              <title>Интернет-магазин</title>
              <meta property="og:title" content="Интернет-магазин"></meta>
              <meta property="og:description" content="Интернет-магазин"></meta>
              <meta name="description" content="Интернет-магазин"></meta>
              <meta property="og:type" content="website"></meta>
              <link rel="shortcut icon" href={favicon.src} />
            </head>

            {children}
          </html>
        </ThemeRegistry>
      </AuthProvider>
    </Provider>
  );
}
