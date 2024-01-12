import "./FileUpload.css"
import { address } from "../types"
import { Contract } from "ethers"
import { useState } from "react"
import axios from "axios"

interface Props{
account:address | null,
contract:Contract | undefined
}
 const FileUpload:React.FC<Props> = ({account,contract})=> {
  const [file,setFile]=useState<File>();
  const [fileName,setFileName]=useState<string | undefined>("file");
  const retrieveFile = (event: any) => {
    const target = event.target as HTMLInputElement;
    const data: File | null = target.files ? target.files[0] : null; 
    if (data) {
      const reader = new window.FileReader();
      reader.readAsArrayBuffer(data);
      reader.onloadend=()=>{
        setFile(data);
      }
    }
    setFileName(data?.name);
    event.preventDefault();
  };
  
  const handleSubmit=async (event:any)=>{
    event.preventDefault();
    if(file){
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
        
        const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile?.data.IpfsHash}`; 
        contract?.add(account?.public,ImgHash)
        alert("Image uploaded")
        setFileName("None selected")
      }catch(e:any){
        alert(e);
        console.log(e)
      }
    }
  }
    return (
      <div className="top">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="file-upload" className="choose">
          Choose Image
        </label>
        <input
          disabled={!account}
          type="file"
          id="file-upload"
          name="data"
          onChange={retrieveFile}
        />
        <span className="textArea">Image: {fileName}</span>
        <button type="submit" className="upload" disabled={!file}>
          Upload File
        </button>
      </form>
    </div>
    )
  }

  export default FileUpload;