'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import styles from './Store.module.css';
import { BalanceContext } from '../contexts/BalanceContext';

type Flower = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image: string;
};

type StoreContextType = {
  flowers: Flower[];
  increaseStock: (id: string) => void;
  decreaseStock: (id: string) => void;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

const initialFlowers: Flower[] = [
  {
    id: 'papatya',
    name: 'Papatya',
    price: 10,
    stock: 0,
    image: '/Daisy.png',
  },
  {
    id: 'lale',
    name: 'Lale',
    price: 20,
    stock: 0,
    image: '/Tulip.png',
  },
];

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [flowers, setFlowers] = useState<Flower[]>(initialFlowers);

  const increaseStock = (id: string) => {
    setFlowers((prev) =>
      prev.map((f) => (f.id === id ? { ...f, stock: f.stock + 1 } : f))
    );
  };

  const decreaseStock = (id: string) => {
    setFlowers((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, stock: Math.max(0, f.stock - 1) } : f
      )
    );
  };

  return (
    <StoreContext.Provider value={{ flowers, increaseStock, decreaseStock }}>
      {children}
    </StoreContext.Provider>
  );
};


export const useStore = () => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return context;
};

const Store = () => {
  const { flowers, increaseStock, decreaseStock } = useStore();
  const { spendCoins } = useContext(BalanceContext);
  const [flowersState, setFlowers] = useState<Flower[]>(initialFlowers);

  const handlePurchase = (id: string, price: number, stock: number) => {
    const totalCost = price * stock;

    if (stock === 0) return;

    const success = spendCoins(totalCost);
    if (!success) return;

    decreaseStockMultiple(id, stock);
  };

  const decreaseStockMultiple = (id: string, amount: number) => {
    setFlowers((prev) =>
      prev.map((f) =>
        f.id === id ? { ...f, stock: Math.max(0, f.stock - amount) } : f
      )
    );
  };

  return (
    <div className={styles.container}>
      {flowers.map(({ id, name, price, stock, image }) => (
        <div key={id} className={styles.card}>
          <img src={image} alt={name} className={styles.image} />
          <h3>{name}</h3>
          <p>Fiyat: {price}₺</p>
          <div className={styles.controls}>
            <button className={styles.button} onClick={() => decreaseStock(id)}>-</button>
            <span>Adet: {stock}</span>
            <button className={styles.button} onClick={() => increaseStock(id)}>+</button>
          </div>
          <button
            className={styles.purchaseButton}
            onClick={() => handlePurchase(id, price, stock)}
          >
            Satın Al
          </button>
        </div>
      ))}
    </div>
  );
};

export default Store;
