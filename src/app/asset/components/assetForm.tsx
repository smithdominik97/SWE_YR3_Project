import { InsertAsset } from "@/api/api"
import { Asset } from "@/app/asset/components/assetItem"
import styles from "./form.module.css"
import  returnSysinfo  from "@/controller/sysinfo"

interface AssetFormProps {
    onSubmit: () => void;
  }

export default function AssetForm({ onSubmit }: AssetFormProps)  {

    const assetsubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        const asset: Asset = {
            systemname: formData.get('systemname') as string,
            model: formData.get('model') as string,
            manufacturer: formData.get('manufacturer') as string,
            type: formData.get('type') as string,
            ip: formData.get('ip') as string,
            purchasedate: formData.get('purchasedate') as string,
            note: formData.get('note') as string,
            employees_id: formData.get('employees_id') as string
        };
        await InsertAsset(asset);
        onSubmit();
    }


    const getSysInfo = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(form);

        const sysInfo = await returnSysinfo();
        console.log(sysInfo);
    }

    return (
        <form method="POST" onSubmit={assetsubmit} className={styles.form}>
            <label htmlFor="systemname">System Name: </label>
            <input type="text" name="systemname"/>
            <label htmlFor="CPU Model">Model: </label>
            <input type="text" name="model"/>
            <label htmlFor="os">Operating System: </label>
            <input type="text" name="os"/>
            <label htmlFor="kernel">Kernel Version: </label>
            <input type="text" name="kernel"/>
            <label htmlFor="type">System type: </label>
            <input type="text" name="type"/>
            <label htmlFor="ip">IP Address: </label>
            <input type="text" name="ip"/>
            <label htmlFor="purchasedate">Purchase Date: </label>
            <input type="text" name="purchasedate"/>
            <label htmlFor="note">Note: </label>
            <textarea name="note" id="" cols={30} rows={10}></textarea>
            <label htmlFor="employees_id">Employee ID: </label>
            <input type="text" name="employees_id"/>
            <button type="button" onClick={getSysInfo}>Get System Info</button>
            <button type="submit">Add</button>
        </form>
    )
}

