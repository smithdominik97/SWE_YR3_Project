"use client";
import { InsertAsset, GetAssetById, GetEmployees,EditAsset} from "@/api/api"
import React, { useState, useEffect } from 'react';
import { Asset, Software, AssetUpdate } from "@/types/types"
import { Employee } from "@/types/types"
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import { enGB } from 'date-fns/locale';
import styles from "./form.module.css"
import { useRouter, useSearchParams } from 'next/navigation'





export default function UpdateAsset() {
    const router = useRouter();
    const searchParams = useSearchParams()

    const asset_id = searchParams.get('param1')
    console.log("assetid: " + asset_id);
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ')
    const [startDate, setStartDate] = useState(new Date()); 
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0);

    const [systemname, setSystemname] = useState('');
const [model, setModel] = useState('');
const [memory, setMemory] = useState(0);
const [type, setType] = useState('');
const [ip, setIp] = useState('');
const [note, setNote] = useState('');

useEffect(() => {
    const fetchAsset = async () => {
      const asset: Asset = await GetAssetById(asset_id);
      console.log(asset);
      setSystemname(asset.systemname);
      setModel(asset.model);
      setMemory(asset.memory);
      setType(asset.type);
      setIp(asset.ip);
      setNote(asset.note);
    };
  
    fetchAsset();
  }, [asset_id]);

  const assetsubmit = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]); 
      }


    const asset: AssetUpdate = {
        id: Number(asset_id),
        systemname: formData.get('systemname') as string,
        model: formData.get('model') as string,
        memory: formData.get('memory') as unknown as number,
        type: formData.get('type') as string,
        ip: formData.get('ip') as string,
        note: formData.get('note') as string,
        employees_id: selectedEmployeeId + 1,
    };

    console.log("asset: ", asset);
    const result = await EditAsset(asset);
    const affectedRow = result.rowsAffected;

    if (affectedRow === 1) {
        alert("Asset updated successfully");
        router.push('/asset');
    } else {
        alert("An error occurred. Please try again.");
    }

    console.log(result);

}


useEffect(() => {
    async function fetchEmployees() {
        const response = await GetEmployees();
        setEmployees(response);
    }

    fetchEmployees();
}, []);


    return (
        <form method="POST" onSubmit={assetsubmit} className={styles.form}>
            <label htmlFor="systemname">System Name: </label>
            <input type="text" name="systemname" value={systemname} onChange={e => setSystemname(e.target.value)} />
            <label htmlFor="model">CPU Model: </label>
            <input type="text" name="model" value={model} onChange={e => setModel(e.target.value)}/>
            <label htmlFor="memory">Memory (GB): </label>
            <input type="number" name="memory" value={memory} onChange={e => setMemory(Number(e.target.value))}/>
            <label htmlFor="type">System type: </label>
            <input type="text" name="type" value={type} onChange={e => setType(e.target.value)}/>
            <label htmlFor="ip">IP Address: </label>
            <input type="text" name="ip" value={ip} onChange={e => setIp(e.target.value)}/>
            <label htmlFor="note">Note: </label>
            <textarea name="note" id="note" value={note} cols={30} rows={10} onChange={e => setIp(e.target.value)}></textarea>
            <label htmlFor="employees_name">Employee Name: </label>
            <select name="employees_name" onChange={e => setSelectedEmployeeId(Number(e.target.value))}>
                {employees.map((employee) => (
        <option key={employee.id} value={employee.id}>
            {employee.name}
        </option>
    ))}
            </select>
            <button type="submit">Edit</button>
        </form>
    )
}