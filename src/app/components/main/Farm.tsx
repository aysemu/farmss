'use client';
import { useState, useContext } from 'react';
import { useRouter } from 'next/navigation';
import { BalanceContext } from '../contexts/BalanceContext';
import { StoreProvider, useStore, StoreModal, FLOWER_CATALOG } from '../contexts/StoreContext';
import styles from './Farm.module.css';

function InnerFarm() {
  const router = useRouter();
  const [seeds, setSeeds] = useState<string[]>(Array(16).fill(''));
  const [showStore, setShowStore] = useState(false);
  const [selectingPlotIndex, setSelectingPlotIndex] = useState<number | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const { balance, earnCoins } = useContext(BalanceContext);
  const { inventory, consumeFlower } = useStore();

  function handleLogout() {
    router.push('/components/login');
  }

  function triggerToast(msg: string) {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  }

  function getFlowerImage(stage: string, flowerId: string) {
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

  function handlePlotClick(index: number) {
    const current = seeds[index];

    if (current === '') {
      // Empty plot - check inventory
      const totalOwned = Object.values(inventory).reduce((acc, curr) => acc + curr, 0);
      if (totalOwned <= 0) {
        setShowStore(true);
        return;
      }
      setSelectingPlotIndex(index);
    } else if (current.startsWith('K')) {
      // Harvest bloomed flower
      const [, flowerId] = current.split('-');
      const reward = flowerId === 'lale' ? 35 : 20;
      earnCoins(reward);
      triggerToast(`+${reward} Coin kazandınız! 🎉`);
      
      setSeeds((prev) => {
        const next = [...prev];
        next[index] = '';
        return next;
      });
    } else if (current.startsWith('Ç')) {
      // Clear dried flower
      triggerToast('Kurumuş çiçek temizlendi');
      setSeeds((prev) => {
        const next = [...prev];
        next[index] = '';
        return next;
      });
    }
  }

  function plantFlower(flowerId: string) {
    if (selectingPlotIndex === null) return;
    const index = selectingPlotIndex;

    const consumed = consumeFlower(flowerId);
    if (!consumed) {
      setSelectingPlotIndex(null);
      return;
    }

    setSelectingPlotIndex(null);

    // Set initial seed stage
    setSeeds((prev) => {
      const updated = [...prev];
      updated[index] = `T-${flowerId}`;
      return updated;
    });

    // Stage 2: Middle Plant (2.5 seconds)
    setTimeout(() => {
      setSeeds((latest) => {
        if (!latest[index]?.startsWith('T')) return latest;
        const updated = [...latest];
        updated[index] = `F-${flowerId}`;
        return updated;
      });
    }, 2500);

    // Stage 3: Bloomed Flower (5.5 seconds)
    setTimeout(() => {
      setSeeds((latest) => {
        if (!latest[index]?.startsWith('F')) return latest;
        const updated = [...latest];
        updated[index] = `K-${flowerId}`;
        return updated;
      });
    }, 5500);

    // Stage 4: Dried Flower (10 seconds)
    setTimeout(() => {
      setSeeds((latest) => {
        if (!latest[index]?.startsWith('K')) return latest;
        const updated = [...latest];
        updated[index] = `Ç-${flowerId}`;
        return updated;
      });
    }, 10000);
  }

  return (
    <div className={styles.farmContainer}>
      {/* Top Right Logout Button */}
      <button className={styles.logoutBtn} onClick={handleLogout}>
        Çıkış Yap
      </button>

      {/* Top HUD */}
      <div className={styles.hudHeader}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <div className={styles.coinBadge}>
            💰 Coin: {balance}
          </div>
          <div className={styles.inventorySummary}>
            {FLOWER_CATALOG.map((f) => (
              <div key={f.id} className={styles.inventoryBadge}>
                <span>{f.name}:</span>
                <strong>{inventory[f.id] || 0}</strong>
              </div>
            ))}
          </div>
        </div>
        <button className={styles.storeBtn} onClick={() => setShowStore(true)}>
          Mağaza
        </button>
      </div>

      {toastMessage && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '8px 16px',
          borderRadius: '8px',
          marginBottom: '12px',
          fontSize: '0.9rem',
          fontWeight: 'bold',
          border: '1px solid #c3e6cb'
        }}>
          {toastMessage}
        </div>
      )}

      {/* Store Modal */}
      {showStore && <StoreModal onClose={() => setShowStore(false)} />}

      {/* Flower Selection Modal */}
      {selectingPlotIndex !== null && (
        <div className={styles.modalOverlay} onClick={() => setSelectingPlotIndex(null)}>
          <div className={styles.plantModal} onClick={(e) => e.stopPropagation()}>
            <h3>Ekilecek Çiçeği Seçin</h3>
            <div className={styles.flowerList}>
              {FLOWER_CATALOG.map((flower) => {
                const count = inventory[flower.id] || 0;
                if (count <= 0) return null;
                return (
                  <button
                    key={flower.id}
                    className={styles.flowerSelectBtn}
                    onClick={() => plantFlower(flower.id)}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={flower.image} alt={flower.name} />
                      <strong>{flower.name}</strong>
                    </div>
                    <span>Eldeki: {count} adet</span>
                  </button>
                );
              })}
            </div>
            <button className={styles.cancelBtn} onClick={() => setSelectingPlotIndex(null)}>
              İptal
            </button>
          </div>
        </div>
      )}

      {/* Farm Grid */}
      <div className={styles.farmBoard}>
        {seeds.map((value, i) => {
          let imageSrc: string | null = null;
          if (value.includes('-')) {
            const [stage, id] = value.split('-');
            imageSrc = getFlowerImage(stage, id);
          }

          return (
            <div
              key={i}
              className={styles.box}
              onClick={() => handlePlotClick(i)}
              title={value ? `Parsel: ${value}` : 'Boş Parsel (Ekmek için tıklayın)'}
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

