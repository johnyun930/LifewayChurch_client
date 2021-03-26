import React, { useState } from 'react';
import styled from 'styled-components';
import user from '../images/user.png';
import profile from '../images/profile.png';
import { Email, PhoneAndroid } from '@material-ui/icons';
import about from '../images/About.jpg';
import {Title as MainTitle } from '../routes/WorshipList';
export const LogoBox = styled.div`
    width: 100%;
    height: 60vh;
   
    background-image: url(${(props)=>props.theme.url});
    background-size: 100% 100%;
    background-repeat: no-repeat;
    margin: 0 auto;
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
    width: 98%;
    height: 80%;
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
    margin: 40px 0 23.45px;

`
const Context= styled.p`
    line-height: 28px;
    letter-spacing: -1px;
    font-weight: 400;
    font-style: normal;
    font-size: 23px;
    margin-bottom: 80px;
`
const HorizontalLine = styled.hr`
    width: 50%;
    border: 1px solid #eaeaea;
    margin: px auto;
    
`
const ContactBox = styled.div`
    width: 100%;
    height: 10%;
`
const ContactInfo = styled.h3`
    font-weight: bold;
    display: inline-block;
    font-size: 20px;
    left: 10px;
    position: relative;
`
const PhoneIcon = styled(PhoneAndroid)`
    font-size: 30px;
    position: relative;
    top: 5px;
    display: inline-block;
`

const MailIcon = styled(Email)`
    font-size: 30px;
    position: relative;
    top: 5px;
    display: inline-block;
`

const Tab = styled.div`
    width: 30%;
    height: 10%;
    display: grid;
    margin: 0 auto ;
    grid-template-columns: 1fr 1fr 1fr;
`
const SelectedTabButton = styled.div`
    width: 80%;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
    padding-bottom: 10px;
    border-bottom: 1px solid #eaeaea;
`

const TabButton = styled(SelectedTabButton)`
    font-weight: normal;
    

    &:hover{
        cursor: pointer;
        font-weight: bold;
    }
`
const Name = styled.h4`
    text-align: center;
    font-weight: bold;
    font-size: 24px;
    margin-top: 10px;
`


export const About = ():JSX.Element =>{
    enum Section {
        Pastor = 0,
        Director = 1,
        Worship = 2
    }
    
    const [tab,setTab] = useState(Section.Pastor);

    let form = <>
        <ColumBox>
        <ImageBox>
            <Image src={user}/>
        </ImageBox>
        <ExplainationBox>
            <Title>라일주 목사</Title>
            <Context>생명길 교회 담임 목사</Context>
            <ContactBox>
                <PhoneIcon ></PhoneIcon><ContactInfo>604-333-3333</ContactInfo>
            </ContactBox>
            <ContactBox>
                <MailIcon ></MailIcon><ContactInfo>life.way.generation.church@gmail.com</ContactInfo>
            </ContactBox>
        </ExplainationBox>
        </ColumBox>
        <HorizontalLine></HorizontalLine>
        <ColumBox>
        <ImageBox>
            <Image src={profile}/>
        </ImageBox>
        <ExplainationBox>
            <Title>오세정 목사</Title>
            <Context>생명길 교회 부 목사</Context>
            <ContactBox>
                <PhoneIcon ></PhoneIcon><ContactInfo>604-333-3333</ContactInfo>
            </ContactBox>
            <ContactBox>
                <MailIcon ></MailIcon><ContactInfo>life.way.generation.church@gmail.com</ContactInfo>
            </ContactBox>
        </ExplainationBox>
        </ColumBox>
    </>

    const menu = <>
     <Tab>
        {tab===Section.Pastor?  
        <SelectedTabButton>사역자</SelectedTabButton>:
        <TabButton onClick={()=>{setTab(Section.Pastor); }}>사역자</TabButton>}
            {tab===Section.Director?  
        <SelectedTabButton>디렉터</SelectedTabButton>:
        <TabButton onClick={()=>{setTab(Section.Director); }}>디렉터</TabButton>} 
        {tab===Section.Worship?  
            <SelectedTabButton>찬양팀</SelectedTabButton>:
            <TabButton onClick={()=>{setTab(Section.Worship); }}>찬양팀</TabButton>}
        </Tab>
    </>

    if(tab === Section.Director){
        form = <>
            <ColumBox  style={{width:"47%", height:"70vh",gridTemplateColumns:"repeat(2,1fr)",gridTemplateRows:"repeat(2,1fr)"}}>
               <ImageBox><Image src={profile}></Image><Name>송 준 민 디렉터(회장)</Name></ImageBox>
               <ImageBox><Image src={profile}></Image><Name>이 민 경 디렉터(부회장)</Name></ImageBox>
               <ImageBox><Image src={profile}></Image><Name>오 세 정 디렉터(임원)</Name></ImageBox>
               <ImageBox><Image src={profile}></Image><Name>이 준 형 디렉터(회계)</Name></ImageBox>
               

            </ColumBox>
        </>
    }else if(tab === Section.Worship){
        form = <>
        <ColumBox  style={{width: "70%", height:"105vh",gridTemplateColumns:"repeat(3,1fr)",gridTemplateRows:"repeat(3,1fr)"}}>
           <ImageBox><Image src={profile}></Image><Name>윤 종 훈 (찬양팀 리더)</Name></ImageBox>
           <ImageBox><Image src={profile}></Image><Name>이 민 경 (키 보 드)</Name></ImageBox>
           <ImageBox><Image src={profile}></Image><Name> 라 민 우(드럼)</Name></ImageBox>
           <ImageBox><Image src={profile}></Image><Name>오 현 석(베이스)</Name></ImageBox>
           <ImageBox><Image src={profile}></Image><Name>오 규 석(싱어)</Name></ImageBox>
           <ImageBox><Image src={profile}></Image><Name>최 민 주(싱어)</Name></ImageBox>
           <ImageBox><Image src={profile}></Image><Name>정 서 영(엔지니어)</Name></ImageBox>

           

        </ColumBox>
    </>
    }
    return(
        <>
        <LogoBox theme={{url:about}}>
        <MainTitle>섬기는 사람들</MainTitle>
        </LogoBox>
        {menu}
        {form}
        </>
    )
}