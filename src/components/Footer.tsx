import React from 'react';
import styled from 'styled-components';
import YouTubeIcon from '@material-ui/icons/YouTube';

const FooterContainer = styled.footer`
        width: 100%;
        margin-top: 40px;
        
        height: 15vh;
        padding:20px 0px;
        min-height:135px;
        background-color: #333333;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        column-gap: 20px;
        @media ${(props)=>props.theme.mobile}{
            column-gap: 0px;
        }
        
    `;
const ColumnContainer = styled.div`
    margin: auto auto;
    width: 70%;
    height: 100%;
    text-align: center;
    color: #555555;
`;

const ColumnTitle = styled.h2`
    padding-top: 10%;
    margin-bottom: 5%;
    color: white;
    font-weight:bold;
    font-size: 1.2rem;
    @media ${(props)=>props.theme.mobile}{
        font-size: 0.5rem;
       
        
    }
`
const ColumnsubTitle = styled.h3`
    margin-bottom: 5%;
    color: #a09a9a;
    font-size: 1.1rem;
    @media ${(props)=>props.theme.tablet}{
        font-size: 0.7rem;
    }
    @media ${(props)=>props.theme.mobile}{
        font-size: 0.3rem; 
    }
`

export const SiteBy = styled.a`
        font-size: 1.1rem;
        color:#777777;
        &:hover{
            color: white;
            cursor: pointer;
        }
        @media ${(props)=>props.theme.mobile}{
        font-size: 1rem; 
    }
`

export const Content = styled.p`
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 2%;
    @media ${(props)=>props.theme.tablet}{
        font-size: 0.7rem;
    }
    @media ${(props)=>props.theme.mobile}{
        font-size: 0.4rem; 
    }
`
export const ChangedYoutubeIcon = styled(YouTubeIcon)`
    &:hover{
        background-color:white;
        color:red;
        cursor: pointer;
    }
`


export const Footer = ()=> {
    
        return(

            <FooterContainer>
                <ColumnContainer>
                    <ColumnTitle>생명길 교회</ColumnTitle>
                    <ColumnsubTitle>Lifeway Generation Church</ColumnsubTitle>
                    <Content>Site By: <SiteBy href={"https://github.com/johnyun930"}>John Yun</SiteBy></Content>
                </ColumnContainer>
                <ColumnContainer>
                    <ColumnTitle>Address</ColumnTitle>
                    <Content>4830 Boundary Rd</Content>
                    <Content>Burnaby, BC V5R 2N8</Content>

                </ColumnContainer>
                <ColumnContainer>
                    <ColumnTitle>Info</ColumnTitle>
                    <Content>Tel:</Content>
                    <Content>604-333-333</Content>
                    
                </ColumnContainer>
                <ColumnContainer>
                    <ColumnTitle>Channel</ColumnTitle>
                    <Content><SiteBy href="https://www.youtube.com/channel/UCizDtprD82GRYylkU9Vz-LQ/videos"><ChangedYoutubeIcon fontSize="large"></ChangedYoutubeIcon></SiteBy></Content>
                </ColumnContainer>
            </FooterContainer>
           
        )
    }
