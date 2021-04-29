import { BorderColor, Delete } from "@material-ui/icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import styled from "styled-components"
import { LoginContext, UserInfoContext } from "../states/LoginContext"
import { ProfileImage } from "../styles/BulletenBoardStyle";
export interface CommentData{
    _id: string,
    reviewer: string,
    comment: string
}

const CommentArea = styled.div`
width: 70%;
margin: 20px auto;
border-bottom: 1px solid #eaeaea; 
padding-bottom: 20px;
 
 @media ${(props)=>props.theme.mobile}{
    width: 95%;
 }

`
const HeadArea =styled.div`
width:100%;
display:grid;
grid-template-columns: 60px 80% 15%;
margin-bottom: 5px;
@media ${(props)=>props.theme.laptop}{
    grid-template-columns: 60px 60% 30%;

 }
@media ${(props)=>props.theme.tablet}{
    grid-template-columns: 60px 50% 40%;

 }
@media ${(props)=>props.theme.mobile}{
    grid-template-columns: 60px 35% 50%;

 }
`
const IconArea = styled.div`
    width: 100%;
    text-align: right;
    font-size: 20px;
    @media ${(props)=>props.theme.mobile}{
        position: relative;
        top: 10px;
        text-align: right;


 }
 @media ${(props)=>props.theme.Smobile}{
        position: relative;
        top: 10px;
        text-align: left;


 }
`
const UserName = styled.h1`
font-size: 20px;
font-weight: bold;
position: relative;
top: 10px;
`
const Context = styled.p`
font-size: 18px;
line-height: 2;
padding-left: 60px;
word-wrap: break-word;
`

const CommentBox = styled.textarea`
align-self:center;
width: 95%;
height: 80%;
margin: 5px auto;
line-height: 150%;
resize: none;
border-radius: 5px;
border: 1px solid #eaeaea;

`

const Button = styled.button`
align-self:center;
width:100%;
height: 80%;
vertical-align:middle;
text-align:center;
background-color: transparent;
border: none;
font-size: 28px;
color: ${(props)=>props.theme.buttoncolor};
@media ${(props)=>props.theme.mobile}{
     
    font-size: 20px;

 }
`
const CommentContainer = styled.div`
width: 70%;
height: 150px;
margin: 20px auto 50px;
border: 2px solid #eaeaea;
border-radius: 10px;
display: grid;
grid-template-columns: 85% 10%;
justify-content: center;
@media ${(props)=>props.theme.mobile}{
    width: 90%;
    grid-template-columns: 75% 20%;
}
`
const IconBox = styled.p`
    display:inline-block;
    margin-left: 10px;
    padding-left: 10px;
    font-size:16px;
    border-left: 1px solid #eaeaea;
    &:hover{
        cursor: pointer;
        text-decoration:underline;
    }
`
interface UpdateData extends CommentData {
    index: number
}

export const Comment = (props:{url:string,Id:string}): JSX.Element=>{
    const [review,setReview] = useState<CommentData[]|null>(null);
    const [comment,setComment] = useState<string>("");
    const {login} = useContext(LoginContext);
    const {userName,level} = useContext(UserInfoContext);
    const history = useHistory();
    const [update,setUpdate] = useState(false);
    const [updateData,setUpdateData] = useState<UpdateData>();
    
    useEffect(()=>{
       axios.get(props.url+"/review/"+props.Id,{withCredentials:true}).then((response)=>{
           setReview(response.data);
       })
      
    },[]);
    const reviewWriting: JSX.Element =  
    <CommentContainer>
    <CommentBox value ={comment} onChange={(e)=>{
        setComment(e.target.value);
    }}></CommentBox>
    <Button onClick={()=>{
        if(!login){
            alert("please Login first to write the comment");
            history.push('/login');
        }else if(comment===""){
            alert("please write down the comment please");
        }else{
            const newReview = {postingId:props.Id,reviewer:userName,comment}
            axios.post(props.url+"/review",newReview,{withCredentials:true}).then((response)=>{
                if(response.data.errMessage){
                    alert(response.data.errMessage);
                }else{
                    let newData = []
                    if(review){
                     newData = [...review,response.data];
                    }else{
                        newData = [response.data];
                    }
                    setReview(newData);
                    setComment("");
                }
            });
        }
    }}>Post</Button>
</CommentContainer>

    let list:JSX.Element[] = [];

    if(review){
        if(!update){
        review.forEach((value,index)=>{
            list.push(
        <CommentArea>
            <HeadArea>
                <ProfileImage></ProfileImage>
        <UserName>{value.reviewer}</UserName>
        {value.reviewer===userName||level===4?<IconArea>
               {value.reviewer===userName?<IconBox onClick={()=>{
                   setUpdate(!update);
                   setUpdateData({...value,index});
                }
               }>Modify</IconBox>:""}
               <IconBox onClick={()=>{
                   const doubleCheck = window.confirm("Do you want to delete this post?");
                    if(doubleCheck){
                        axios.delete(props.url+"/review/"+value._id,{withCredentials:true}).then((response)=>{
                            if(response.data.errMessage){
                                alert(response.data.errMessage);
                            }else{
                                let newData = [...review];
                                newData.splice(index,1);
                                setReview(newData);
                            }
                        })
                    }
               }}>Delete</IconBox>

        </IconArea>:""}
        </HeadArea>
        <Context>{value.comment}</Context>    
            </CommentArea>
            )
        });
    }else{
        list.push(
            <CommentContainer>
    <CommentBox value ={updateData?.comment} onChange={(e)=>{
        if(updateData){
        setUpdateData({...updateData,comment:e.target.value});
        }
    }}></CommentBox>
    <Button onClick={()=>{
        if(!login){
            alert("please Login first to write the comment");
            history.push('/login');
        }else if(updateData?.comment===""){
            alert("please write down the comment please");
        }else{
            axios.patch(props.url+"/review",updateData).then((response)=>{
                if(response.data.errMessage){
                    alert(response.data.errMessage);
                }else{
                    let newReview = review;
                    if(updateData){
                    newReview[updateData.index!] = {...newReview[updateData.index],comment:updateData.comment};
                    }
                    setReview(newReview);
                    setUpdateData(undefined);
                    setUpdate(false);

                }
            });
        }
    }}>수정</Button>
    </CommentContainer>
        )
    }
    }else{
        <div>아직 댓글이 없습니다.</div>
    }

    return(
        <>
        {list}
       {!update?reviewWriting:<></>};
        </>
    )
}