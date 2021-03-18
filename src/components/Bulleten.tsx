import axios from 'axios';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { LogoBox } from '../routes/About';


export interface BulletenData{
    Id: number,
    title: string,
    composer: string,
    Date: string
}

interface BulletenContext{
    title: string,
    explaination:string,
    img:string
    list: BulletenData[] | [];
}

const Table = styled.table`
    width: 70%;
    height:100%;
    margin: 0 auto 30px;

`
const ColumnSize = {
    Id: "5%",
    title: "45%",
    composer: "30%",
    date:"20%"

}

const HeadColumn = styled.td`
    width: ${(props)=>props.theme.ColumnSize};
    font-size: 20px;
    background-color:yellowgreen;
    font-weight:bold;
    text-align: ${(props)=>props.theme.textAlign||"left"};
    
`


export const Bulleten = (props:BulletenContext)=>{
    const [list,setList] = useState<BulletenData|null>(null);

    useEffect(()=>{
    },[])


    return(
        <>
        <LogoBox></LogoBox>
        <Table>
            <tr>
                <HeadColumn theme={{ColumnSize:ColumnSize.Id, textAlign: "center"}}>ID</HeadColumn>
                <HeadColumn theme={{ColumnSize:ColumnSize.title, textAlign: "center"}}>제목</HeadColumn>
                <HeadColumn theme={{ColumnSize:ColumnSize.composer, textAlign: "center"}}>글쓴이</HeadColumn>
                <HeadColumn theme={{ColumnSize:ColumnSize.date, textAlign: "center"}}>작성일</HeadColumn>
            </tr>
        </Table>
        </>
    )
}