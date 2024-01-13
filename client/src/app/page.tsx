'use client'
import "./globals.css";
import { Contract, ethers, Signer } from "ethers";
import { useState,useEffect } from 'react';
import {address, defaultAddress} from "./types"
import Upload from '../artifacts/contracts/Upload.sol/Upload.json'
import FileUpload from "./components/FileUpload";
import Modal from "./components/Modal";
import Display from "./components/Display";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { toast } from "react-toastify";
export default function Home() {
//todo: file format check while displaying it, add disallow functionality
  const [account,setAccount]=useState<address | null >(defaultAddress)
  const [provider,setProvider]=useState<Signer>()
  const [contract,setContract]=useState<Contract>()
  const [modal,setModalOpen]=useState<boolean>(false)
  useEffect(()=>{
    if(!window.ethereum){
      toast.error('Need ethereum supprt')
    }
    else{
      if(!window.ethereum.isMetaMask){
        toast.error('Need metamask supprt')

      }
    }
    const wallet=async ()=>{ 
      const provider = new ethers.BrowserProvider(window.ethereum);
      if(!provider){
        toast.error('Need metamask supprt')
      }
      if(provider && window.ethereum){
        await provider.send("eth_requestAccounts",[]).then((obj:any)=>{
          console.log(obj)
        }).catch((e:any)=>{
          console.log(e)
        });
        //////////
        window.ethereum.on("accountsChanged",()=>{
          window.location.reload();
        })
        window.ethereum.on("chainChanged",()=>{
          window.location.reload();
        })
        /////////
        const signer= await provider.getSigner()
        console.log(signer)
        const addr:address = {
          public:await signer.getAddress()
        }
        setAccount(addr)
        const contractAddress:address = {
          public:'0x3a94353582Bf34810fa769C9897BBCfFEc71aa23'
        }
        const contract= new ethers.Contract(contractAddress.public,
          Upload.abi,
          signer)
          setContract(contract)
          console.log(contract)
          setProvider(signer)
      }
    
  }
  
    wallet();
  },[])

  return (
    <>
    
    {!modal && (
      <button className="share" onClick={()=>{
        setModalOpen(true);
      }}>
        Share
      </button>
    )}
    {
      modal && (
        <Modal contract={contract} setModalOpen={setModalOpen}/>
      )
    }
    <div className='App'>
    <ToastContainer/>
      <h1 style={{color:'white'}}>
        Gdrive 3.0
      </h1>
      <div className='bg'></div>
      <div className='bg bg2'></div>
      <div className='bg bg3'></div>
      <p style={{color:'white'}}>
        {account?.public?account.public:'Not connected'}
      </p>
    <FileUpload account={account} contract={contract} ></FileUpload>
    <Display account={account} contract={contract}></Display>
    </div>
    </>
  )
  }
