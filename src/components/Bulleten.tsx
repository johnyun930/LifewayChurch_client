import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import { LogoBox } from '../routes/About';
import { NextBox, NumberBox, SelectedNumberBox } from '../routes/WorshipList';
import { DomainContext } from '../states/DomainContext';
import CreateIcon from '@material-ui/icons/Create';
import { LoginContext, UserInfoContext } from '../states/LoginContext';
import {SubmitButton} from '../styles/FormStyle';
import {HeadingContainer,BulletenTitle,ProfileImage} from '../styles/BulletenBoardStyle';

export interface BulletenData{
    _id: string,
    id: number,
    bibleText?: string,
    context: string,
    title: string,
    composer: string,
    date: string,
    notice: boolean
}

interface BulletenContext{
    title: string,
    explaination:string,
    img:string
    path: string,
    free?: boolean 
   

}

const BulletenContainer = styled.div`
    width: 100%;
    min-height: 100vh;
`

const Table = styled.table`
    width: 70%;
    height:100%;
    margin: 0 auto 30px;
    border-top: 1px solid black;
    border-spacing: 2px;
  border-collapse: separate;
    @media ${(props)=>props.theme.mobile}{
        width: 90%;
        margin-bottom: 15px;
    }

`
const ColumnSize = {
    Id: "4%",
    title: "30%",
    composer: "10%",
    date:"10%"

}

const NoticeBox = styled.div`    
    width: 50px;
    height: 15px;
    border: 1px solid ${(props)=>props.theme.maincolor} ;
    border-radius: 15px;
    background-color: ${(props)=>props.theme.buttoncolor} ;
    color: #fcfcfc;
    font-size: 12px;
    margin: 0 auto;
    padding-top: 5px;
    font-weight:bold;
    @media ${(props)=>props.theme.mobile}{
        width: 30px;
    height: 18px;
    font-size: 8px;
        
    }

`;

    interface ColumnProps{
        columnSize: string
        fontWeight?: string,
        textAlign?: string,
        decoration?: boolean
    }


const Column = styled.td<ColumnProps>`
    width: ${(props)=>props.theme.ColumnSize};
    font-size: 16px;
    height: 40px;
    font-weight:${(props)=>props.fontWeight||"normal"};
    text-align: ${(props)=>props.textAlign||"left"};
    vertical-align:middle;
    border-bottom: 1px solid #f2f2f2;
    white-space: nowrap; 
     overflow: hidden;
    text-overflow: ellipsis; 
    &:hover{
        text-decoration: ${(props)=>props.decoration?"underline":"none"};
        cursor:  ${(props)=>props.decoration?"pointer":""}
    }
    @media ${(props)=>props.theme.mobile}{
        font-size: 14px;
    }
    @media ${(props)=>props.theme.Smobile}{
        font-size: 12px;
    }
   
    
`
const PageContainer = styled.div`
    width: 70%;
    background-color: #f9f9f9;
    height: 40px;
    padding-top: 16px;
    font-weight:400px;
    text-align: center;
    margin: 0px auto 40px;
    
    @media ${(props)=>props.theme.mobile}{
        width: 100%;
    }
`

const ButtonContainer = styled.div`
    width: 100%;
    padding-left: 45%;
    @media ${(props)=>props.theme.mobile}{
        height: 30px;
        padding-left: 0;
        padding-right: 5px;
    }
`

const CustomLink = styled(Link)`
    width: 100%;
    height:100%auto;
    margin: 0;
    padding: 0;
    
`


const getDateFormat = (date: Date)=>{
    if(date.getMonth()<9){
        return date.getFullYear()+ "-0" + (date.getMonth()+1) + "-" + date.getDate();

    }else{
    return date.getFullYear()+ "-" + (date.getMonth()+1) + "-" + date.getDate();
    }
} 

