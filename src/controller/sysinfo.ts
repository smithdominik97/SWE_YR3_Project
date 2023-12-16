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



export default async function getSysInfo() {
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
    const os = osFull.split(" ")[0];
    const kernelVersion = sysinfo['kernel_version'];
    
    console.log("Hostname: " + hostname);
    console.log("OS: Windows " + os);
    console.log("Kernel Version: " + kernelVersion);
    console.log("CPU: " + cpuName);
    console.log("Memory: " + memoryInGB + "GB");

}

