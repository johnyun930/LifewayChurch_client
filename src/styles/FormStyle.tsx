import styled from 'styled-components';

interface colorProps{
    color?: string
}

export const Message = styled.h1`
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 30px;
    text-align: center;
`

export const FormContainer = styled.div`
    background-color: white;
    width: 100%;
    height:100%;
    
`

export const Form = styled.form`
    width: 80%;
    height: 40%;
    margin: 50px auto 0;
   

`


export const Input = styled.input`
    margin: 0 auto 10px;
    width: ${(props)=>props.theme.width||"90%"};
    height: 30px;
    border: 1px solid white;
    border-bottom: 1px solid ${(props:colorProps)=>props.color||"#eaeaea"};
    font-size: 1rem;
    transition: border-bottom 1s;
    &:focus{
        outline: none;
        border-bottom: 1px solid black;
    }
    &:disabled{
        background-color: transparent;
    }


`
export const ErrMessage = styled.span`
    display:block;
    color: red;
    width: 90%;
    height: 10px;

`

export const Label = styled.label`
    display: block;
    font-weight: bold;
    color: darkgray;
    font-size: 0.8rem;
    margin-bottom: 2px;
`
interface ButtonProps{
    center?: boolean,
    top?: string
}

export const SubmitButton = styled.button<ButtonProps>`
  display: block;
    width: 50%;
    min-width: 100px;
    font-weight: 500;
    color: white;
    margin: ${(props)=>props.center?"0 auto":0};
    margin-top: ${(props)=>props.top||0};
    background-color: ${(props)=>props.theme.buttoncolor};
    border-radius: 18px;
    height: 36px;
    line-height: 36px;
    border: 1px solid ${(props)=>props.theme.bordercolor};
    font-size: 16px;
    &:hover{
        cursor: pointer;
       background-color: ${(props)=>props.theme.hovercolor};
     }
`

export const SmallBox = styled.p`
    margin-top:${(props)=>props.theme.margin||0} ;
    color: #264e81;

    white-space: pre;
    width: 93%;
    font-size: 12px;
    text-align: ${(props)=>props.theme.align||"right"} ;
    &:hover{
        cursor: pointer;
        text-decoration: underline;
    }
  
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


