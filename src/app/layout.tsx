import "./globals.css";
import { BalanceProvider } from "./components/contexts/BalanceContext";
import { StoreProvider } from "./components/contexts/StoreContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>

    <body>
      <BalanceProvider>
        <StoreProvider>{children}</StoreProvider>
      </BalanceProvider>
    </body>
    </html>
  );
}
