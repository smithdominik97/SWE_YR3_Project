import { InsertAsset } from "@/api/api"
import React, { useState } from 'react';
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

    const [systemname, setSystemname] = useState('');
    const [model, setModel] = useState('');
    const [memory, setMemory] = useState('');
    const [os, setOs] = useState('');
    const [kernel, setKernel] = useState('');
    const [type, setType] = useState('');
    const [ip, setIp] = useState('');



    const getSysInfo = async (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const sysInfo = await returnSysinfo();
        console.log(sysInfo);

        setSystemname(sysInfo.hostname);
        setModel(sysInfo.cpu);
        setMemory(sysInfo.memory.toString());
        setOs(sysInfo.os);
        setKernel(sysInfo.kernelVersion);
        setType(sysInfo.systemType);
        setIp(sysInfo.ipAddress);
    }

    return (
        <form method="POST" onSubmit={assetsubmit} className={styles.form}>
            <label htmlFor="systemname">System Name: </label>
            <input type="text" name="systemname" value={systemname}/>
            <label htmlFor="model">CPU Model: </label>
            <input type="text" name="model" value={model}/>
            <label htmlFor="memory">Memory (GB): </label>
            <input type="number" name="memory" value={memory}/>
            <label htmlFor="os">Operating System: </label>
            <input type="text" name="os" value={os}/>
            <label htmlFor="kernel">Kernel Version: </label>
            <input type="text" name="kernel" value={kernel}/>
            <label htmlFor="type">System type: </label>
            <input type="text" name="type" value={type}/>
            <label htmlFor="ip">IP Address: </label>
            <input type="text" name="ip" value={ip}/>
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

