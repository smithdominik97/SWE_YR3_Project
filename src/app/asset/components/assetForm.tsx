import { InsertAsset, GetEmployees, InsertSoftware} from "@/api/api"
import React, { useState, useEffect } from 'react';
import { Asset, Software } from "@/types/types"
import { Employee } from "@/types/types"
import DatePicker from "react-datepicker"; 
import "react-datepicker/dist/react-datepicker.css"; 
import { enGB } from 'date-fns/locale';
import styles from "./form.module.css"
import  returnSysinfo  from "@/controller/sysinfo"

interface AssetFormProps {
    onSubmit: () => void;
  }

export default function AssetForm({ onSubmit }: AssetFormProps)  {

    const [startDate, setStartDate] = useState(new Date()); 
    const now = new Date().toISOString().slice(0, 19).replace('T', ' ')

    const assetsubmit = async (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const date = startDate.toISOString().slice(0, 10);
        console.log(date);
        const form = event.currentTarget;
        const formData = new FormData(form);

        console.log(selectedEmployeeId);
        const asset: Asset = {
            systemname: formData.get('systemname') as string,
            model: formData.get('model') as string,
            memory: formData.get('memory') as unknown as number,
            type: formData.get('type') as string,
            ip: formData.get('ip') as string,
            date_added: now,
            purchase_date: startDate.toISOString().slice(0, 10),
            note: formData.get('note') as string,
            employees_id: selectedEmployeeId + 1
        };

        const result = await InsertAsset(asset);
        const assetId = result.lastInsertId;
        console.log("Insert ID: " + typeof assetId);

        const software: Software = {
            os_name: formData.get('os') as string,
            kernel: formData.get('kernel') as string,
            date_added: now,
            asset_id: assetId
        };
        await InsertSoftware(software);
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



    const [employees, setEmployees] = useState<Employee[]>([]);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number>(0);

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
            <input type="text" name="systemname" value={systemname} onChange={e => setSystemname(e.target.value)}/>
            <label htmlFor="model">CPU Model: </label>
            <input type="text" name="model" value={model} onChange={e => setModel(e.target.value)}/>
            <label htmlFor="memory">Memory (GB): </label>
            <input type="number" name="memory" value={memory} onChange={e => setMemory(e.target.value)}/>
            <label htmlFor="os">Operating System: </label>
            <input type="text" name="os" value={os} onChange={e => setOs(e.target.value)}/>
            <label htmlFor="kernel">Kernel Version: </label>
            <input type="text" name="kernel" value={kernel} onChange={e => setKernel(e.target.value)}/>
            <label htmlFor="type">System type: </label>
            <input type="text" name="type" value={type} onChange={e => setType(e.target.value)}/>
            <label htmlFor="ip">IP Address: </label>
            <input type="text" name="ip" value={ip} onChange={e => setIp(e.target.value)}/>
            <label htmlFor="note">Note: </label>
            <textarea name="note" id="" cols={30} rows={10}></textarea>
            <label htmlFor="date">Purchase Date: </label>
            <DatePicker selected={startDate} onChange= 
              {(date: Date) => setStartDate(date)} locale={enGB} name="date"/> 
            <label htmlFor="employees_name">Employee Name: </label>
            <select name="employees_name" onChange={e => setSelectedEmployeeId(Number(e.target.value))}>
                {employees.map((employee) => (
        <option key={employee.id} value={employee.id}>
            {employee.name}
        </option>
    ))}
            </select>
            <button type="button" onClick={getSysInfo}>Get System Info</button>
            <button type="submit">Add</button>
        </form>
    )
}

