
'use client'
import { useEffect } from 'react';
import getDatabase from "../db/connection";
import { InsertAsset } from '@/db/api';
import { GetAsset } from '@/db/api';
import { invoke } from '@tauri-apps/api';
import  AssetItem  from '@/app/asset';
import styles from './page.module.css';



export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      invoke('window', { cmd: 'setTitle', title: 'Home' });
    }
  }, []);

  const assets =  GetAsset();
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

        <AssetItem /> 
      </div>
    </main>
    </>
  );
}




