"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./Login.module.css";


export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");



  function handleLogin() {
    const users = JSON.parse(localStorage.getItem("users") || "{}");

    if (users[username] && users[username] === password) {
      alert("Giriş başarılı!");
      router.push("/components/main"); 
      
    } else {
      alert("Kullanıcı adı veya şifre yanlış.");
    }
  }

  return (
    <div className={styles.login} style={{ padding: "20px" }}>
      <h1>Giriş Yap</h1>

      <label>
        Kullanıcı Adı:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <br />

      <label>
        Şifre:
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>
      <br />

      <button onClick={handleLogin}>Giriş Yap</button>
    </div>
  );
}

