import "./Display.css"
import Image from "next/image"
import { ReactNode, useState } from "react"
import { Props } from "../types"
import {toast} from "react-toastify"

const Display:React.FC<Props>=({account,contract})=> {
  const [data,setData]=useState<ReactNode[]>([]);
  async function checkFileType(url:string){
     
    const res = await fetch(url);
    const buff = await res.blob();
   
    if(buff.type.startsWith('image/'))
    return 0;
    if(buff.type.startsWith('video/'))
    return 1;
    return -1;

}

  const getData=async ()=>{
    let dataArray;
    const otherAddress=(document.querySelector(".address") as HTMLInputElement).value;

    let loading= toast.loading(`Loading images...`);;
    try{
      if(otherAddress){
        dataArray=await contract?.display(otherAddress);
        toast.update(loading,{ render: " ✅ Shared images", type: "success", isLoading: false,draggableDirection:'x', closeOnClick:true })
      }
      else{
        dataArray=await contract?.display(account?.public);
        toast.update(loading,{ render: " ✅ Your images", type: "success", isLoading: false,draggableDirection:'x', closeOnClick:true })
      }
    }catch(e:any){
      toast.update(loading,{ render: " 🔴 Something went wrong", type: "error", isLoading: false,draggableDirection:'x', closeOnClick:true })
    }
    const isEmpty:boolean= Object.keys(dataArray).length===0;
    if(!isEmpty){
      const images = await Promise.all(dataArray.map(async (item:string, i:number) => {
        const value = await checkFileType(item);
        console.log(value);
      
        if (value===0) {
          return (
            <a href={item} key={i} target="_blank" rel="noopener noreferrer">
              <Image width={200} height={200} key={i} src={item} alt="Image" className="image-list"/>
            </a>
          );
        }
      
       else if(value===1){
        return (
          <a href={item} className="image-lista" key={i}>
            Video
            Click Here to download 
          </a>
        );
       }
       else{
        return (
          <a href={item} className="image-lista" key={i}>
            File
            Click Here to download 
          </a>
        );
       }
      }));
      setData(images);
    }
    else{
toast.warn('No images to display');
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