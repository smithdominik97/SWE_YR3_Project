import {
    allSysInfo,
    memoryInfo,
    staticInfo,
    cpuInfo,
    AllSystemInfo,
    StaticInfo,
    MemoryInfo,
    CpuInfo,
    batteries,
    Batteries,
  } from "tauri-plugin-system-info-api";

  import { invoke } from '@tauri-apps/api/tauri';


  interface SysInfo {
    hostname: string,
    os: string,
    kernelVersion: string,
    cpu: string,
    memory: number,
    systemType: string,
    ipAddress: string
}


export default async function returnSysinfo() {
 

    const sysinfo = await allSysInfo();
    console.log(sysinfo);
    const system: SysInfo = await getSysInfo();
    console.log(system);
    return system;
}


export async function getSysInfo() {
    const sysinfo = await allSysInfo();

    // get Memory info
    const memory = sysinfo['total_memory'];
    const memoryInGB = Math.round(memory / 1024 / 1024 / 1024);

    //hostname info
    const hostname = sysinfo['hostname'];

    // cpu info
    const cpuinfo  = await cpuInfo();
    const cpuName = cpuinfo['cpus'][0]['brand'];


    //OS info
    const osFull = sysinfo['os_version'];
    const os = "Windows " + osFull.split(" ")[0];
    const kernelVersion = sysinfo['kernel_version'];
    

    // determine system type by battery info
    const batteryInfo = await batteries();
    let systemType = "";
    
    if (batteryInfo.length > 0) {
        systemType = "Laptop";
    } else {
        systemType = "Desktop";
    }

    const ipAddress = await invoke<IpAddr>('getip');
    console.log(ipAddress);


    const sysInfo = {
        hostname: hostname,
        os: os,
        kernelVersion: kernelVersion,
        cpu: cpuName,
        memory: memoryInGB,
        systemType: systemType,
        ipAddress: ipAddress
    }

    return sysInfo

}


