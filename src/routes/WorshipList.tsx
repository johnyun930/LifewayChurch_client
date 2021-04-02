import  { useContext, useEffect, useState } from 'react';
import axios,{AxiosResponse} from 'axios';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { DomainContext } from '../states/DomainContext';
import { UserInfoContext } from '../states/LoginContext';
import { LogoBox } from './About';
import logo from '../images/worship.jpg';
export interface IWorship{
    _id: string,
    title: string,
    date: Date,
    prayer: string,
    offering: string,
    startingHymm: string,
    bibleText: string,
    context?: string,
    videoURL?: string,
    endingHymm: string
}


const ListContainer = styled.div`
    max-width: 600px;
    min-height:100vh;
    margin: 0 auto;
    padding: 0 20px;
    @media ${(props)=>props.theme.tablet}{
        height:100%;
    }
`;

const ContentDate = styled.p`
    text-transform: uppercase;
    font-size: 13px;
    line-height: 1;
`


const ContentTitle = styled.h1`

    font-size: 36px;
    font-weight: bold;
    color: #222;
    margin: 20px 0;
    @media ${(props)=>props.theme.mobile}{
        line-height: 1.3;
        font-size: 30px;
    }
`
const Alert = styled(ContentTitle)`
    
    margin: 0px auto;
    padding-top: 30%;
    text-align: center;
`

const LinkedTitle = styled(Link)`
    text-decoration: none;
    &:hover{
    color: #42B6F3;
    transition: all 0.2s ease;
    }
`

const Content = styled.p`
    font-size: 18px;
    color: #818181;
    margin: 20px 0;
    line-height:2;
    @media ${(props)=>props.theme.mobile}{
        font-size: 16px;
    }
`

const LinkedButton = styled(Link)`
    display: inline-block;
    font-weight: 500;
    color: #a5a5a5;
    padding: 0 20px;
    border-radius: 18px;
    height: 36px;
    line-height: 36px;
    border: 1px solid #e2e2e2;
    font-size: 13px;
`

const Article = styled.article`
    width: 100%;
    margin: 50px 0;
`

const PageContainer = styled.div`
    text-align: center;
    height: 5vh;
    width: 70%;
    margin: 0px auto;
`
export const NumberBox = styled.div`
    
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-left: 1px;
    &:hover{
        border:1px solid #e0e0e0;
        color: #00c73c;
        cursor: pointer;

    }

`
export const SelectedNumberBox = styled.div`
    display: inline-block;
    font-weight:550;
    width: 20px;
    height: 20px;
    margin-left: 1px;
        border:1px solid #e0e0e0;
        color: #00c73c;
`

export const NextBox = styled.div`
    display: inline-block;
    height: 20px;
    margin-left: 1px;
    width:50px;
    &:hover{
      
        cursor: pointer;

    }
`
const ButtonBox = styled.div`
    height: 5vh;
    text-align: right;
`

const CreateButton = styled(LinkedButton)`
    font-weight: bold;
    color: #5a5353;
    font-size: 13px;
`
export const Title = styled.h1`
    font-size: 70px;
    font-family: "NotoSerifB";
    text-align: center;
    font-weight:bold;
    color: white;
    position:relative;
    top: 40%;
    @media ${(props)=>props.theme.mobile}{
        font-size: 50px;
    }
`

let getWorship =(domain:string)=> {return new Promise<AxiosResponse<IWorship[]>>((resolve,reject)=>{
    const  data = axios.get<IWorship[]>(`${domain}/worship`);
    if(data){
        resolve(data);
    }else{
        reject("axios Error");
    }
});
}


export const WorshipList = ():JSX.Element =>{
    const [worships,setWorships] = useState<IWorship[]|null>(null);
    const [page,setPage] = useState<number>(0);
    const [listnum,setListnum] = useState<number>(0);
    const domain = useContext(DomainContext);
    const {isAdmin} = useContext(UserInfoContext);
    useEffect(()=>{  
    
        getWorship(domain).then((data)=>{
            setWorships(data.data);
        });
    },[]);

      
    let pagelist: JSX.Element[] =[]; 
     let list: JSX.Element[][] = [];
    if(worships){
        let totalpage=worships.length/4
         for(let i=0; i<worships.length/4;i++){
             list.push([]);
            for(let j=(worships.length-1)-(i*4); j>(worships.length-1)-(4*(i+1));j--){
                 let data = worships[j];
                let date = new Date(data.date);
                list[i].push(
                     <Article >
             <ContentDate>{date.toDateString()}</ContentDate>
             <ContentTitle><LinkedTitle to={"/worship/"+data._id}>{data.title}</LinkedTitle></ContentTitle>
             <Content>{data.videoURL?"예배 영상":data.context?.slice(0,200) + "..."}</Content>
             <p>
                 <LinkedButton to={"/worship/"+data._id}>Read More</LinkedButton>
            </p>
             </Article>
                 );
                 if(j==0){
                     break;
                 }
             }
    }
    if(listnum!=0){
        pagelist.push(
           <NextBox onClick={()=>{
               setListnum(listnum-1);
               setPage((listnum-1)*5);
           }
           }>{"<이전"}</NextBox>
        )
    }

     for(let i=listnum*5;i<(listnum+1)*5;i++){
         if(i===page){
            pagelist.push(
                <SelectedNumberBox>{i+1}</SelectedNumberBox>                   
             )
         }else{
         pagelist.push(
            <NumberBox onClick={()=>{
                setPage(i);
            }}>{i+1}</NumberBox>                   
         )
        }
         if(i>=totalpage-1){
             break;
         }
         
     }
     if(listnum+5<totalpage){
        pagelist.push(
           <NextBox onClick={()=>{
               setListnum(listnum+1);
               setPage((listnum+1)*5);
           }
           }>{"다음>"}</NextBox>
        )
    }
    }else{
        list.push([]);
        list[0].push(<Alert>아직 등록된 예배가 없습니다</Alert>)
    }

return(
    <>
    <LogoBox url={logo}>
    <Title>예배와 찬양</Title>
    </LogoBox>
    <ListContainer>
        {isAdmin?<ButtonBox><CreateButton to="/worship/create">예배 작성하기</CreateButton></ButtonBox>:""}
    {worships?list[page]:"Loading....."}
    <PageContainer>
        {pagelist}
    </PageContainer>
    </ListContainer>
    </>
)
}