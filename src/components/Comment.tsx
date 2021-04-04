import { BorderColor, Delete } from "@material-ui/icons";
import axios from "axios";
import { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router"
import styled from "styled-components"
import { LoginContext, UserInfoContext } from "../states/LoginContext"

export interface CommentData{
    _id: string,
    reviewer: string,
    comment: string
}

const CommentArea = styled.div`
width: 60%;
margin: 20px auto;
border-bottom: 1px solid #eaeaea; 
padding-bottom: 20px;


`
const HeadArea =styled.div`
width:100%;
display:grid;
grid-template-columns: 80% 20%;
margin-bottom: 5px;
`
const IconArea = styled.div`
    width: 100%;
    text-align: right;
    padding-right: 40px;
    font-size: 20px;
    
`
const UserName = styled.h1`
margin-left: 20px;
font-size: 18px;
font-weight: bold;
margin-bottom: 10px;
`
const Context = styled.p`
font-size: 18px;
line-height: 2;
margin-left: 20px;
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
`
const CommentContainer = styled.div`
width: 60%;
height: 150px;
margin: 20px auto 50px;
border: 2px solid #eaeaea;
border-radius: 10px;
display: grid;
grid-template-columns: 70% 20%;
justify-content: center;
@media ${(props)=>props.theme.mobile}{
    width: 95%;
    padding-right: 10px;
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
    const {userName,isAdmin} = useContext(UserInfoContext);
    const history = useHistory();
    const [update,setUpdate] = useState(false);
    const [updateData,setUpdateData] = useState<UpdateData>();
    
    useEffect(()=>{
       axios.get(props.url+"/review/"+props.Id).then((response)=>{
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
            axios.post(props.url+"/review",newReview).then((response)=>{
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
    }}>등록</Button>
</CommentContainer>

    let list:JSX.Element[] = [];

    if(review){
        if(!update){
        review.forEach((value,index)=>{
            list.push(
        <CommentArea>
            <HeadArea>
        <UserName>{value.reviewer}</UserName>
        {value.reviewer===userName||isAdmin?<IconArea>
               {value.reviewer===userName?<IconBox onClick={()=>{
                   setUpdate(!update);
                   setUpdateData({...value,index});
                }
               }>Modify</IconBox>:""}
               <IconBox onClick={()=>{
                   const doubleCheck = window.confirm("Do you want to delete this post?");
                    if(doubleCheck){
                        axios.delete(props.url+"/review/"+value._id).then((response)=>{
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