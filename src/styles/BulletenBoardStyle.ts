import styled from 'styled-components';

export const HeadingContainer = styled.div`
    width: 70%;
    height: 5vh;
    margin: 0 auto;
    padding-bottom: 20px;
    display: grid;
    grid-template-columns: 80% 20%;
    @media ${(props)=>props.theme.mobile}{
       width: 85%;
        min-height: 8vh;
        grid-template-columns: 60% 40%;
        padding: 15px 0 0;

    }
    @media ${(props)=>props.theme.Smobile}{
        grid-template-columns: 60% 40%;

    }
    `


export const BulletenTitle = styled.h1`
    font-size: 40px;
    font-weight: bold;
    width: 100%;
    display: inline-block;
    @media ${(props)=>props.theme.mobile}{
        line-height: 30px;
        font-size: 30px;
    }
    @media ${(props)=>props.theme.Smobile}{
        font-size: 24px;
    }
`

export const ProfileImage = styled.img`
    width: 40px;
    height: 40px;
    border: 1px solid black;
    border-radius: 50%;
    display:inline-block;
`