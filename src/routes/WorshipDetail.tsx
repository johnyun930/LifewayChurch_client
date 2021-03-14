import axios from 'axios';
import  {useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IWorship } from './WorshipList';
import {Worship} from '../components/Worship';
import { DomainContext } from '../states/DomainContext';

interface RouteParams{
    speechId: string
}



export const WorshipDetail = ()=>{
    const [worship,setWorship] = useState<IWorship|null>(null);
    const {speechId} = useParams<RouteParams>();
    const domain = useContext(DomainContext);
    async function getspeech(){
      return  axios.get<IWorship>(`${domain}/worship/${speechId}`);

    }

    useEffect(()=>{
        getspeech().then((data)=>{
            setWorship(data.data);
        })
    },[])

    
    let speech : JSX.Element = <></>;
   
    return(
        <>
        {worship?<Worship _id={worship._id} offering={worship.offering} title={worship.title} bibleText={worship.bibleText} date={worship.date} prayer={worship.prayer} startingHymm={worship.startingHymm} 
        context={worship.context} videoURL={worship.videoURL} endingHymm={worship.endingHymm} 
        />:<div>"Loading..."</div>}
        </>
        )
}