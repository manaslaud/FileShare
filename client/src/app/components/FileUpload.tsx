import "./FileUpload.css"
import { useState } from "react"
import axios from "axios"
import { Props } from "../types"
import {toast} from "react-toastify"

 const FileUpload:React.FC<Props> = ({account,contract})=> {
  const [file,setFile]=useState<File>();
  const [fileName,setFileName]=useState<string | undefined>("file");
  const getFileExtension=(filename:string | undefined)=>{
    if(filename)
    return filename.substring(filename.lastIndexOf('.')+1, filename.length) || filename;

  }

  const retrieveFile = (event: any) => {
    const target = event.target as HTMLInputElement;
    const data: File | null = target.files ? target.files[0] : null; 
    if (data) {
      const reader = new window.FileReader();
      try{
        reader.readAsArrayBuffer(data);
        reader.onloadend=()=>{
          setFile(data);
        }
      }catch(e:any){
        toast.warn('Error reading file.')
      }
      
    }
    setFileName(data?.name);
    console.log(getFileExtension(data?.name))
    event.preventDefault();
  };
  
  const handleSubmit=async (event:any)=>{
    event.preventDefault();
    if(file){
      let upload= toast.loading(`Uploading file...`);
      try{
        const formData=new FormData();
        formData.append("file",file);
        const resFile= await axios({
          method:"post",
          url:"https://api.pinata.cloud/pinning/pinFileToIPFS",
          data:formData,
          headers:{
            pinata_api_key:process.env.NEXT_PUBLIC_pinata_api_key,
            pinata_secret_api_key:process.env.NEXT_PUBLIC_pinata_secret_api_key,
            "Content-Type":"multipart/form-data"
          }
        })
        // toast.update(upload,{ render: " ✅ File Uploaded", type: "success", isLoading: false,draggableDirection:'x', closeOnClick:true })

        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile?.data.IpfsHash}`; 
        await contract?.add(account?.public,ImgHash)
        toast.update(upload,{ render: " ✅ Transaction Completed", type: "success", isLoading: false,draggableDirection:'x', closeOnClick:true })
        setFileName("None selected")
      }catch(e:any){
        toast.update(upload,{ render: " 🔴 Something went wrong", type: "error", isLoading: false,draggableDirection:'x',closeOnClick:true })
        console.log(e)
      }
    }
  }
    return (
      <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose File
        </label>
        <input
          disabled={!account?.public}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">File: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
    )
  }

  export default FileUpload;