"use client";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import AssetItem from "@/app/asset";
import styles from "./page.module.css";
import AssetForm from "./form";


export default function Home() {

  const [reload, setReload] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      invoke("window", { cmd: "setTitle", title: "Home" });
    }
  }, []);

  const triggerReload = () => {
    setReload(!reload);
  };


 
  // const assets = GetAsset();
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

      <main className={styles.main}>
        <div className={styles.assets}>
          {/* <div className={styles.addbtnContainer}>
            <button className={styles.addbtn}>
              <span className={styles.btnText}>Add</span>
            </button>

          </div> */}
       
          <AssetItem reload={triggerReload} />
          
        </div>
        <AssetForm onSubmit={() => setReload(!reload)} />
      </main>
    </>
  );
}
