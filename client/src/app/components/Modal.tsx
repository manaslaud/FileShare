'use client'
import { ModalProps } from "../types";
import { useEffect,useState } from "react";
import "./Modal.css"
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
      await contract?.allow(address);
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
              placeholder="Enter Address to share with"
            ></input>
          </div>
          

            <ul style={{
                color:'black',
                listStyle:'none'
              }} >
              <li >Accounts with access</li>
            {sharedWithAccounts && (sharedWithAccounts.map((account:any,index:number)=>(
              <li key={index} style={{
                fontStyle:'italic'
              }} > 
                {account}
              </li>
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
          </div>
        </div>
      </div>
    </>
    )
  }

  export default Modal;