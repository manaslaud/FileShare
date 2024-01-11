'use client'
import styles from './page.module.css'
import { ethers } from "ethers";
import { useState,useEffect } from 'react';
import {address, defaultAddress} from "./types"

export default function Home() {

  const [account,setAccount]=useState<address>(defaultAddress)
  const [provider,setProvider]=useState()
  const [modal,setModalOpen]=useState<boolean>(false)

  useEffect(()=>{
    const wallet=()=>{ 
      const provider = new ethers.BrowserProvider(window.ethereum);
    }
  },[])

  return (
    <main className={styles.main}>
     
    </main>
  )
}
