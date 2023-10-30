
'use client'
import { useEffect } from 'react';
import returnDatabase from "../db/database";
import { invoke } from '@tauri-apps/api';



export default function Home() {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      invoke('window', { cmd: 'setTitle', title: 'Home' });
    }
  }, []);

  
  returnDatabase();

  return (
    <>
      <h1>Hello</h1>
    </>
  );
}




