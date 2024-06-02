import { MetaFunction } from "@remix-run/node";
import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import type { LinksFunction } from "@remix-run/node";
import styles from "./tailwind.css?url";

export const meta: MetaFunction = () => {
  return [
    { title: "防災アプリ" },
    { name: "description", content: "防災アプリのデモです" },
  ];
};

export const links: LinksFunction = () => {
  return [{ rel: "stylesheet", href: styles }];
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
        <main className="relative w-1/2 h-screen mx-auto shadow-lg rounded-lg overflow-hidden">
          {children}
          <ScrollRestoration />
          <Scripts />
        </main>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
