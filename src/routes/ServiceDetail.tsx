import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IService } from './ServiceList';
import {Worship} from '../components/Worship';

interface RouteParams{
    speechId: string
}

export const ServiceDetail = ()=>{
    const [service,setService] = useState<IService|null>(null);
    const {speechId} = useParams<RouteParams>();

    async function getspeech(){
      return  axios.get<IService>(`http://localhost:8000/service/${speechId}`);

    }

    useEffect(()=>{
        getspeech().then((data)=>{
            setService(data.data);
        })
    },[])

    
    let speech : JSX.Element = <></>;
   
    return(
        <div>
        {service?<Worship _id={service._id} offering={service.offering} title={service.title} bibleText={service.bibleText} date={service.date} prayer={service.prayer} startingHymm={service.startingHymm} 
        context={service.context} videoURL={service.videoURL} endingHymm={service.endingHymm} 
        />:"Loading..."}
        </div>
        )
}