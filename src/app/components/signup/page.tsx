"use client";
import { useState } from "react";
import styles from "./Signup.module.css";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  function handleSave() {
    if (!name || !password) {
      alert("Lütfen tüm alanları doldurun.");
      return;
    }
    const existingUsers = JSON.parse(localStorage.getItem("users") || "{}");
    
    if (existingUsers[name]) {
      alert("Bu kullanıcı adı zaten mevcut!");
      return;
    } 
    existingUsers[name] = password;
    localStorage.setItem("users", JSON.stringify(existingUsers));

    alert("Kayıt başarılı!");
    router.push("/components/login"); 
  }

  return (
    <div className={styles.maincontainer}>
      <div className={styles.container}>
        <h1>Kayıt Ol</h1>
        <div className={styles.con}>
        <label>
          Username:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>

        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        <button onClick={handleSave}>Kayıt Ol</button>

        </div>
      </div>
    </div>
  );
}
