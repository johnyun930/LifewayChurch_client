import React, { useContext, useEffect, useRef,useState } from "react";
import ReactDom from 'react-dom';
import styled from 'styled-components'
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Form, Input, SubmitButton } from "../styles/FormStyle";
import { BorderBottom } from "@material-ui/icons";
import user from '../images/user.png';
import { Profile } from "../routes/Profile";
import { Button } from "@material-ui/core";
import { UserInfoContext } from "../states/LoginContext";
import axios from "axios";
import { useHistory } from "react-router";
import { DomainContext } from "../states/DomainContext";
const DivContainer= styled.div`
width: 100%;
height: auto;
margin: 30px auto;
`

const Container = styled.div`
width: 50%;
min-height: auto;
margin: 0 auto;
margin-bottom: 30px;
`

const UploadContainer =styled(Container)`
    border: 1px solid #eaeaea;
    min-height: 70vh;
    border-radius: 20px;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
`
const ImageContainer = styled.div`
  width: 350px;
  height: 350px;
  margin: 0 auto;
  outline: 2px dashed grey;
  border: 2px solid #eaeaea ;
  outline-offset:-10px;  
    text-align: center;

    transition: all .15s ease-in-out;
  &:hover{
    cursor:pointer;
  }
`


const Title = styled.h1`
text-align: center;
color: white;
font-size: 2rem;
font-family: Damion;
font-weight:bold;
margin-bottom: 30px;
`

const Crop = styled(Cropper)`
    width: 100%;
    height: auto;
    margin: 0 auto;
    margin-bottom: 30px;
    object-fit:fill;
`

interface PortalElement{
  children: JSX.Element
}

export const Portal = (props:PortalElement)=>{
  const globalPortal = document.getElementById("global");
  return ReactDom.createPortal(props.children,globalPortal!);
}

export const Upload = styled(Input)`
 display: none;
  `
export const Label = styled.label`
  display: block;
  width: 30%;

  height: 30px;
  line-height: 30px;
  border-radius: 5px;
    border: 1px solid black;
    margin: 20px auto;
    text-align: center;
    background-color: ${(props)=>props.theme.buttoncolor};
    color: white;
    font-size: 16px;
    font-weight: bold;
    &:hover{
      cursor: pointer;
    }
`
const ButtonBox = styled.div`
  width: 90%;
  height: 40px;
  text-align: right;
  margin: 0 auto;

`

export const ImageCrop = ():JSX.Element =>{
    const [image,setImage] = useState<any>(null);
    const [popup,isPopup] = useState(false);
    const imagetype = /^image/;
    const history = useHistory();
 
    useEffect(()=>{
      if(popup){
        document.getElementById('global')!.style.display = "block";
      }else{
      document.getElementById('global')!.style.display = "none";
      }
    },[popup]);


    return(
    <>
  <UploadContainer>
    <Title style={{color:"black", borderBottom: "1px solid #eaeaea"}}>Profile Image Upload</Title>
    <ImageContainer>

    </ImageContainer>
    <Label htmlFor="file">Choose a Image</Label>
    <Upload id="file" onChange={(e)=>{
      e.preventDefault();
      const fileupload = e.target.files;
      if(fileupload){
      if(fileupload.length>1){
        alert("Please Select only one image Please");
      }else if(!imagetype.test(fileupload[0].type)){
        alert("Please Upload Image file only"
        );
      }else{
        const file = fileupload[0]
        let reader = new FileReader();
        reader.onloadend = ()=>{
          setImage(reader.result);
          isPopup(true);
        }
        
        reader.readAsDataURL(file);
      }
    }

}} type="file"></Upload>
    <ButtonBox>
      <SubmitButton onClick={(e)=>{
        const confirm = window.confirm("Do you want to skip setting the profile?");
        if(confirm){
          history.replace('/');
        }
      }} style={{width:"20%", display:"inline", position:"relative",right:"10px"}}>Skip</SubmitButton>
    </ButtonBox>
  </UploadContainer>
  {image?<ProfileUpload isPopup={isPopup} image={image}></ProfileUpload>:""}

</>
  )
}

interface Imageprops{
  image: string;
  isPopup:  React.Dispatch<React.SetStateAction<boolean>>
}

export const ProfileUpload= (props:Imageprops): JSX.Element => {
  const user = useContext(UserInfoContext);
  console.log(user);
  const cropperRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const domain = useContext(DomainContext);
  const history = useHistory();
   function onCrop(){
    const imageElement: any = cropperRef?.current;
    const cropper: any = imageElement?.cropper;
    const drawing = canvasRef.current?.getContext("2d");
    drawing?.drawImage(cropper.getCroppedCanvas(),10,10);
  const image = cropper.getCroppedCanvas().toDataURL('image/jpeg', 1.0);
  let blobBin = atob(image.split(',')[1]);
  let array = [];
  for(let i=0; i<blobBin.length;i++){
    array.push(blobBin.charCodeAt(i));
  }
  let file = new Blob([new Uint8Array(array)], {type: 'image/png'});
    let formData = new FormData();
    formData.append("userName",user.userName);
    formData.append("file",file,`${user.userName}.png`);
    axios.post(`${domain}/auth/profile`,formData,{withCredentials:true, headers: {
      'Content-Type': 'multipart/form-data'
    }}).then((response)=>{
      if(response.data.err){
        alert(response.data.err);
      }else{
        console.log("hello");
        user.setUser({...user,profile:response.data.profile});
        props.isPopup(false);
        history.replace('/profile');
        window.location.reload();
      }
    })
  };
 
  function cancelPortal(){
    const confirm = window.confirm("Do you want to cancel setting the profile?");
    if(confirm){
      props.isPopup(false);
    };
  }

  return (
    <Portal>
         <DivContainer>
    <Title>Upload Your Awesome/Pretty Photo</Title>
    <Container>
    <Crop
    width="100%"
    height="100%"
      src={props.image}
      
      initialAspectRatio={ 5/ 5}
      guides={false}
      dragMode={"move"}
      ref={cropperRef}
      movable={false}
      background={false}
      zoomable={false}
      modal={false}
      cropBoxResizable={false }
    />
    </Container>
   <SubmitButton onClick={onCrop} style={{width:"20%"}} center={true}>Save Image</SubmitButton>
   <ButtonBox>
   <SubmitButton  onClick={cancelPortal} style={{width:"10%", display:"inline", position:"relative",right:"10px"}}>Cancel</SubmitButton>
   </ButtonBox>
    </DivContainer>
    </Portal>
 
  );
};

