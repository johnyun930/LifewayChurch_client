import React, { useState } from 'react';
import styled from 'styled-components';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

import { IWorship } from '../routes/WorshipList';
import { size } from '../styles/theme';

const MainContainer = styled.div`
    width: 90%;
    height: 75vh;
    display:grid;
    grid-template-columns: 10% 80% 10%;
    justify-items:center;
    align-items: center;
    margin: 0 auto 20px;
    @media ${(props)=>props.theme.tablet}{
        margin-bottom: 50px;
    }
`

const ArrowContainer = styled.div`
    width: 60px;
    height: 60px;
    border: 1px solid black;
    border-radius: 5px;
    &:hover{
        background-color: black;
        color:white;
        transition: all 0.2s ease;;
        cursor: pointer;
    }
    @media ${(props)=>props.theme.mobile}{
        width:30px;
        height:30px;
        margin-top: 30px;
    }
`



const SpeechContainer = styled.div`
    width: 80%;
    height: 100%;
    margin: auto auto;
`
const VideoContainer = styled(SpeechContainer)`
    height: 100%;
    margin: 0 auto 20px auto;
    @media ${(props)=>props.theme.mobile}{
        width: 100%;
        margin: 0 0px;
        
    }

`


const SpeechTitle = styled.h1`
    font-size: 3rem;
    margin: 25px 0;
    font-weight: bold;
    @media ${(props)=>props.theme.tablet}{
        font-size: 2.5rem;
    }
    @media ${(props)=>props.theme.mobile}{
        font-size: 2rem;
        
    }
`

const BibleText = styled.h3`
    font-size: 2rem;
    font-weight: bold;
    margin: 20px 10px;
    @media ${(props)=>props.theme.mobile}{
        font-size: 1.5rem;
        
    }
`

const Context = styled.p`
    font-size: 18px;
    line-height: 2;
    @media ${(props)=>props.theme.tablet}{
        font-size: 15px;
    }
    @media ${(props)=>props.theme.tablet}{
        font-size: 13px;
      
    }
`
const Iframe = styled.iframe`
text-align:center;
    width: 800px;
    height:512px;
    @media ${(props)=>props.theme.tablet}{
        width: 100%;
        height: 70%;
    }
    @media ${(props)=>props.theme.phone}{
        width: 100%;
        height: 40%;
    }
`



export const Worship = (props: IWorship) : JSX.Element=>{
    const [pagenum,setpagenum] = useState<number>(0);
    let textarr: string[] = [];
    let book: string[] = [];
    let maximumletter = 950;
    let arrowfont: number = 60;
    if(props.context){
        textarr = (props.context.trim()).split('.');
    }
     if(window.innerWidth<=size.mobile){
     maximumletter = 90;
     arrowfont = 30;
    }
    else if(window.innerWidth<=size.tablet){
        maximumletter = 250;
    }
    if(textarr){
        let str: string = "";
        for(let i=0; i<textarr.length;i++){
            if(str.length>maximumletter){
                book.push(str);
                str = "";
            }
            str += (textarr[i]+".");
        }
        if(str.length>0){
            book.push(str);
        }
    }

    let orderofService: JSX.Element = <>
        <SpeechTitle>예배 순서</SpeechTitle>
        <Context>{"찬송: "+ props.startingHymm}</Context>
        <Context>{"봉헌송: " + props.offering}</Context>
        <Context>{"성경 봉독: " + props.bibleText}</Context>
        <Context>{"설교 제목: " + props.title}</Context>
        <Context>{"주기도문: " + props.endingHymm}</Context>
    </>;

    let speechContext: JSX.Element =
    <>
    <SpeechTitle>{props.title}</SpeechTitle>
        <BibleText>{props.bibleText}</BibleText>
        <Context>{book[pagenum-1]}</Context>
    </>

    let video: JSX.Element =
    <VideoContainer>
        <SpeechTitle>{props.title}</SpeechTitle>
        <BibleText>{props.bibleText}</BibleText>
        <Iframe src={props.videoURL}></Iframe>
    </VideoContainer>
    
    let textSpeech: JSX.Element = 
    <SpeechContainer>
    {pagenum<=0?orderofService:speechContext} 
    </SpeechContainer> ;
    
   
    return(
        <MainContainer>
            {0<pagenum&&!props.videoURL?
            <ArrowContainer>
            <ArrowBackIcon onClick={()=>{
                setpagenum(pagenum-1);
            }} style={{fontSize:arrowfont}}/>
            </ArrowContainer>:<div></div>
            }
        
            {props.videoURL?video:textSpeech}
        {pagenum<=book.length-1&&!props.videoURL?
        <ArrowContainer>
        <ArrowForwardIcon onClick={()=>{
            setpagenum(pagenum+1);
        }} style={{fontSize: arrowfont}}/>
            </ArrowContainer>:<div></div>
        }
        </MainContainer>
    )
}