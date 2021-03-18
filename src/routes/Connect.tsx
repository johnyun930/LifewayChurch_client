import styled from 'styled-components';
import react from 'react';
import { LogoBox } from './About';

export const Connect = ():JSX.Element=>{
    const ColumnContainer = styled.div`
        width: 70%;
        height: 95vh;
        margin: 30px auto;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        grid-template-rows: repeat(2,1fr);
        grid-gap: 60px;
    `
    const Item = styled.div`
        width:100%;
        height:100%;
        background-color: yellowgreen;
        margin: 0px auto;
    `
    const Title = styled.h1`
        margin-top: 40%;
        font-size: 40px;
        color: white;
        font-weight:bold;
        vertical-align:middle;
        text-align:center;
    `

    return(
        <>
        <LogoBox></LogoBox>
        <ColumnContainer>
        <Item><Title>성경공부</Title></Item>
        <Item></Item>

        <Item></Item>
        <Item></Item>

        </ColumnContainer>
        </>
    )
}