import React from 'react';
import styled from 'styled-components';

const FormContainer = styled.div`
    width: 100%;
    height: 90vh;
`
const Form = styled.form`
    width: 70%;
    height: 100%;
    margin: 0 auto;
    padding-top: 20px;

   box-shadow: rgba(122, 110, 110, 0.35) 0px 5px 15px;
`
export const Input = styled.input`
    display:block;
    margin: 0 0 20px 15px;
    width: 90%;
    height: 40px;
    border: solid 1px #E5E5E5; 
    border-radius: 10px;
    font-size: 1rem;
    

`

const TextArea = styled.textarea`

    width: 90%; 
    height: 150px; 
    margin: 0 0 20px 15px;
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
    margin: 0 auto;
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

    return(
        <FormContainer>
        <Form action="https://immense-beach-32425.herokuapp.com/worship" method="POST">
        <Input type="text" name="startingHymm" placeholder = "찬송"></Input>
        <Input type="text" name="prayer" placeholder = "기도"></Input>
        <Input type="text" name="offering" placeholder = "봉헌송"></Input>
        <Input type="text" name="bibleText" placeholder = "본문"></Input>
            <Input type="text" name="title" placeholder = "제목"></Input>
            <Input type="text" name="endingHymm" placeholder="주기도문송"></Input>

            <TextArea name="context" placeholder="설교"></TextArea>
            <Input type="text" name="videoURL" placeholder="유튜브 링크"></Input>
            <SubmitButton type="submit">작성하기</SubmitButton>
        </Form>
        </FormContainer>
    )
}