import { MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import { GoogleOAuthProvider } from "@react-oauth/google";


import styles from "./tailwind.css?url";
import TabMenu from "src/components/layout/tabMenu";
import Header from "src/components/layout/header";

export const meta: MetaFunction = () => {
  return [
    { title: "防災アプリ" },
    { name: "description", content: "防災アプリのデモです" },
  ];
};

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "/favicon.png",
      type: "image/png",
    },
    { rel: "stylesheet", href: styles }
  ];
}

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="m-0 p-0 bg-gray-200 font-normal">
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
          <main className="relative h-screen mx-auto shadow-lg rounded-lg overflow-hidden bg-white" style={{width: "55vh"}}>
            <Header />
            {children}
            <TabMenu />
          </main>
          <ScrollRestoration />
          <Scripts />
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
