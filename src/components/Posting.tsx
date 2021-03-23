import axios from 'axios';
import React,{useContext, useEffect, useState} from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import {RouteParams} from '../routes/WorshipDetail';
import { DomainContext } from '../states/DomainContext';
import { BulletenData } from './Bulleten';
import styled from 'styled-components';
import { Comment, CommentData } from './Comment';
import { Delete } from '@material-ui/icons';
import { LoginContext, UserInfoContext } from '../states/LoginContext';

const Container = styled.div`
width: 100%;
margin-bottom: 100px;
`
const Header = styled.div`
width: 60%;
height: 18%;
margin: 0 auto;
padding-bottom: 10px;
border-bottom: 1px solid #eaeaea;
`

const Title = styled.h1`
font-weight: bold;
padding: 20px;
font-size: 32px;

`;
const Composer = styled.h3`
font-size: 20px;
font-weight:bold;
padding-right: 20px;
text-align:right;
`
const BibleText = styled.h2`
font-size: 24px;
padding-left: 20px;

` 
const Contextcontainer = styled.div`
width: 60%;
min-height: 60vh;
margin: 0 auto;
border-bottom: 1px solid #eaeaea;

`  ;

const Context = styled.p`
line-height:2;
font-size: 16px;
padding: 20px 20px 0;
word-wrap:break-word;

`



const ModifyContainer = styled.div`
width: 60%;
height: 3vh;
border-bottom: 1px solid #eaeaea;
margin: 0 auto;
text-align: right;
`
const IconBox = styled.div`
display:inline-block;
width: 30px;
&:hover{
    cursor: pointer;
}
`

export const Posting=():JSX.Element=>{
    const {Id} = useParams<RouteParams>();
    const [data,setData] = useState<BulletenData>();
    const location = useLocation();
    const path = location.pathname.split('/');
    const domain = useContext(DomainContext);
    const history = useHistory();
    const url  =domain+"/"+path[2];
   
   


    useEffect(()=>{
         axios.get(url+"/"+Id).then((response)=>{
            setData(response.data);
        });
    },[]);

  

    let form: JSX.Element = <></>;
    if(data){
        form =
        <>
        <Header>
        <Title>{data.title}</Title>
        <Composer>{data.composer}</Composer>
        {data.bibleText?<BibleText>{data.bibleText}</BibleText>:<></>}
        </Header>
        <Contextcontainer>
            <Context>{data.context}</Context>
        </Contextcontainer>
        <Comment url={url} Id={Id}></Comment>

    
        <ModifyContainer><IconBox onClick={()=>{
           let con= window.confirm("Do you want to delete this post?");
           if(con){
               axios.delete(url).then((response)=>{
                   if(response.data){
                       alert(response.data.message);
                       history.goBack();
                   }
               })
           }

        }}><Delete ></Delete></IconBox></ModifyContainer>
    </>
    }else{
        form = <div>Loading....</div>;
    }

    return(
    <>
    <Container>
        
        {form}
    </Container>
    </>)
}