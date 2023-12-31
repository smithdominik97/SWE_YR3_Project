"use client";
import { useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api";
import AssetItem from "@/app/asset/components/assetItem";
import styles from "./page.module.css";



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
              <button className={styles.menuBtn}><a className={styles.linkMenu} href="../menu">Menu</a></button>
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
          <AssetForm onSubmit={() => setReload(!reload)}/>
        </div>
       
      </main>
    </>
  );
}