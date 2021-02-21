import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
        width: 100%;
        height: 20vh;
        background-color: #333333;
        display: grid;
        grid-template-columns: 1fr 1fr 1fr 1fr;
        column-gap: 20px;
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
    font-size: 1.2rem;
`
const ColumnsubTitle = styled.h3`
    margin-bottom: 5%;
    color: #a09a9a;
    font-size: 1.1rem;
`

const SiteBy = styled.a`
        font-size: 1.1rem;
        color:#777777;
        &:hover{
            color: white;
        }
`
const Content = styled.p`
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 2%;
`

export const Footer = ()=> {
    
        return(

            <FooterContainer>
                <ColumnContainer>
                    <ColumnTitle>생명길 교회</ColumnTitle>
                    <ColumnsubTitle>Lifeway Generation Church</ColumnsubTitle>
                    <Content>Site By: <SiteBy>John Yun</SiteBy></Content>
                </ColumnContainer>
                <ColumnContainer>
                    <ColumnTitle>Address</ColumnTitle>
                    <Content>4830 Boundary Rd</Content>
                    <Content>Burnaby, BC V5R 2N8</Content>

                </ColumnContainer>
                <ColumnContainer>
                    <ColumnTitle>Info</ColumnTitle>
                    <Content>Tel: 604-333-333</Content>
                </ColumnContainer>
                <ColumnContainer>
                    <ColumnTitle>Channel</ColumnTitle>
                </ColumnContainer>
            </FooterContainer>
            // <footer>
                
            // <div className="column">
            //     <h2>생명길 교회</h2>
            //     <h5>Site By <a href="https://www.facebook.com/johnyun930">John Yun</a></h5>
            // </div>
            //  <div className="column">
            //  <h3> address </h3>
            //  <p>4830 Boundary Rd</p>
            //  <p>Burnaby, BC V5R 2N8</p>
                
            // </div>
            //  <div className="column">
            //     <h3>Info</h3> 
            //     <p>Tel: 604-333-333</p>      
            // </div>
            // <div className="column">
            //     <h3>Channel</h3>       
            // </div>
            // </footer>
        )
    }
