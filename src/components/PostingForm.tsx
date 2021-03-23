import axios from 'axios';
import React, { useContext, useState } from 'react';
import { RouterProps, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { Input, SubmitButton, TextArea } from "../routes/CreatingWorship"
import { Form, FormContainer } from '../routes/CreatingWorship';
import { DomainContext } from '../states/DomainContext';
import { UserInfoContext } from '../states/LoginContext';

interface formAttribute {
    IsbibleInput?: boolean,
    path: string
}
const Container = styled.div`
    width: 50%;
    margin: 20px 20px;
    height: 5%;
`

const SubInput = styled.input`
    width: 50%;
    height: 100%;
    padding-left: 5.5%;
    display: inline-block;
    margin: 0 auto 20px;

        
`

export const PostingForm = ({IsbibleInput=false,path}:formAttribute):JSX.Element=>{
        const domain = useContext(DomainContext);
        const [title,setTitle] = useState<string>("");
        const [bibleText,setBibleText] = useState<string>("");
        const [context,setContext] = useState<string>("");
        const [notice,setNotice] = useState<string>("0");
        const [file,setFile] = useState<File>();
        const {userName} = useContext(UserInfoContext);
        const history = useHistory();

        
        

        
    return(
        <FormContainer>
            <Form action={`${domain}/${path}`} method="POST">
        <Input type="text" name="title" value={title} placeholder = "제목을 입력해주세요" onChange={
             (e)=>{
                 setTitle(e.target.value);
             }
         } required></Input>
         {IsbibleInput?<Input type="text" name="bibleText" value={bibleText} onChange={
             (e)=>{
                 setBibleText(e.target.value);
             }
         } placeholder = "성경 본문을 입력해주세요(선택)" required></Input>:""}
            <TextArea theme={{height:"450px"}} value={context} onChange={(e)=>{
                setContext(e.target.value);
            }} name="context" placeholder="내용을 입력해주세요" required></TextArea>
            <Container>
            <SubInput type="file" name="FileName" onChange={(e)=>{
                e.preventDefault();
                if(e.target.files){
                    setFile(e.target.files[0]);
                }
                
            }}></SubInput>
            </Container>
            <Container>
            <label><input style={{marginLeft:"5.5%"}} type="checkbox" onChange={
                (e)=>{
                    if(e.target.value){
                        setNotice("1");
                    }else{
                        setNotice("0");
                    }
                }
            } name="notice" />이글을 공지로 올리기</label>
            </Container>
            <SubmitButton type="submit" onClick={(e)=>{
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
    )

}