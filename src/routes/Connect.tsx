import styled from 'styled-components';
import { LogoBox } from './About';
import prayer from '../images/prayer.png';
import schedule from '../images/schedule.png';
import school from '../images/school.png';
import bible from '../images/bible.png';

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
        font-size: 40px;
        color: white;
        font-weight:bold;
        vertical-align:middle;
        text-align:center;
    `
    const IConContainer =styled.div`
        width: 80%;
        height: 50%;
        margin: 0 auto;
    `
    const Image = styled.img`
        width:100%;
        height:100%;
    `

    return(
        <>
        <LogoBox></LogoBox>
        <ColumnContainer>
        <Item>
            <IConContainer>
                <Image src={bible}/>
            </IConContainer>
        <Title>성경공부</Title>
        </Item>
        <Item></Item>

        <Item></Item>
        <Item></Item>

        </ColumnContainer>
        </>
    )
}