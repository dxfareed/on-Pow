//import React from 'react'
import abi from '../mainComponents/abi/abi.json'
import Web3 from "web3";
import { useAccount } from "wagmi";
import { useState } from 'react';
import randomGenString from './genId';
import ca from './ca'
export default function RegisteredUser({userName,setUserName}) {
    const arraytest=[];
    const valId=randomGenString();
    const [viewone, setViewOne]= useState(true);
    const [bool, setBool] = useState(null);
    const [view, setView] = useState(null);
    const [viewbool, setViewBool]= useState(false);
    const {address,status} = useAccount();
    //const ca ="0x437D1922fc891B15a1b8ad43Fb8b9C3dB308AE2d";
    async function submitit(){
        const topiclen=document.getElementsByClassName("topic").length;
        for(var i=0; i<topiclen; i++){
            if( document.getElementsByClassName("topic")[i].value !== "" && document.getElementsByClassName("link")[i].value !== "" ){
            arraytest.push({
                name:userName,
                topic:document.getElementsByClassName("topic")[i].value,
                link: document.getElementsByClassName("link")[i].value,
                uid:valId
                });
            }
        }
        for (var i=0; i< arraytest.length; i++){
            if(arraytest[i]!==" "|| arraytest[i]!>=" "*2){
                setBool(true);
            }
            else{
                setBool(false);
            }
        }
        if(bool){
            const provider= window.ethereum;
            const web3= new Web3(provider);
            const contract = await new web3.eth.Contract(abi, ca);
            try{
                await contract.methods.addList(arraytest).send(
                    {from : address}
                )
                console.log("for console message ", arraytest[0].uid );
                valueClick();
                showVal(arraytest[0].uid);
            }
            catch (err) {
                console.error("error here ", err);
            }
        }
        else{
            console.log("not sending")
        }
        //valueClick();
    }
    const valueClick= async () =>{
        try{
            const provider= "https://base-sepolia-rpc.publicnode.com";
            const web3= new Web3(provider);
            const contract = await new web3.eth.Contract(abi, ca);
            await contract.methods.checkUser(address).call().then(
            (res)=> {
                console.log(res);
                setViewOne(false)
            });
            }
            catch(err){
            console.log(err);
            }
    }
    const showVal = async (uid)=>{
        const web3= new Web3("https://base-sepolia-rpc.publicnode.com");
        const contract= new web3.eth.Contract(abi, ca);
        await contract.methods.userPageReturn(address, uid).call().then((res) =>{
            const viewpage= res.map(
              (data)=>(
                <ol>
                <li className='sub-list-each'>
                  <div className='Topic-sub'>{data.topic}</div>
                  <div className='Link-sub'><a href={data.link} target='_blank'>{data.link}</a></div>
                </li>
                </ol>
              )
            )
            setUserName(res[0].name);
            setView(viewpage);
            setViewBool(true);
          }
        )
    }

    //console.log(userName);
    //console.log(arraytest);
    return(
    <div>
       { viewone && <div className="mn-registered">
            <div className="sub-registered">
                <div>
                    <div className="sub-one">
                       <div style={{fontSize:"30px"}}>1</div>
                        <div className="input-val">
                        <div><input className="topic" type="text" placeholder="Topic"/></div>
                        <div><input className="link" type="link" placeholder="https://"/></div>
                        </div>
                    </div>
                    <div className="sub-one">
                       <div style={{fontSize:"30px"}}>2</div>
                        <div className="input-val">
                        <div><input className="topic" contentEditable="false" type="text" placeholder="Topic"/></div>
                        <div><input className="link" type="link" placeholder="https://"/></div>
                        </div>
                    </div>
                    <div className="sub-one">
                       <div style={{fontSize:"30px"}}>3</div>
                        <div className="input-val">
                        <div><input className="topic" type="text" placeholder="Topic"/></div>
                        <div><input className="link" type="link" placeholder="https://"/></div>
                        </div>
                    </div>
                    <div className="sub-one">
                       <div style={{fontSize:"30px"}}>4</div>
                        <div className="input-val">
                        <div><input className="topic" type="text" placeholder="Topic"/></div>
                        <div><input className="link" type="link" placeholder="https://"/></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="add-list">
                <div onClick={submitit}>
                    Submit
                </div>
            </div>
            <div className="add-list">
                <div onClick={valueClick}>
                    get Value
                </div>
            </div>
        </div> }
        <div className='main-user-view'>
        { viewbool && <div>{view}</div>}
        </div>
    </div>
  )
}
