import axios from 'axios';
import React,{useContext, useEffect, useState} from 'react';
import { useHistory, useLocation, useParams } from 'react-router';
import {RouteParams} from '../routes/WorshipDetail';
import { DomainContext } from '../states/DomainContext';
import { BulletenData } from './Bulleten';
import styled from 'styled-components';
import { Comment } from './Comment';
import { Create, Delete } from '@material-ui/icons';
import {  UserInfoContext } from '../states/LoginContext';

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
@media ${(props)=>props.theme.mobile}{
    width: 100%;
}
`

const Title = styled.h1`
font-weight: bold;
padding: 20px;
font-size: 32px;
@media ${(props)=>props.theme.mobile}{
    padding-left: 40px;
}

`;
const Composer = styled.h3`
font-size: 20px;
font-weight:bold;
padding-right: 20px;
text-align:right;
@media ${(props)=>props.theme.mobile}{
    text-align: left;
    padding-left: 40px;

}
`
const BibleText = styled.h2`
font-size: 24px;
padding-left: 20px;
@media ${(props)=>props.theme.mobile}{
    text-align: left;
padding-left: 40px;

    margin-top: 20px;

}

` 
const Contextcontainer = styled.div`
width: 60%;
min-height: 60vh;
margin: 0 auto;
border-bottom: 1px solid #eaeaea;
@media ${(props)=>props.theme.mobile}{
    width: 100%;
    

}
`  ;

const Context = styled.p`
line-height:2;
font-size: 16px;
padding: 20px 20px 0;
word-wrap:break-word;

`
const UpdateInput = styled.input`
    width: 70%;
    min-height: 25px;
    border: 1px solid #eaeaea;
    border-radius: 5px;

`
const UpdateTextArea = styled.textarea`
    width:100%;
    font-size: 16px;
    min-height: 400px;
    line-height: 200%;
    resize: none;
`;

const UpdateButton = styled.button`
    width: 20%;
    height: 40px;
    display: block;
    margin: 30px auto;
    font-size: 16px;
    border: 1px solid #eaeaea;
    border-radius: 4px;
    &:hover{
        cursor: pointer;
        font-weight:bold;
    }

`

const ModifyContainer = styled.div`
width: 60%;
height: 3vh;
border-bottom: 1px solid #eaeaea;
margin: 0 auto;
text-align: right;
@media ${(props)=>props.theme.mobile}{
    width: 90%;
}
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
    const [update,setUpdate] = useState(false);
    const {userName,isAdmin} = useContext(UserInfoContext)
    
   
   


    useEffect(()=>{
         axios.get(url+"/"+Id).then((response)=>{
            setData(response.data);
        });
    },[]);

  

    let form: JSX.Element = <></>;
    if(data){
        if(!update){
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

    
        {data.composer===userName||isAdmin?
        <ModifyContainer>
            {data.composer===userName?<IconBox><Create onClick={()=>{
            setUpdate(!update);
        }}></Create></IconBox>:""}
        
        <IconBox onClick={()=>{
           let con= window.confirm("Do you want to delete this post?");
           if(con){
               axios.delete(url+"/"+Id).then((response)=>{
                   if(response.data){
                       alert(response.data.message);
                       history.goBack();
                   }
               })
           }

        }}><Delete >
            </Delete>
            </IconBox>
        </ModifyContainer>
        :""}
    </>
        }else{
            form = 
            <>
            <Header>
            <UpdateInput style={{fontWeight:"bold", fontSize:"24px"}} type="text" placeholder="제목" value={data.title} required onChange={(e)=>{
                setData({...data,title:e.target.value});
            }}></UpdateInput>
            <Composer>{data.composer}</Composer>
            {data.bibleText?<UpdateInput type="text" value={data.bibleText} placeholder="성경 본문" required onChange={(e)=>{
                setData({...data,bibleText:e.target.value});
            }}></UpdateInput>:<></>}
            </Header>
            <Contextcontainer>
                <UpdateTextArea placeholder="내용" value={data.context} onChange={(e)=>{
                     setData({...data,context:e.target.value});
                }}></UpdateTextArea>
            <UpdateButton onClick={()=>{
                axios.patch(url+"/",{Id,...data}).then((response)=>{
                    if(response.data.errMessage){
                        alert(response.data.errMessage);
                    }else{
                        setUpdate(false);
                    }
                })
            }}>수 정 하 기</UpdateButton>

            </Contextcontainer>
            <ModifyContainer>
                <IconBox>
                    <Create onClick={()=>{
                setUpdate(!update);
            }}></Create>
            </IconBox>
            
            <IconBox onClick={()=>{
               let con= window.confirm("Do you want to delete this post?");
               if(con){
                   console.log("deleting");
                   axios.delete(url+"/"+Id).then((response)=>{
                       if(response.data){
                           alert(response.data.message);
                           history.goBack();
                       }
                   })
               }
    
            }}><Delete ></Delete></IconBox></ModifyContainer>
        </>
            
        }
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