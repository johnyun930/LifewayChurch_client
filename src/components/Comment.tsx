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
grid-template-columns: 85% 10%;
justify-content: center;
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

export const Comment = (props:{url:string,Id:string}): JSX.Element=>{
    const [review,setReview] = useState<CommentData[]|null>(null);
    const [comment,setComment] = useState<string>("");
    const {login} = useContext(LoginContext);
    const {userName,isAdmin} = useContext(UserInfoContext);
    const history = useHistory();
    
    useEffect(()=>{
       axios.get(props.url+"/review/"+props.Id).then((response)=>{
           console.log(response);
           setReview(response.data);
       })
      
    },[]);
    let list:JSX.Element[] = [];
    if(review){
        review.forEach((value,index)=>{
            list.push(
        <CommentArea>
            <HeadArea>
        <UserName>{value.reviewer}</UserName>
        {value.reviewer===userName||isAdmin?<IconArea>
               {value.reviewer===userName?<IconBox>Modify</IconBox>:""}
               <IconBox onClick={()=>{
                   const doubleCheck = window.confirm("Do you want to delete this post?");
                    if(doubleCheck){
                        axios.delete(props.url+"/review/"+value._id).then((response)=>{
                            if(response.data.errMessage){
                                alert(response.data.errMessage);
                            }else{
                                let newData = [...review];
                                console.log(newData);
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
        })
    }

    return(
        <>
        {list}
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
                            console.log(response.data);
                            if(review){
                             newData = [...review,response.data];
                             console.log(newData);
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
        </>
    )
}