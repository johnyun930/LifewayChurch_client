import styled from 'styled-components';
import{ useContext, useState } from 'react';
import Bible from '../images/bibleBackground.jpg';
import {BoldContext, SmallBox, SubmitButton,Form,FormContainer} from '../styles/FormStyle'
import { RouterProps } from 'react-router-dom';
import {Signup} from '../components/Signup';
import {Login} from '../components/Login';
import { size } from '../styles/theme';
import { UserInfoContext } from '../states/LoginContext';


export const MainContainer = styled.div`
    width: 70%;
    min-height: 85vh;

    display:grid;
    grid-template-columns: 40% 60%;
    justify-items:center;
    margin: 0 auto 16vh;
    
    box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset;
    background-image: url(${Bible});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    @media ${(props)=>props.theme.tablet} {
        width: 95%;
         grid-template-columns: 40% 60%;

    }
    @media ${(props)=>props.theme.mobile}{
        width: 100%;
        margin-bottom: 0;
    padding-bottom: 30px;

        background: none;
        min-height: 60vh;
        display: block;

    }
   

`
export const WordContainer = styled.div`
    color: black;
    width:100%;
    height: 10%;
    margin-top: 5%;
`
export const Heading = styled.h1`
    margin: 100px 0px 20px;
    color: black;
    font-family: 'Damion';
    text-align: center;
    font-size: 2.3rem;
    line-height: 2;
    @media ${(props)=>props.theme.laptop}{
            font-size: 1.5rem;
    }
    @media ${(props)=>props.theme.mobile}{
        font-size: 2.5rem;
        margin: 0;
    }
`
export const SubHeading = styled.h3`
    margin: 75px 0;
    text-align: center;

    color: #535252;
    font-size: 1.3rem;
    @media ${(props)=>props.theme.laptop}{
            font-size: 1.2rem;
    }
`;

export const Text = styled.h3`
    color: white;
    font-weight: bold;
    text-align: center;
    margin-bottom: 20px;    
    font-size: 1.5rem;
    line-height: 2;
    font-family:'Nanum Myeongjo', serif;

`





export const Authentication  =(props:RouterProps): JSX.Element =>{
    const [signup,setSignup] = useState(false);
    const {userName} = useContext(UserInfoContext);
    return( 
    <MainContainer>
        <FormContainer>
            <Heading>Lifeway Generation Church</Heading> 
            <SubHeading>Welcome! {userName}</SubHeading>
    <Form >
        {signup?<Signup {...props}></Signup>:<Login {...props}></Login>}
        <SmallBox theme={{align:"center",margin:"50px"}} > {signup?"Already have an account?     ":"Don't have an account?     "}<BoldContext  onClick={(e)=>{
            e.preventDefault();
            setSignup(!signup);
        }}>{signup?"Sign In":"Sign Up"}</BoldContext></SmallBox>
    </Form>
    </FormContainer>
    {window.innerWidth<=size.mobile?<></>:
            <WordContainer>
            <Text>풀은 마르고 꽃은 시드나 우리 하나님의 말씀은 영원히 서리라 하라 </Text>
            <Text>(사 40:7)</Text>
          
            </WordContainer>
}   
    </MainContainer>
    )
}
interface formProps {
    form: JSX.Element
}

export const AuthTemplate  =(form:formProps): JSX.Element =>{
    return( 
    <MainContainer>
        <FormContainer>
            <Heading>Lifeway Generation Church</Heading> 
            <SubHeading>Welcome!</SubHeading>
    <Form >
        {form.form}
    </Form>
    </FormContainer>
    {window.innerWidth<=size.mobile?<></>:
            <WordContainer>
            <Text>풀은 마르고 꽃은 시드나 우리 하나님의 말씀은 영원히 서리라 하라 </Text>
            <Text>(사 40:7)</Text>
          
            </WordContainer>
}   
    </MainContainer>
    )
}