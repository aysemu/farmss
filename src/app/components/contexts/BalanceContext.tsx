"use client";
import React, { createContext, useState, ReactNode } from "react";

export const BalanceContext = createContext({
  balance: 100,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  spendCoins: (amount: number) => false as boolean,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  earnCoins: (amount: number) => {},
});

export function BalanceProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(100);

  function spendCoins(amount: number): boolean {
    if (balance >= amount) {
      setBalance(balance - amount);
      return true;
    }
    return false;
  }

  function earnCoins(amount: number): void {
    setBalance(balance + amount);
  }

  return (
    <BalanceContext.Provider value={{ balance, spendCoins, earnCoins }}>
      {children}
    </BalanceContext.Provider>
  );
}

