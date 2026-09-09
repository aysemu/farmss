"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleLogin() {
    setError("");
    if (!username || !password) {
      setError("Lütfen kullanıcı adı ve şifrenizi girin.");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if ((users[username] && users[username] === password) || (username === "admin" && password === "1234")) {
      router.push("/components/main"); 
    } else {
      setError("Kullanıcı adı veya şifre yanlış.");
    }
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Giriş Yap</h1>

        {error && (
          <div style={{ color: "#d9534f", backgroundColor: "#fdf2f2", padding: "10px", borderRadius: "8px", fontSize: "0.9rem", textAlign: "center", border: "1px solid #f5c6cb" }}>
            {error}
          </div>
        )}

        <div className={styles.inputGroup}>
          <label className={styles.label}>Kullanıcı Adı</label>
          <input
            type="text"
            className={styles.input}
            placeholder="Kullanıcı adınızı girin"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Şifre</label>
          <input
            type="password"
            className={styles.input}
            placeholder="Şifrenizi girin"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
          />
        </div>

        <button className={styles.submitBtn} onClick={handleLogin}>
          Giriş Yap
        </button>

        <p className={styles.footerText}>
          Hesabınız yok mu? 
          <span className={styles.link} onClick={() => router.push("/components/signup")}>
            Kayıt Ol
          </span>
        </p>
      </div>
    </div>
  );
}


