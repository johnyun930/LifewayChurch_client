import React, { useEffect, useState } from 'react';
import axios,{AxiosResponse} from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
export interface IService{
    _id: string,
    title: string,
    date: Date,
    prayer: string,
    offering: string,
    startingHymm: string,
    bibleText: string,
    context?: string,
    videoURL?: string,
    endingHymm: string
}

const ListContainer = styled.div`
    max-width: 600px;
    margin: 0 auto;
    padding: 0 20px;
`;

const ContentDate = styled.p`
    text-transform: uppercase;
    font-size: 13px;
    line-height: 1;
`

const ContentTitle = styled.h1`

    font-size: 36px;
    font-weight: bold;
    color: #222;
    margin: 20px 0;
`
const LinkedTitle = styled(Link)`
    text-decoration: none;
    &:hover{
    color: #42B6F3;
    transition: all 0.2s ease;
    }
`

const Content = styled.p`
    font-size: 18px;
    color: #818181;
    margin: 20px 0;
    line-height:2;
`

const LinkedButton = styled(Link)`
    display: inline-block;
    font-weight: 500;
    color: #a5a5a5;
    padding: 0 20px;
    border-radius: 18px;
    height: 36px;
    line-height: 36px;
    border: 1px solid #e2e2e2;
    font-size: 13px;
`

const Article = styled.article`
    width: 100%;
    margin: 50px 0;
`

export const ServiceList = ():JSX.Element =>{
    const [speeches,setSpeeches] = useState<IService[]|null>(null);
    let getSpeech = new Promise<AxiosResponse<IService[]>>((resolve,reject)=>{
        const  data = axios.get<IService[]>('http://localhost:8000/service');
        if(data){
            resolve(data);
        }else{
            reject("axios Error");
        }
    });

    useEffect(()=>{  
        getSpeech.then((data)=>{
            setSpeeches(data.data);
        });
    },[])
    
    let list: JSX.Element[] = [];
    if(speeches){
    speeches.map((data)=>{
        const date = new Date(data.date);
        list.push(
            <Article>
            <ContentDate>{date.toDateString()}</ContentDate>
            <ContentTitle><LinkedTitle to={"/service/"+data._id}>{data.title}</LinkedTitle></ContentTitle>
            <Content>{data.context?.slice(0,200) + "..."}</Content>
            <p>
                <LinkedButton to={"/service/"+data._id}>Read More</LinkedButton>
            </p>
            </Article>
        ) 
    })
    }
return(
    <ListContainer>
    
    {speeches?list:"Loading....."}
    </ListContainer>
)
}