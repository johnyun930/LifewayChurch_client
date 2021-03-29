import styled from 'styled-components';

export const Input = styled.input`
    margin: 0 auto 10px;
    width: ${(props)=>props.theme.width||"90%"};
    height: 30px;
    border: 1px solid white;
    border-bottom: 1px solid #eaeaea;
    font-size: 1rem;
    transition: border-bottom 1s;
    &:focus{
        outline: none;
        border-bottom: 1px solid black;
    }
  

`
export const Label = styled.label`
    display: block;
    font-weight: bold;
    color: darkgray;
    font-size: 0.8rem;
`

export const SubmitButton = styled.button`
  display: block;
  min-width: 50%;
    font-weight: 500;
    color: white;
    background-color: #707186;
    padding: 0 20px;
    margin: 65px auto 30px ;
    border-radius: 18px;
    height: 36px;
    line-height: 36px;
    border: 1px solid #e2e2e2;
    font-size: 16px;
    &:hover{
        cursor: pointer;
        background-color: #A095A5;
        color:white;
    }
`

export const SmallBox = styled.p`
    margin-top:${(props)=>props.theme.margin||0} ;
    color: #264e81;

    white-space: pre;
    width: 93%;
    font-size: 12px;
    text-align: ${(props)=>props.theme.align||"right"} ;
  
`
export const BoldContext = styled.h3`
    color: #264e81;

    display: inline;
    font-size: 14px;
    font-weight: bold;
    &:hover{
        cursor: pointer;
        text-decoration: underline;
    }
`