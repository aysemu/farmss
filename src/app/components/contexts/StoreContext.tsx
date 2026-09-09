'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import styles from './Store.module.css';
import { BalanceContext } from '../contexts/BalanceContext';

export type FlowerItem = {
  id: string;
  name: string;
  price: number;
  image: string;
};

export const FLOWER_CATALOG: FlowerItem[] = [
  {
    id: 'papatya',
    name: 'Papatya',
    price: 10,
    image: '/Daisy.png',
  },
  {
    id: 'lale',
    name: 'Lale',
    price: 20,
    image: '/Tulip.png',
  },
];

type StoreContextType = {
  inventory: Record<string, number>;
  buyFlower: (id: string, count: number) => boolean;
  consumeFlower: (id: string) => boolean;
};

const StoreContext = createContext<StoreContextType | undefined>(undefined);

export const StoreProvider = ({ children }: { children: ReactNode }) => {
  const [inventory, setInventory] = useState<Record<string, number>>({
    papatya: 0,
    lale: 0,
  });

  const { spendCoins } = useContext(BalanceContext);

  const buyFlower = (id: string, count: number): boolean => {
    if (count <= 0) return false;
    const flower = FLOWER_CATALOG.find((f) => f.id === id);
    if (!flower) return false;

    const totalCost = flower.price * count;
    const success = spendCoins(totalCost);

    if (success) {
      setInventory((prev) => ({
        ...prev,
        [id]: (prev[id] || 0) + count,
      }));
      return true;
    } else {
      return false;
    }
  };

  const consumeFlower = (id: string): boolean => {
    if ((inventory[id] || 0) > 0) {
      setInventory((prev) => ({
        ...prev,
        [id]: prev[id] - 1,
      }));
      return true;
    }
    return false;
  };

  return (
    <StoreContext.Provider value={{ inventory, buyFlower, consumeFlower }}>
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

export const StoreModal = ({ onClose }: { onClose: () => void }) => {
  const { inventory, buyFlower } = useStore();
  const [quantities, setQuantities] = useState<Record<string, number>>({
    papatya: 1,
    lale: 1,
  });
  const [message, setMessage] = useState<{ text: string; type: 'success' | 'error' } | null>(null);

  const handleQtyChange = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const handleBuy = (id: string) => {
    const qty = quantities[id] || 1;
    const flower = FLOWER_CATALOG.find((f) => f.id === id);
    const success = buyFlower(id, qty);
    if (success) {
      setMessage({ text: `${qty} adet ${flower?.name || id} satın alındı!`, type: 'success' });
    } else {
      setMessage({ text: `Yetersiz bakiye!`, type: 'error' });
    }

    setTimeout(() => setMessage(null), 2500);
  };

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2>Çiçek Mağazası</h2>
          <button className={styles.closeBtn} onClick={onClose}>✕</button>
        </div>

        {message && (
          <div style={{
            padding: '8px 12px',
            borderRadius: '8px',
            marginBottom: '14px',
            textAlign: 'center',
            fontWeight: 'bold',
            fontSize: '0.9rem',
            backgroundColor: message.type === 'success' ? '#e6f4ea' : '#fce8e6',
            color: message.type === 'success' ? '#137333' : '#c5221f',
            border: `1px solid ${message.type === 'success' ? '#ceead6' : '#fad2cf'}`
          }}>
            {message.text}
          </div>
        )}

        <div className={styles.container}>
          {FLOWER_CATALOG.map((flower) => {
            const qty = quantities[flower.id] || 1;
            const owned = inventory[flower.id] || 0;

            return (
              <div key={flower.id} className={styles.card}>
                <img src={flower.image} alt={flower.name} className={styles.image} />
                <div className={styles.flowerName}>{flower.name}</div>
                <div className={styles.price}>{flower.price} Coin</div>
                <div className={styles.owned}>Eldeki: {owned} adet</div>

                <div className={styles.controls}>
                  <button className={styles.qtyBtn} onClick={() => handleQtyChange(flower.id, -1)}>-</button>
                  <span>{qty}</span>
                  <button className={styles.qtyBtn} onClick={() => handleQtyChange(flower.id, 1)}>+</button>
                </div>

                <button
                  className={styles.purchaseButton}
                  onClick={() => handleBuy(flower.id)}
                >
                  {flower.price * qty} Coin ile Satın Al
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoreModal;

