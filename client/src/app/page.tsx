'use client'
import { Contract, ethers, Signer } from "ethers";
import { useState,useEffect } from 'react';
import {address, defaultAddress} from "./types"
import Upload from '../artifacts/contracts/Upload.sol/Upload.json'
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
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
      console.log(contract)
      setProvider(signer)
  }
  
    wallet();
  },[])

  return (
    <div className='App'>
      <h1 style={{color:'white'}}>
        Gdrive 3.0
      </h1>
      <div className='bg'></div>
      <div className='bg bg2'></div>
      <div className='bg bg3'></div>
      <p style={{color:'white'}}>
        Account not connected
      </p>
    <FileUpload></FileUpload>
    <Display></Display>
    </div>
  )
}
