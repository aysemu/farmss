"use client";
import React, { createContext, useState, ReactNode } from "react";
import styles from "./Balance.module.css";

export const BalanceContext = createContext({
  balance: 100,
  spendCoins: (amount: number) => false,
  earnCoins: (amount: number) => {},
});

export function BalanceProvider({ children }: { children: ReactNode }) {
  const [balance, setBalance] = useState(100);
  

  function spendCoins(amount: 10) {
    if (balance >= amount) {
      setBalance(balance - amount);
      return true;
    }
    return false;
  }

  function earnCoins(amount: 20) {
    setBalance(balance + amount);
  }

  return (
    <>
      <div className={styles.balanceBox}>Coin: {balance}</div>
      <BalanceContext.Provider value={{ balance, spendCoins, earnCoins }}>
        {children}
      </BalanceContext.Provider>
    </>
  );
}
