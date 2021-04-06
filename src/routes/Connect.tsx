import styled from 'styled-components';
import { LogoBox } from './About';
import prayer from '../images/prayer.png';
import schedule from '../images/schedule.png';
import school from '../images/school.png';
import bible from '../images/bible.png';
import { Link } from 'react-router-dom';
import logo from '../images/connect.jpg';
import {Title as MainTitle} from '../routes/WorshipList';
export const Connect = ():JSX.Element=>{
    const ColumnContainer = styled.div`
        width: 70%;
        height: 95vh;
        margin: 30px auto;
        display: grid;
        grid-template-columns: repeat(2,1fr);
        grid-template-rows: repeat(2,1fr);
        grid-gap: 60px;

        @media ${(props)=>props.theme.mobile}{
            width: 90%;
            grid-gap: 30px;
            height: 40vh;

        }

    `
    const Item = styled.div`
        width:100%;
        height:100%;
        margin: 0px auto;
        background-color:#e8fcff;
        border: 3px solid #eaeaea;
        &:hover{
            background-color: #dfdefd;
            cursor: pointer;
        }
        @media ${(props)=>props.theme.mobile}{
            width: 120px;
            height: 120px;

        }
      
    `
    const Title = styled.h1`
        font-size: 40px;
        color: #000000;
        font-weight:bold;
        vertical-align:middle;
        text-align:center;
        @media ${(props)=>props.theme.mobile}{
           font-size: 18px;

        }
    `
    const IConContainer =styled.div`
        align-self:center;
        width: 20%;
        height: 30%;
        margin: 15% auto 30px;
        text-align: center;
    `
    const Image = styled.img`
        width:100%;
        height:100%;
    `

    return(
        <>
        <LogoBox url={logo}>
            <MainTitle style={{color: "#796557"}}>교제와 나눔</MainTitle>
        </LogoBox>
        <ColumnContainer>
        <Link to="/connect/biblestudy">
        <Item>
            <IConContainer>
                <Image src={bible}/>
            </IConContainer>
        <Title>성 경 공 부</Title>
        </Item>
        </Link>
        <Link to="/connect/childschool">
        <Item>

        <IConContainer>
                <Image src={school}/>
            </IConContainer>
        <Title>주 일 학 교</Title>
        </Item>
        </Link>

        <Link to="/connect/qt">
        <Item>
        <IConContainer>

                <Image src={prayer}/>
            </IConContainer>
        <Title>{"Q T"}</Title>
        </Item>
        </Link>
        <Link to="/connect/bulletenboard">
        <Item>
        <IConContainer>
                <Image src={schedule}/>
            </IConContainer>
        <Title>자 유 게 시 판</Title>
        </Item>
        </Link>

        </ColumnContainer>
        </>
    )
}