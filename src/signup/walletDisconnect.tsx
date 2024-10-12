import { useDisconnect } from "wagmi";

export default function WalletDisconnect() {
    const { disconnect } = useDisconnect()
  return (
    <div className="sub-discr" onClick={()=> disconnect()}>
        <div className="disconnect">Disconnect</div>
    </div>
  )
}
