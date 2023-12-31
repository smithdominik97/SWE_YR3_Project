"use client";
import styles from "./menu.module.css";
import { HandleLogin } from "@/controller/login";
import { Login } from "@/types/types";
import { useRouter } from "next/navigation";
import Image from 'next/image';

export default function Menu() {
  return (
    <>
    <div className={styles.container}>
    <Image src="/images/bg.jpg" alt="Background Image" layout="fill" objectFit="cover" />
      <div className={styles.menuHeader}>
        <h1>Menu</h1>
      </div>
      <div className={styles.menu}>
      <a href="/employee">
        <button className={styles.menuBtn}>
          Employees
        </button>
        </a>
        <a href="/asset">
        <button className={styles.menuBtn}>
          Assets
        </button>
        </a>
      </div>
      </div>
    </>
  );
}
