'use client';
import { useState, useContext } from 'react';
import { BalanceContext } from "../contexts/BalanceContext";
import { StoreProvider, useStore } from "../contexts/StoreContext";
import Store from '../contexts/StoreContext';

import styles from './Farm.module.css';

function InnerFarm() {
  const [seeds, setSeeds] = useState(Array(16).fill(''));
  const [showStore, setShowStore] = useState(false);
  const { spendCoins, earnCoins } = useContext(BalanceContext);
  const { flowers } = useStore();

  function getFlowerImage(stage: string, flowerId: string | null) {
    if (stage === 'T') return '/Seeding.png';
    if (stage === 'F') return '/MiddlePlant.png';
    if (stage === 'K') {
      if (flowerId === 'lale') return '/Tulip.png';
      if (flowerId === 'papatya') return '/Daisy.png';
    }
    if (stage === 'Ç') {
      if (flowerId === 'lale') return '/DriedTulip.png';
      if (flowerId === 'papatya') return '/DriedDaisy.png';
    }
    return null;
  }

  function toggleSeed(index: number) {
    setSeeds((prevSeeds) => {
      const newSeeds = [...prevSeeds];
      const current = newSeeds[index];

      if (current === '') {
        const selectedFlower = flowers.find(f => f.stock > 0);
        if (!selectedFlower) {
          alert('Hiç çiçek seçilmemiş!');
          return prevSeeds;
        }

        const spent = spendCoins(10);
        if (!spent) return prevSeeds;

        newSeeds[index] = `T-${selectedFlower.id}`;

        setTimeout(() => {
          setSeeds((latestSeeds) => {
            const updated = [...latestSeeds];
            if (updated[index]?.startsWith('T')) {
              const [, id] = updated[index].split('-');
              updated[index] = `F-${id}`;
            }
            return updated;
          });
        }, 2000);

        setTimeout(() => {
          setSeeds((latestSeeds) => {
            const updated = [...latestSeeds];
            if (updated[index]?.startsWith('F')) {
              const [, id] = updated[index].split('-');
              updated[index] = `K-${id}`;
            }
            return updated;
          });
        }, 4000);

        setTimeout(() => {
          setSeeds((latestSeeds) => {
            const updated = [...latestSeeds];
            if (updated[index]?.startsWith('K')) {
              const [, id] = updated[index].split('-');
              updated[index] = `Ç-${id}`;
            }
            return updated;
          });
        }, 6000);
      } else if (['F', 'K', 'Ç'].some(s => current.startsWith(s))) {
        if (current.startsWith('K')) {
          earnCoins(20);
        }
        newSeeds[index] = '';
      }

      return newSeeds;
    });
  }

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
        <button
          className={styles.store}
          onClick={() => setShowStore(!showStore)}
          style={{ padding: '10px 20px' }}
        >
          {showStore ? 'X' : 'Store'}
        </button>
      </div>

      {showStore && <Store />}

      <div className={styles.farm}>
        {seeds.map((value, i) => {
          let imageSrc = '';
          let flowerId = null;
          if (value.includes('-')) {
            const [stage, id] = value.split('-');
            imageSrc = getFlowerImage(stage, id) || '';
            flowerId = id;
          }

          return (
            <div
              key={i}
              className={styles.box}
              onClick={() => toggleSeed(i)}
              title={value || 'Boş'}
            >
              {imageSrc && (
                <img src={imageSrc} alt={value} className={styles.seedImage} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Farm() {
  return (
    <StoreProvider>
      <InnerFarm />
    </StoreProvider>
  );
}
