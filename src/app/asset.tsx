import styles from './page.module.css';
import { useState, useEffect } from 'react';
import { GetAsset } from '@/db/api';

type Asset = {
    uid: number;
    systemname: string;
    model: string;
    manufacturer: string;
    type: string;
    ip: string;
    purchasedate: string;
    note: string;
  };

export default function AssetItem() {
    const [assets, setAssets] = useState<Asset[]>([]);

    useEffect(() => {
      const fetchAssets = async () => {
        const assets = await GetAsset();
        setAssets(assets);
      };
  
      fetchAssets();
    }, []);

    // const assets = await GetAsset();

    return (
        <>
    {assets.map((asset, index) => (
        <div key={index} className={styles.assetitem}>
          <div className={styles.assetbuttons}>
            <button type="button" className={`${styles.btnitem} ${styles.deletebtn}`}>
              <span>Delete</span>
            </button>
            <button type="button" className={`${styles.btnitem} ${styles.editbtn}`}>
              <span>Edit</span>
            </button>
          </div>

          <div className={styles.assetinfo}>
            <h1>System Name <span>{asset.systemname}</span></h1>
            <ul>
              <li>Model: <span>{asset.model}</span></li>
              <li>Manufacturer: <span>{asset.manufacturer}</span></li>
              <li>Type: <span>{asset.type}</span></li>
            </ul>
          </div>
        </div>
      ))}
      </>
    );
}
