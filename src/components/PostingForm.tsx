import axios from 'axios';
import React, { useContext, useState } from 'react';
import { RouterProps, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Input as FormInput, SubmitButton as FormButton } from "../styles/FormStyle";

import { DomainContext } from '../states/DomainContext';
import { UserInfoContext } from '../states/LoginContext';
import { BulletenHeading } from './Posting';

interface formAttribute {
    IsbibleInput?: boolean,
    path: string
}

const FormContainer = styled.div`
    width: 70%;
    height: 80vh;
    margin: 0 auto;
    border-top: 1px solid black;
    border-bottom: 1px solid black;
    padding: 30px 0;
`
const Form = styled.form`
    width: 100%;
    height: 100%;
    margin: 0 auto;
`


const Input = styled(FormInput)`
    width: 50%;
    margin-bottom: 30px;
`

const SubInput = styled.input`
    width: 50%;
    display: inline-block;
    margin: 20px auto ;
`
export const TextArea = styled.textarea`
    display:block;
    width: 100%; 
    height: ${(props)=>props.theme.height||"150px"}; 
    line-height: 150%; 
    border: 1px solid black; 
    border-radius: 3px;
    outline: 0; 
    resize: none;

`
const CheckBox = styled.input`
    border: 2px solid black;
`

const SubmitButton = styled(FormButton)`
    width: 100px;
`

export const PostingForm = ({IsbibleInput=false,path}:formAttribute):JSX.Element=>{
        const domain = useContext(DomainContext);
        const [title,setTitle] = useState<string>("");
        const [bibleText,setBibleText] = useState<string>("");
        const [context,setContext] = useState<string>("");
        const [notice,setNotice] = useState<string>("0");
        const [file,setFile] = useState<File>();
        const {userName,level} = useContext(UserInfoContext);
        const history = useHistory();

        
        

        
    return(
        <>
        <BulletenHeading></BulletenHeading>
        <FormContainer>
            <Form action={`${domain}/${path}`} method="POST">
        <Input type="text" name="title" value={title} placeholder = "제목을 입력해주세요" onChange={
             (e)=>{
                 setTitle(e.target.value);
             }
         } ></Input>
         {level>=3?<> <CheckBox style={{marginLeft:"5.5%"}} type="checkbox" onChange={
            (e)=>{
                if(e.target.value){
                    setNotice("1");
                }else{
                    setNotice("0");
                }
            }
        } name="notice" /> <label>이글을 공지로 올리기</label></>:""}
         {IsbibleInput?<Input type="text" name="bibleText" value={bibleText} onChange={
             (e)=>{
                 setBibleText(e.target.value);
             }
         } placeholder = "성경 본문을 입력해주세요(선택)" required></Input>:""}
            <TextArea theme={{height:"450px"}} value={context} onChange={(e)=>{
                setContext(e.target.value);
            }} name="context" placeholder="내용을 입력해주세요" required></TextArea>
            <SubInput type="file" name="FileName" onChange={(e)=>{
                e.preventDefault();
                if(e.target.files){
                    setFile(e.target.files[0]);
                }
                
            }}></SubInput>
           
            <SubmitButton center={true} type="submit" onClick={(e)=>{
                e.preventDefault();
                let formData = new FormData();
                formData.append('title',title);
                formData.append('context',context);
                formData.append('bibleText',bibleText);
                formData.append('composer',userName);
                formData.append("notice",notice);
                if(file){
                    formData.append("file",file);
                }
                axios.post(`${domain}/${path}`,formData,{
                    withCredentials:true,
                    headers: {
                        'Content-Type': 'multipart/form-data'
                      }
                }).then((response)=>{
                    if(response.data.error){
                        alert(response.data.error);
                    }else{
                        history.push(`${"/connect/"+path}`);
                    }
                }); 
                


            }}>작성하기</SubmitButton>
            </Form>
        </FormContainer>
        </>
    )

}