//import React from 'react'
import { useAccount, useConnect, useDisconnect } from 'wagmi'
import WalletDisconnect from '../signup/walletDisconnect';

export default function WalletCMP() {
  const account = useAccount();
  const addrez=account.address;
  return (
    <div>
    <div
        style={{
            marginTop:"9px",
            textAlign:"center"
        }}
    >
      <div>
        --{
          //@ts-ignore
          ` ${addrez.slice(0,5)}..${addrez.slice(addrez.length-6,addrez.length-2)}`
                } --
      </div>
      <div>connected</div>
    </div>
    <WalletDisconnect />
    </div>
  )
}
