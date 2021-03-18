import React from 'react';
import styled from 'styled-components';
import sample from '../images/Sample.jpg'
import user from '../images/user.png';
import profile from '../images/profile.png';

export const LogoBox = styled.div`
    width: 100%;
    height: 50vh;
    background-color: grey;
    margin-bottom: 50px;
`

const ColumBox = styled.div`
    width: 60%;
    height: 40vh;
    margin: 100px auto ;
    display: grid;
    grid-template-columns: 45% 55%;

`

const ImageBox = styled.div`
    width: 60%;
    height: 100%;
    margin: 0 auto;
`
const Image = styled.img`
    width: 100%;
    height: 100%;
`
const ExplainationBox =styled.div`
    width: 100%;
    height: 100%;
    margin-left:20px;
    background-repeat: none;
    background-size: contain;
    
`
const Title = styled.h1`
    font-size: 35px;
    font-weight: bold;
    margin: 80.45px 0 23.45px;

`
const Context= styled.p`
    line-height: 28px;
    letter-spacing: -1px;
    font-weight: 400;
    font-style: normal;
    font-size: 16px;
`
const HorizontalLine = styled.hr`
    width: 50%;
    border: 1px solid #eaeaea;
    margin: px auto;
    
`

export const About = ():JSX.Element =>{
    return(
        <>
        <LogoBox></LogoBox>
        <ColumBox>
        <ImageBox>
            <Image src={user}/>
        </ImageBox>
        <ExplainationBox>
            <Title>라일주 목사</Title>
            <Context>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam expedita ea eveniet id repudiandae, magni in atque impedit repellendus aut vero nostrum illum mollitia voluptatibus laboriosam obcaecati iure iusto laborum?</Context>
        </ExplainationBox>
        </ColumBox>
        <HorizontalLine></HorizontalLine>
        <ColumBox>
        <ImageBox>
            <Image src={profile}/>
        </ImageBox>
        <ExplainationBox>
            <Title>오세정 목사</Title>
            <Context>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsam expedita ea eveniet id repudiandae, magni in atque impedit repellendus aut vero nostrum illum mollitia voluptatibus laboriosam obcaecati iure iusto laborum?</Context>
        </ExplainationBox>
        </ColumBox>
        </>
    )
}