import axios from 'axios';
import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';
import { DomainContext } from '../states/DomainContext';

export const FormContainer = styled.div`
    width: 100%;
    height: 90vh;
    margin-bottom: 100px;
`
export const Form = styled.form`
    width: 70%;
    height: 100%;
    margin: 0 auto;
    padding-top: 20px;
   box-shadow: rgba(122, 110, 110, 0.35) 0px 5px 15px;
   
`
export const Input = styled.input`
    display:block;
    margin: 0 auto 15px;
    width: 90%;
    height: 40px;
    border: solid 1px #E5E5E5; 
    border-radius: 10px;
    font-size: 1rem;
    

`

export const TextArea = styled.textarea`
    display:block;
    width: 90%; 
    height: ${(props)=>props.theme.height||"150px"}; 
    margin: 0 auto 15px;
    line-height: 150%; 
    border: solid 1px #E5E5E5; 
    border-radius: 3px;
    outline: 0; 
    resize: none;

`

export const SubmitButton = styled.button`
  display: block;
    font-weight: 500;
    color: #a5a5a5;
    padding: 0 20px;
    margin: 0 auto ;
    border-radius: 18px;
    height: 36px;
    line-height: 36px;
    border: 1px solid #e2e2e2;
    font-size: 16px;
    &:hover{
        cursor: pointer;
        background-color: black;
        color:white;
    }
`


export const CreatingWorship = (): JSX.Element =>{
            const [startingHymm,setStartingHymm] = useState("");
            const [prayer, setPrayer] = useState("");
            const [offering,setOffering] = useState("");
            const [bibleText,setBibleText] = useState("");
            const [title,setTitle] = useState("");
            const [endingHymm,setEndingHymm] = useState("");
            const [context,setContext] = useState("");
            const [videoURL,setVideoURL] = useState("");
            const domain = useContext(DomainContext);
            const history = useHistory();

    return(
        <FormContainer>
        <Form  method="POST">
        <Input type="text" value = {startingHymm} onChange={(e)=>{setStartingHymm(e.target.value);}} placeholder = "찬송"></Input>
        <Input type="text" value={prayer} onChange={(e)=>{setPrayer(e.target.value);}} placeholder = "기도"></Input>
        <Input type="text" value={offering} onChange={(e)=>{setOffering(e.target.value)}} placeholder = "봉헌송"></Input>
        <Input type="text" value={bibleText} onChange={(e)=>{setBibleText(e.target.value);}} placeholder = "본문"></Input>
        <Input type="text" value={title} onChange={(e)=>{setTitle(e.target.value)}} placeholder = "제목"></Input>
        <Input type="text" value={endingHymm} onChange={(e)=>{setEndingHymm(e.target.value);}} placeholder="주기도문송"></Input>
        <TextArea value={context} onChange={(e)=>{setContext(e.target.value);}} placeholder="설교"></TextArea>
            <Input type="text" value={videoURL} onChange={(e)=>{setVideoURL(e.target.value);}} placeholder="유튜브 링크"></Input>
            <SubmitButton type="submit" onClick={(e)=>{
                e.preventDefault();
                const data = {
                    startingHymm,
                    prayer,
                    offering,
                    bibleText,
                    title,
                    endingHymm,
                    context,
                    videoURL
                };
                axios.post(domain+"/worship",data).then((response)=>{
                    if(response.data.errMessage){
                        alert(response.data.errMessage);
                    }else{
                        history.replace('/worship');
                    }
                })
            }}>작성하기</SubmitButton>
        </Form>
        </FormContainer>
    )
}