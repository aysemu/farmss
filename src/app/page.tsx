"use client";
import { useRouter } from "next/navigation";
import styles from "./Page.module.css"

export default function Home() {
  const router = useRouter();

  function logIn() {
    router.push("/components/login"); 
  }

  function signUp() {
    router.push("/components/signup"); 
  }

  return (
    <div className={styles.hello}  style={{ display: "flex", gap: "10px" }}>
      <div className={styles.button}>
      <button onClick={logIn}>Log in</button>
      <button onClick={signUp}>Sign Up</button>
      </div>
    </div>
  );
}
