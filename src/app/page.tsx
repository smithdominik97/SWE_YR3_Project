"use client";
import { useEffect } from "react";
import { GetAsset } from "@/db/api";
import { invoke } from "@tauri-apps/api";
import AssetItem from "@/app/asset";
import styles from "./page.module.css";
import AssetForm from "./form";

export default function Home() {
  useEffect(() => {
    if (typeof window !== "undefined") {
      invoke("window", { cmd: "setTitle", title: "Home" });
    }
  }, []);

  const assets = GetAsset();
  // insertAsset();

  return (
    <>
      <header className={styles.header}>
        <nav className={styles.nav}>
          <ul className={styles.navbar}>
            <li>
              <p></p>
            </li>

            <li className={styles.navitem}>
              <p>
                User: <span>Dominik</span>
              </p>
            </li>
          </ul>
        </nav>
      </header>

      <main>
        <div className={styles.assets}>
          <div className={styles.addbtnContainer}>
            <button className={styles.addbtn}>
              <span className={styles.btnText}>Add</span>
            </button>

          </div>
       
          <AssetItem />
          <AssetForm />
        </div>
      </main>
    </>
  );
}
