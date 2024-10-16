import {useState ,useEffect} from "react";
import  Web3 from 'web3';
import ca from './ca'
import abi from '../mainComponents/abi/abi.json';
//@ts-ignore
export default function SharedViewPage({setUserName}) {
  const [view, setView] = useState(null);
  const web3= new Web3("https://sepolia.base.org");
  const userAddrs= window.location.pathname.split("/")
  const contract= new web3.eth.Contract(abi, ca);
  useEffect(()=>{
    contract.methods.checkUser(userAddrs[userAddrs.length-1]).call().then(
      (res) =>{
      //console.log(res)
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
      setUserName(res[0].name)
      //@ts-ignore
      setView(viewpage);
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
        //0x52c043C7120d7DA35fFdDF6C5c2359d503ceE5F8
  }, [ca])
  return (
    <>
    <div className='main-user-view'>
      <div>
            <ol>
              {view}
            </ol>
      </div>
    </div>
    </>
  )
}