export const Bulleten = (props:BulletenContext)=>{
    const [data,setData] = useState<BulletenData[]|null>(null);
    const domain = useContext(DomainContext);
    const [columnNum,setColumnNum] = useState(15);
    const [pageNum,setPageNum] = useState(1);
    const [pagelist,setPageList] = useState(0);
    const {login}= useContext(LoginContext);
    const {isAdmin} = useContext(UserInfoContext);
    const history = useHistory(); 
    useEffect(()=>{
        axios.get(`${domain+props.path}`).then((response)=>
            setData(response.data.reverse())
        )
    },[]);
    let pageNumList: JSX.Element[] = [];    
    let list: JSX.Element[] = [];
    if(data&&data.length){
        let totalpageNum = data.length/columnNum;
        let noticeCount = 0;
         data.forEach((value: BulletenData,index)=>{
            if(value.notice&&noticeCount<5){
                list.splice(0+noticeCount,0,
                    <tr>
                        <Column columnSize={ColumnSize.Id} textAlign={"center"}><NoticeBox>공지</NoticeBox></Column>
                        <Link to={`/connect${props.path+"/"+value._id}`}><Column columnSize={ColumnSize.title} textAlign={"center"} decoration={true} >{value.title}</Column></Link> 
                        <Column columnSize={ColumnSize.composer} textAlign={"center"}>{value.composer}</Column>
                        <Column columnSize={ColumnSize.Id} textAlign={"center"}>{getDateFormat(new Date(value.date))}</Column>
                    </tr>
                    );
                    noticeCount++;
            }
            list.push(
            <tr>
                <Column columnSize={ColumnSize.Id} textAlign={"center"}>{value.id}</Column>
                        <Link to={`/connect${props.path+"/"+value._id}`}><Column columnSize={ColumnSize.title} textAlign={"center"} decoration={true} >{value.title}</Column></Link> 
                        <Column columnSize={ColumnSize.composer} textAlign={"center"}>{value.composer}</Column>
                        <Column columnSize={ColumnSize.Id} textAlign={"center"}>{getDateFormat(new Date(value.date))}</Column>
            </tr>
            );
           
        });
        if(pagelist>0){
            pageNumList.push(<NextBox onClick={()=>{
                setPageNum(((pagelist*10)-10)+1);
                setPageList(pagelist-1);
            }}>이전</NextBox>);
        }
        for(let i=pagelist*10; i<(pagelist+1)*10;i++){
            if(i+1===pageNum){
                pageNumList.push(<SelectedNumberBox>{i+1}</SelectedNumberBox>);
            }else{
                pageNumList.push(<NumberBox onClick={(e)=>{
                    setPageNum(i+1);
                }}>{i+1}</NumberBox>)
            }
            if(i+1>totalpageNum){
                break;
            }
        }
        if((pagelist+1)*10<totalpageNum){
            pageNumList.push(<NextBox onClick={()=>{
                setPageNum(((pagelist+1)*10)+1);
                setPageList(pagelist+1);
            }}>다음</NextBox>);
        }
    }else{
        list.push(<tr><td></td><td>"아직 등록된 글이 없습니다"</td><td></td><td></td></tr>);

    }
    return(
        <BulletenContainer>
        <HeadingContainer>
        <BulletenTitle>{props.title}</BulletenTitle>
        <ButtonContainer><CustomLink  onClick={(e:any)=>{
            if(!login){
                e.preventDefault();
                alert("Please Login to create the post. 죄송합니다. 먼저 로그인 해주시길 바랍니다.");
                history.push('/login');
            }else if(!isAdmin&&!props.free){
                e.preventDefault();
                alert("Sorry. Only Administrater can create the post in this bulleten. 죄송합니다. 이 곳은 관리자만이 글을 작성하실수 있습니다." );
            }
        }} to ={'/connect'+props.path+"/create"}><SubmitButton> 글쓰기</SubmitButton></CustomLink></ButtonContainer>
        </HeadingContainer>
        <Table>
            <tr>
                <Column columnSize={ColumnSize.Id} fontWeight={"bold"} textAlign={"center"}></Column>
                <Column columnSize={ColumnSize.title} fontWeight={"bold"} textAlign={"center"}>제목</Column>
                <Column columnSize={ColumnSize.composer} fontWeight={"bold"} textAlign={"center"}>글쓴이</Column>
                <Column columnSize={ColumnSize.date} fontWeight={"bold"} textAlign={"center"}>작성일</Column>
            </tr>
            {list.slice((pageNum-1)*columnNum,pageNum*columnNum)}
        </Table>
       
        <PageContainer>{pageNumList}</PageContainer>
        </BulletenContainer>
    )
}