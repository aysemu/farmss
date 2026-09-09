"use client";
import { useRouter } from "next/navigation";
import styles from "./Page.module.css";

export default function Home() {
  const router = useRouter();

  function logIn() {
    router.push("/components/login"); 
  }

  function signUp() {
    router.push("/components/signup"); 
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>🌱 Farm Game</h1>
        <p className={styles.subtitle}>Tarlanı ek, biç, çiçekler yetiştir!</p>
        <div className={styles.buttonGroup}>
          <button className={styles.primaryBtn} onClick={logIn}>Giriş Yap</button>
          <button className={styles.secondaryBtn} onClick={signUp}>Kayıt Ol</button>
        </div>
      </div>
    </div>
  );
}

