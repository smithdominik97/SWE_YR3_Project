
'use client'
import { useEffect } from 'react';
import getDatabase from "../db/connection";
import { insertAsset } from '@/db/api';
import { getAsset } from '@/db/api';
import { invoke } from '@tauri-apps/api';
import styles from './page.module.css';



export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      invoke('window', { cmd: 'setTitle', title: 'Home' });
    }
  }, []);

  getAsset();
  // insertAsset();
 

  return (
    <>
      <header className={styles.header}>
      <nav>
        <ul className={styles.navbar}>
          <li className={styles.navitem}>
            <p>System info</p>
          </li>

          <li className={styles.navitem}>
            <p>User: <span>Dominik</span></p>
          </li>
        </ul>
      </nav>
    </header>

    <main>
      <div className={styles.assetdisplay}>
        <button className={styles.addbtn}><span>Add</span></button>

        <div className={styles.assetitem}>
          <div className={styles.assetbuttons}>
            <button type="button" className={`${styles.btnitem} ${styles.deletebtn}`}>
              <span>Delete</span>
            </button>
            <button type="button" className={`${styles.btnitem} ${styles.editbtn}`}>
              <span>Edit</span>
            </button>
          </div>

          <div className={styles.assetinfo}>
            <h1>System Name <span></span></h1>
            <ul>
              <li>Model: <span></span></li>
              <li>Manufacturer: <span></span></li>
              <li>Type: <span></span></li>
            </ul>
          </div>
        </div>

      </div>
    </main>
    </>
  );
}




