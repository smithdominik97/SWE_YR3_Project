import styles from '../page.module.css';
import { useState, useEffect } from 'react';
import { DeleteAsset, GetAsset, GetSoftware } from '@/api/api';
import { FormAsset, FormSoftware } from '@/types/types';
import { useRouter} from "next/navigation"


  interface AssetItemProps {
    reload: () => void;
  }

  export default function AssetItem({ reload }: AssetItemProps) {

    const router = useRouter();
    const [assets, setAssets] = useState<FormAsset[]>([]);
    const [software, setSoftware] = useState<FormSoftware[]>([]);

    useEffect(() => {
      const fetchAssets = async () => {
        const assets = await GetAsset();
        setAssets(assets);
      };

      const fetchSoftware = async () => {
        const software = await GetSoftware();
        setSoftware(software);
      };

      
      
      fetchSoftware();
      fetchAssets();
    }, [reload]);


    const deleteAsset = async (assetId: number) => {
      const result = await DeleteAsset(assetId);
      console.log(result);
      reload();
    };


    const editAsset = async (assetId: number) => {
      console.log("assetid: " + assetId);
      router.push(`/update?param1=${assetId}`);
    };
    // const assets = await GetAsset();

    return (
        <>
    <div className={styles.container}>
    <div className={styles.assetsColumn}>
    <h1>Hardware</h1>
    {assets.map((asset, index) => (
        <div key={index} className={styles.assetitem}>
          <div className={styles.assetbuttons}>
            <button type="button" className={`${styles.btnitem} ${styles.deletebtn}`} onClick={() => deleteAsset(asset.id)}>
              <span className={styles.btnText}>Delete</span>
            </button>
            <button type="button" className={`${styles.btnitem} ${styles.editbtn}`} onClick={() => editAsset(asset.id)}>
              <span className={styles.btnText}>Edit</span>
            </button>
          </div>

          <div className={styles.assetsdisplay}>
            <h1><span>{asset.systemname}</span></h1>
            <ul>
              <li>Model: <span>{asset.model}</span></li>
              <li>Memory (GB): <span>{asset.memory}</span></li>
              <li>Type: <span>{asset.type}</span></li>
              <li>IP Address: <span>{asset.ip}</span></li>
              <li>Purchase Date: <span>{asset.purchase_date}</span></li>
              <li>Note: <span>{asset.note}</span></li>
              <li>Employee Name: <span>{asset.name}</span></li>
            </ul>
          </div>
          </div>
      ))}
      </div>

     
<div className={styles.assetsColumn}>
<h1>Software</h1>
{software.map((item, index) => (
        <div key={index} className={styles.assetitem}>
          <div className={styles.assetsdisplay}>
            <h1>OS: <span>{item.os_name}</span></h1>
            <ul>
              <li>Version: <span>{item.kernel}</span></li>
              <li>Installed on: <span>{item.systemname}</span></li>
            </ul>
          </div>
        </div>
      ))}
      </div>
       </div>
      </>
    );
}
