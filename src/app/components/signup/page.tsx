"use client";
import { useState } from "react";
import styles from "./Signup.module.css";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSave() {
    setError("");
    if (!name || !password) {
      setError("Lütfen tüm alanları doldurun.");
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem("users") || "{}");
    
    if (existingUsers[name]) {
      setError("Bu kullanıcı adı zaten mevcut!");
      return;
    } 
    existingUsers[name] = password;
    localStorage.setItem("users", JSON.stringify(existingUsers));

    router.push("/components/login"); 
  }

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Kayıt Ol</h1>

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
            placeholder="Kullanıcı adınızı oluşturun"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <label className={styles.label}>Şifre</label>
          <input
            type="password"
            className={styles.input}
            placeholder="Şifrenizi oluşturun"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSave()}
          />
        </div>

        <button className={styles.submitBtn} onClick={handleSave}>
          Kayıt Ol
        </button>

        <p className={styles.footerText}>
          Zaten hesabınız var mı?
          <span className={styles.link} onClick={() => router.push("/components/login")}>
            Giriş Yap
          </span>
        </p>
      </div>
    </div>
  );
}

