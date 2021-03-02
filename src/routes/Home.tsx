import styled from "styled-components"
import BKImage from '../images/MainBanner.jpg';
import Logo from '../images/logo.png';
export const MainBanner = styled.div`
    width: 100%;
    height: 70vh;
    background-image: url(${BKImage});
    background-position:center;
    background-size:cover;
    background-repeat:no-repeat;
`;
const MainLogo = styled.img`

display:block;
margin: 0 auto;
padding-top: 4%;
width: 50%;
height: 65%;
@media ${(props)=>props.theme.tablet}{
    width: 50%;
    height: 60%;
}
@media ${(props)=>props.theme.mobile}{
    width: 50%;
    height: 30%;
}
`
const ChurchTitle = styled.h1`
    color: white;
    font-size: 3rem;
    text-align: center;
    font-weight:bold;
    margin: 2%;
    @media ${(props)=>props.theme.tablet}{
    font-size: 2rem
}
@media ${(props)=>props.theme.mobile}{
    font-size: 1rem
}
`

export const Home =(): JSX.Element =>{
    return( 
    <>
    <MainBanner>
    <MainLogo src={Logo}/>
    <ChurchTitle>생명길 교회에 오신것을 환영합니다</ChurchTitle>
    </MainBanner>
    </>
    )
}