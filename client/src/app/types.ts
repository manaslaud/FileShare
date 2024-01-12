import { Contract } from "ethers";
import { Dispatch,SetStateAction } from "react";

export interface address {
public:string;
}
export const defaultAddress: address={
    public:''
}
export interface Props{
    account:address | null,
    contract:Contract | undefined
    }
export interface ModalProps{
        setModalOpen: Dispatch<SetStateAction<boolean>>;
        contract:Contract | undefined
      }
  