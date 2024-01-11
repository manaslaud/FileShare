'use client'
import styles from './page.module.css'
import { Contract, ethers, Signer } from "ethers";
import { useState,useEffect } from 'react';
import {address, defaultAddress} from "./types"
import Upload from '../artifacts/contracts/Upload.sol/Upload.json'

export default function Home() {

  const [account,setAccount]=useState<address | null >(defaultAddress)
  const [provider,setProvider]=useState<Signer>()
  const [contract,setContract]=useState<Contract>()
  const [modal,setModalOpen]=useState<boolean>(false)
  useEffect(()=>{
    const wallet=async ()=>{ 
      const provider = new ethers.BrowserProvider(window.ethereum);
      if(!provider){
        alert('Metamask not installed, install and setup from chrome extensions')    
    }
    await provider.send("eth_requestAccounts",[]);
    const signer= await provider.getSigner()
    const addr:address = {
      public:await signer.getAddress()
    }
    setAccount(addr)
    const contractAddress:address = {
      public:'0x5FbDB2315678afecb367f032d93F642f64180aa3'
    }
    const contract= new ethers.Contract(contractAddress.public,
      Upload.abi,
      signer)
      setContract(contract)
      setProvider(signer)
  }
  
    provider && wallet();
  },[])

  return (
    <main className={styles.main}>
     
    </main>
  )
}
