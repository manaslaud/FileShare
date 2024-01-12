import "./Display.css"
import Image from "next/image"
import { ReactNode, useState } from "react"
import { Props } from "../types"

const Display:React.FC<Props>=({account,contract})=> {
  const [data,setData]=useState<ReactNode[]>([]);

  const getData=async ()=>{
    let dataArray;
    const otherAddress=(document.querySelector(".address") as HTMLInputElement).value;


    try{
      if(otherAddress){
        dataArray=await contract?.display(otherAddress);
        alert(`${otherAddress} is sharing these images with you`)
      }
      else{
        dataArray=await contract?.display(account?.public);
        alert("Showing your images")
      }
    }catch(e:any){
      alert(e);
    }
    const isEmpty:boolean= Object.keys(dataArray).length===0;
    if(!isEmpty){
      const images=dataArray.map((item:any,i:number)=>{
        return (
          <a href={item} key={i} target="_blank" rel="noopener noreferrer">
            <Image width={200} height={200} key={i} src={item} alt="Image" className="image-list"/>
          </a>       
        )
      })
      setData(images);
    }
    else{
      alert("No images to display");
    }
  }
  return (
    <>
      <div className="image-list">{data}</div>
      <input
        type="text"
        placeholder="Enter Address"
        className="address"
      ></input>
      <button className="center button" onClick={getData} disabled={!account?.public}>
        Get Data
      </button>
    </>
  )
}
export default Display;