import React, { useEffect, useState } from 'react';
import axios,{AxiosResponse} from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { Worship } from '../components/Worship';
export interface IWorship{
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
    height: 190vh;
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
const Alert = styled(ContentTitle)`
    
    margin: 0px auto;
    padding-top: 30%;
    text-align: center;
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

export const WorshipList = ():JSX.Element =>{
    const [worships,setWorships] = useState<IWorship[]|null>(null);
    const [page,setPage] = useState<number>(1);
    let getWorship = new Promise<AxiosResponse<IWorship[]>>((resolve,reject)=>{
        const  data = axios.get<IWorship[]>('http://localhost:8000/worship');
        if(data){
            resolve(data);
        }else{
            reject("axios Error");
        }
    });

    useEffect(()=>{  
        getWorship.then((data)=>{
            setWorships(data.data);
        });
    },[]);

    
      
    

    
    
    let list: JSX.Element[][] = [];
    if(worships && worships.length!==0){
        for(let i=0; i<(worships.length/4)+1;i++){
            list.push([]);
            for(let j=(i*4); j<j+4;j++){
                let data = worships[j];
                 let date = new Date(data.date);
                list[i].push(
                    <Article>
            <ContentDate>{date.toDateString()}</ContentDate>
            <ContentTitle><LinkedTitle to={"/worship/"+data._id}>{data.title}</LinkedTitle></ContentTitle>
            <Content>{data.videoURL?"예배 영상":data.context?.slice(0,200) + "..."}</Content>
            <p>
                <LinkedButton to={"/worship/"+data._id}>Read More</LinkedButton>
            </p>
            </Article>

                );
            }
    }
    }else{
        list.push([]);
        list[0].push(<Alert>아직 등록된 예배가 없습니다</Alert>)
    }
return(
    <ListContainer>
    
    {worships?list[page]:"Loading....."}
    </ListContainer>
)
}