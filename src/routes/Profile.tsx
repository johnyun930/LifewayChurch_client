import { Accessibility, DomainDisabled, Info, Settings } from "@material-ui/icons"
import { useContext, useState } from "react"
import styled from "styled-components"
import { UserInfoContext } from "../states/LoginContext"
import { Label,Input, SubmitButton } from "../styles/FormStyle"
import User from '../images/user.png'
import axios from "axios"
import { DomainContext } from "../states/DomainContext"

const ProfileContainer = styled.div`
width: 70%;
height: 90vh;
margin: 0 auto 30px;
display: grid;
grid-template-columns: 35% 65%;
justify-content: center;
border: 2px solid #9e8fa0;
`

const InfoIcon = styled(Info)`
    align-self: center;
    font-size: 26px;
    text-align:right;
    color:white;
`
const SettingIcon = styled(Settings)`
    align-self: center;

    font-size: 26px;
    text-align:right;
    color:white;

`
const AccessIcon = styled(Accessibility)`
    align-self: center;

    font-size: 26px;
    text-align:right;
    color:white;

`
const Option = styled.p`
    align-self: center;
    font-size: 26px;
    text-align: left;
    color:white;

`

const Sidebar = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    margin: 0 auto;
    grid-gap: 25px;
    grid-template-rows: 50% 7% 7% 7%;
    align-self: center;
    background-color: #9e8fa0;
    

`
const UserImage = styled.div`
    width: 80%;
    height: 100%;

`

const ImageSection = styled.div`
    width: 70%;
    height: 91%;
    text-align: center;
    margin: 0 auto;
    padding-top:50px;
`


const OptionButton = styled(ImageSection)`
    width: 100%;
    display: grid;
    grid-template-columns: 10% 50%;
    justify-content: center;
    grid-gap: 10px;
    &:hover{
        cursor: pointer;
        font-weight:bold;
    }
    

`

const InfoContainer = styled.div`
    align-self: center;
    margin: 0 auto;
    width: 90%;
    height: 80%;
    
`
const Heading = styled.h1`
    font-size: 40px;
    font-weight: bold;
    margin: 20px 0 30px 20px;

`
const SecondHeading = styled(Heading)`
    
    margin-top: 50px;

`

const Form = styled.div`
    display: grid;
    width: 85%;
    height: 70%;
    grid-template-columns: repeat(2,1fr);
    grid-template-rows: repeat(3,1fr);

    margin-left: 20px;

`
const InputBox = styled.div`
    width: 80%;
    height: 60%;
    margin-top: 20px ;
`

const ImageBox = styled.div`
    width: 100%;
    height: 90%;
`

const Image = styled.img`
    width:250px;
    height:250px;
`
const Name = styled.h4`
    margin-top: 20px;
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    color: white;
`
const Status = styled.div`
    width: 90%;
    height: 7%;
    margin: -1px 20px;
    display: grid;
    grid-gap: 25px;
    grid-template-columns: 1fr 3fr 1fr;
    justify-content: center;
`

const CrossLine = styled.hr`
  width: 100%;
  height: 0px;
  display: inline-block;
  border: 1px solid black;
  align-self: center;
`
const SpecialLine = styled(CrossLine)`
    border: 1px solid #D4BDAC;
`

const Text = styled.p`
    align-self: center;
    font-size: 18px;
    font-weight: bold;
    color: #D4BDAC;

`
const SubText = styled(Text)`
    color: darkgrey;
    font-weight: normal;
    align-self: center;
    font-size: 16px;

`


export const Profile = (): JSX.Element =>{
        const {firstName,lastName,userName,isAdmin,setUser} = useContext(UserInfoContext);
        const domain = useContext(DomainContext);
        const [updatefirstName,setUpdateFirstName] = useState(()=>{
            const name = firstName;
            return name;
        });
        const [updatelastName,setUpdateLastName] = useState(()=>{
            const name = lastName;
            return name;
        });
      
        let Info =  
        <>
        <Heading>Profile</Heading>
        <Form>
           <InputBox>
            <Label>User Name</Label>
            <Input value={userName} disabled/>
           </InputBox>
           <InputBox></InputBox>
           <InputBox>
            <Label>First Name</Label>
            <Input value={updatefirstName} onChange={(e)=>{
            }} />
           </InputBox>
           <InputBox>
            <Label>Last Name</Label>
            <Input value={updatelastName} onChange={(e)=>{
            }}/>
           </InputBox>
           <InputBox>
           <SubmitButton onClick={(e)=>{
               e.preventDefault();
             

               axios.patch(`${domain}/signup`,{userName}).then((response)=>{
                    if(response.data.errMessage){
                        alert(response.data.errMessage);
                    }else{

                    }
               })

           }} style={{margin: 0}}>Save Info</SubmitButton>
           </InputBox>
           <InputBox></InputBox>
           

        </Form>
    </>;

    let Activity = <>  <Heading>My Post</Heading>
    <Status><Text>전체 게시글</Text> <SpecialLine></SpecialLine> <Text>22 Post</Text></Status>
    <Status><SubText>Q T</SubText> <CrossLine></CrossLine> <SubText>22 Post</SubText></Status>
    <Status><SubText>자유 게시판</SubText> <CrossLine></CrossLine> <SubText>22 Post</SubText></Status>               
    {isAdmin?<Status><SubText>설교</SubText> <CrossLine></CrossLine> <SubText>22 Post</SubText></Status>:<></>}
    {isAdmin?<Status><SubText>주일학교</SubText> <CrossLine></CrossLine> <SubText>22 Post</SubText></Status>:<></>}
    <SecondHeading>My Comment</SecondHeading>
    <Status><Text>전체 댓글</Text> <SpecialLine></SpecialLine> <Text>22 Post</Text></Status>
    <Status><SubText>Q T</SubText> <CrossLine></CrossLine> <SubText>22 Post</SubText></Status>
    <Status><SubText>자유 게시판</SubText> <CrossLine></CrossLine> <SubText>22 Post</SubText></Status>               
    {isAdmin?<Status><SubText>설교</SubText> <CrossLine></CrossLine> <SubText>22 Post</SubText></Status>:<></>}
    {isAdmin?<Status><SubText>주일학교</SubText> <CrossLine></CrossLine> <SubText>22 Post</SubText></Status>:<></>}</>
    return(
        <ProfileContainer>
            <Sidebar>
                <ImageSection>
                    <ImageBox>
                        <Image src={User}></Image>
                        <Name>Welcome, {firstName} 성도님</Name>
                    </ImageBox>
                </ImageSection>
                <OptionButton>
                    <InfoIcon></InfoIcon><Option>DashBoard</Option>
                </OptionButton>
                <OptionButton>
                    <AccessIcon></AccessIcon><Option>My Activities</Option>
                </OptionButton>
                <OptionButton>
                    <SettingIcon></SettingIcon><Option>Settings</Option>
                </OptionButton>
            </Sidebar>
            <InfoContainer>
                {Activity}
            </InfoContainer>
        </ProfileContainer>

    )
}