//import {useParam} from "react-router-dom"
import { useEffect, useState } from "react";
import { useAccount } from "wagmi";
import  Web3 from 'web3';
import ca from './ca'
import abi from '../mainComponents/abi/abi.json'
export default function UserPage({}) {
  const [view, setView] = useState(null);
  const web3= new Web3("https://sepolia.base.org");
  const link = window.location.href;
  const {address} = useAccount()
  const contract= new web3.eth.Contract(abi, ca);
  useEffect( ()=>{
    contract.methods.checkUser(address).call().then(
      (res) =>{
      console.log(res)
      const viewpage= 
          <ol>
          {
            //@ts-ignore
          res.map(
            //@ts-ignore
            (data)=>(
              <li className='sub-list-each'>
                <div className='Topic-sub'>{data.topic}</div>
                <div className='Link-sub'><a href={data.link} target='_blank'>{data.link}</a></div>
              </li>
            )
          )}
          </ol>
          //@ts-ignore
      setView(viewpage);
      //setViewBool(true);
    }
  ).catch(()=>{
    //@ts-ignore
    document.querySelector(".connection-info").style.display="block";
    setTimeout(
      ()=>{
        //@ts-ignore
        document.querySelector(".connection-info").style.display="none";
      }, 4000
    )
      })

  },[])
  const DeleteFunc = async()=>{
    const provider= window.ethereum;
    const web3= new Web3(provider);
    const contract = await new web3.eth.Contract(abi, ca);
    try{
    await contract.methods.deleteData(address).send(
        {from : address}).then(
    ()=>{ 
      //@ts-ignore
      document.querySelector(".deleted-it").style.display="block";
        setTimeout(
          ()=>{
            //@ts-ignore
            document.querySelector(".deleted-it").style.display="none";
          }, 4000
        )
    })
    .catch((err)=> console.log(err));
    }
    catch(err){
      //@ts-ignore
      console.log(err)
      //@ts-ignore
        document.querySelector(".connection-info").style.display="block";
        setTimeout(
          ()=>{
            //@ts-ignore
            document.querySelector(".connection-info").style.display="none";
          }, 4000
        )
    }
}

  return (
    <>
    <div className="deleted-it">Deleted !</div>
    <div className="share-link">
      <div className="share-link-info">Share PoW:</div>
      <div className="share-link-link"><a href={`${link}/${address}`}>{`${link}/${address}`}</a></div>
    </div>
    <div className='main-user-view'>
      <div>
            <ol>
              {view}
            </ol>
      </div>
    </div>
    <div className="update-list">
        <div onClick={DeleteFunc}>
          Delete
        </div> 
    </div>
    </>
  )
}
