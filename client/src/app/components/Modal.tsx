'use client'
import { ModalProps } from "../types";
import { useEffect,useState } from "react";
import "./Modal.css"
import {toast} from "react-toastify"
 const Modal: React.FC<ModalProps>=({setModalOpen,contract})=> {
  const [sharedWithAccounts,setSharedWithAccounts]=useState<string[]>([]);
  useEffect(()=>{
    //runs once when component is rendered
    const accessList=async ()=>{
      const addressList= await contract?.shareAccess();
      console.log(addressList)
      setSharedWithAccounts(addressList);
    }
    if(contract)
    accessList()
  },[])
  const sharing =async()=>{
    const address=(document.querySelector(".address") as HTMLInputElement).value;
    if(address){
      let txn= toast.loading(`Transaction pending...`);
     try{
      const allowTransaction= await contract?.allow(address);
      toast.update(txn,{ render: " ✅ All is good", type: "success", isLoading: false,draggableDirection:'x', closeOnClick:true })
     }catch(e:any){
      toast.update(txn,{ render: " 🔴 Something went wrong", type: "error", isLoading: false,draggableDirection:'x',closeOnClick:true })
     }
      setModalOpen(false);
    }
    
  }
  const removeSharing=async()=>{
    const address=(document.querySelector(".address") as HTMLInputElement).value;
    if(address){
      let txn= toast.loading(`Transaction pending...`);
      try{
        const allowTransaction=await contract?.disallow(address);
        toast.update(txn,{ render: " ✅ All is good", type: "success", isLoading: false,draggableDirection:'x', closeOnClick:true });
      }catch(e:any){
        toast.update(txn,{ render: " 🔴 Something went wrong", type: "error", isLoading: false,draggableDirection:'x',closeOnClick:true })
      }
      setModalOpen(false);
    }
  }
    return (
      <>
       <div className="modalBackground">
        <div className="modalContainer">
          <div className="title">Share with</div>
          <div className="body">
            <input
              type="text"
              className="address"
              placeholder="Enter Address"
            ></input>
          </div>
          

            <ul style={{
                color:'black',
                listStyle:'none'
              }} >
              <li >Accounts with access</li>
            {sharedWithAccounts && (sharedWithAccounts.map((account:any,index:number)=>(
             account[1]?( <li key={index} style={{
              fontStyle:'italic'
            }} onClick={(e:any)=>{

            }}> 
              {account[0]}
            </li>):''
            )))}
            </ul>
         
          <div className="footer">
            <button
              onClick={() => {
                setModalOpen(false);
              }}
              id="cancelBtn"
            >
              Cancel
            </button>
            <button onClick={() => sharing()}>Share</button>
            <button onClick={() => removeSharing()}>Unshare</button>
          </div>
        </div>
      </div>
    </>
    )
  }

  export default Modal;