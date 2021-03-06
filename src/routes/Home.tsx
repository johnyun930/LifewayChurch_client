import styled from "styled-components"
import BKImage from '../images/MainBanner.jpg';
import Logo from '../images/logo.png';
import bible from '../images/bibleClipArt.png';
export const MainBanner = styled.div`
    width: 100%;
    height: 90vh;
    position: relative;
background-image: url(${BKImage});
    background-size: cover;
    background-repeat:no-repeat;
`;
const MainLogo = styled.img`

display:block;
width: 100%;
height: 100%;
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
    position: absolute;
    bottom: 20px;
    left: 27%;
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
const Container = styled.div`
    width: 100%;
    min-height: 85vh;
    background-color: ${(props)=>props.theme.bkColor||"white"};
    border-bottom: 1px solid #eaeaea;

`

const Introduction = styled.div`
    margin: 0 auto ;
    width: 50%;
    min-height: 90%;
    text-align:center;
    padding-top: 4%;
    padding-bottom: 30px;
    @media ${(props)=>props.theme.mobile}{
        width: 80%;

}


`
const Text = styled.p`
    font-weight: ${(props)=>props.theme.fontWeight};
    margin-bottom: 40px;
    font-size: ${(props)=>props.theme.fontSize||"30px"};
    font-family:'NanumMyeongjo', serif;
    @media ${(props)=>props.theme.mobile}{
    line-height:1.3;
}
`

const Title = styled.h1`
    font-size: 40px;
    font-weight: bold;
    text-decoration: underline;
    text-align: center;
    display: block;
    margin-bottom: 50px;
`

const Image = styled.img`
    margin-top: 60px;
    width: 60%;
    height: 35%;
    margin-left: -40px;
    @media ${(props)=>props.theme.mobile}{
        margin-top: 40px;

}

`
const ServiceIntroduction = styled.div`
    width: 90%;
    height: 20%;
    text-align: center;
    margin: 79px auto;
    font-size: 40px;
    @media ${(props)=>props.theme.mobile}{
    font-size: 1rem;
    line-height: 1.5;
}

`
const PS = styled.p`
    font-size: 24px;
    margin-bottom: 20px;
    @media ${(props)=>props.theme.mobile}{
    font-size:1rem;
    line-height: 2;
}

`

export const Home =(): JSX.Element =>{

    return( 
    <>
    <MainBanner>
    {/* <MainLogo src={BKImage}/> */}
    <ChurchTitle>생명길 교회에 오신것을 환영합니다</ChurchTitle>
    </MainBanner>
    <Container>
    <Introduction>
        <Title>교회소개</Title>
        <Text >생명길 교회는</Text>
        <Text theme={{ fontSize: "40px",fontWeight:"bold"}}>주님의 복음을 </Text>
        <Text theme={{ fontSize: "40px",fontWeight:"bold"}}> 사랑하는</Text>
        <Text>교회입니다</Text>
        <Image src={bible}></Image>
        
    </Introduction>
    </Container>
    <Container theme={{bkColor:"#f9fafb"}}>
    <Introduction >
        <Title>예배 안내</Title>
        <ServiceIntroduction>통합예배: 주일 오전 10시</ServiceIntroduction>

        <ServiceIntroduction>주일학교: 주일 오전 10시 </ServiceIntroduction>

        <PS>현재 코로나로 인해 예배 모임을 가지고 있지 않습니다</PS>
        <PS>PS:예배 문의는 Contact address으로 문의주세요</PS>

    </Introduction>
    </Container>
    </>
    )
}