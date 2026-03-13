import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "O Mapa do Maroto — Portfólio",
  description: "Portfólio interativo inspirado no Mapa do Maroto de Harry Potter. Juro solenemente não fazer nada de bom.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
