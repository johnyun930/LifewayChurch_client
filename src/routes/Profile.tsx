import { Accessibility, DomainDisabled, Info, Settings } from "@material-ui/icons"
import { useContext, useEffect, useState } from "react"
import styled from "styled-components"
import { LoginContext, UserInfoContext } from "../states/LoginContext"
import { Label,Input, SubmitButton } from "../styles/FormStyle"
import User from '../images/user.png'
import axios from "axios"
import { DomainContext } from "../states/DomainContext"
import { useHistory } from "react-router"
import { size } from "../styles/theme"

const ProfileContainer = styled.div`
width: 70%;
min-height: 90vh;
margin: 0 auto 30px;
display: grid;
grid-template-columns: 35% 65%;
justify-content: center;
border: 2px solid #9e8fa0;

@media ${(props)=>props.theme.tablet}{
    width: 90%;
}
@media ${(props)=>props.theme.mobile}{
    width: 100%;
    height: auto;
    min-height: 130vh;
    margin-bottom:0px;
    grid-template-rows: 50vh 60%;
    grid-template-columns: none;
    justify-content: initial;
}
`

const InfoIcon = styled(Info)`
    align-self: center;
    font-size: 26px;
    text-align:right;
    color:white;
    @media ${(props)=>props.theme.mobile}{
    padding-left: 5px;
}
`
const SettingIcon = styled(Settings)`
    align-self: center;

    font-size: 26px;
    text-align:right;
    color:white;
    @media ${(props)=>props.theme.mobile}{
    padding-left: 5px;
}

`
const AccessIcon = styled(Accessibility)`
    align-self: center;

    font-size: 26px;
    text-align:right;
    color:white;
    @media ${(props)=>props.theme.mobile}{
    padding-left: 5px;
}

`
const Option = styled.p`
    align-self: center;
    font-size: 26px;
    text-align: left;
    color:white;
    @media ${(props)=>props.theme.laptop}{
        font-size: 20px;
    }
 

    @media ${(props)=>props.theme.mobile}{
        text-align: center;
        font-size: 14px;
    }
    @media ${(props)=>props.theme.Smobile}{
        text-align: center;
        font-size: 11px;
    }
`

const Sidebar = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    margin: 0 auto;
    grid-gap: 25px;
    grid-template-rows: 50% 50%;
    align-self: center;
    background-color: #9e8fa0;
    @media ${(props)=>props.theme.mobile}{
    grid-template-rows: 80% 20%;

    }

`

const TabSection = styled.div`
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-rows: repeat(3,20%);
    margin: 0 auto;
    @media ${(props)=>props.theme.mobile}{
    width: 100%;
    height: 80%;

    grid-template-rows: none;
    grid-template-columns: repeat(3,1fr);
}
`


const ImageSection = styled.div`
    width: 90%;
    height: 91%;
    text-align: center;
    margin: 0 auto;
    padding-top:50px;
    @media ${(props)=>props.theme.mobile}{
        width:100%;
    }
`


const OptionButton = styled.div`
    width: 60%;
    display: grid;
    grid-template-columns: 10% 90%;
    margin: 0 auto;
    justify-content: center;
    grid-gap: 10px;
    &:hover{
        cursor: pointer;
        font-weight:bold;
    }
    @media ${(props)=>props.theme.laptop}{
        width: 70%;
    }
    @media ${(props)=>props.theme.mobile}{
        width: 100%;
        height:100%;
        grid-template-columns: 14% 86%;
        grid-gap: 0;
        text-align: center;
        justify-content: center;
    }

`

const InfoContainer = styled.div`
    align-self: center;
    margin: 0 auto;
    width: 90%;
    height: 80%;
    @media ${(props)=>props.theme.mobile}{
        height: 90%;
        padding-bottom: 30px;
    }
`
const Heading = styled.h1`
    font-size: 40px;
    font-weight: bold;
    margin: 20px 0 30px 20px;
    @media ${(props)=>props.theme.mobile}{
    font-size: 30px;
        
    }

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
    @media ${(props)=>props.theme.mobile}{
        grid-template-columns: none;
        grid-template-rows: repeat(4,1fr);

    }

`
const PasswordForm = styled(Form)`
    height: 60%;
    grid-template-rows: repeat(4,1fr);
    @media ${(props)=>props.theme.mobile}{
        margin-bottom: 30px;
    }
`

const InputBox = styled.div`
    width: 80%;
    height: 60%;
    margin-top: 20px ;
    @media ${(props)=>props.theme.mobile}{
        width: 100%;

    }
`

const ImageBox = styled.div`
    width: 100%;
    height: 90%;
`

const Image = styled.img`
    width:250px;
    height:250px;

    @media ${(props)=>props.theme.laptop}{
        width: 200px;
        height: 200px;
    }
`
const Name = styled.h4`
    margin-top: 20px;
    font-size: 24px;
    text-align: center;
    font-weight: bold;
    color: white;

    @media ${(props)=>props.theme.laptop}{
        font-size: 18px;
    }
`
const Status = styled.div`
    width: 90%;
    height: 7%;
    margin: -1px 20px;
    display: grid;
    grid-gap: 25px;
    grid-template-columns: 1fr 3fr 1fr;
    justify-content: center;
    @media ${(props)=>props.theme.laptop}{
        font-size: 16px;
    grid-template-columns: 1.1fr 3fr 1fr;

    width: 95%;

    }
    @media ${(props)=>props.theme.tablet}{
    grid-template-columns: 1.3fr 3fr 1fr;

    }
    @media ${(props)=>props.theme.mobile}{
    grid-template-columns: 1.4fr 3fr 1fr;

    width: 100%;

    }
`

const CrossLine = styled.hr`
  width: 100%;
  height: 0px;
  display: inline-block;
  border: none;

  border-top: 1px solid black;
  align-self: center;
`
const SpecialLine = styled(CrossLine)`
    border: none;
    border-top: 1px solid #D4BDAC;
`

const Text = styled.p`
    align-self: center;
    font-size: 18px;
    font-weight: bold;
    color: #D4BDAC;
    @media ${(props)=>props.theme.laptop}{
        font-size: 16px;
    }
    @media ${(props)=>props.theme.mobile}{
        font-size: 14px;
    }
    @media ${(props)=>props.theme.Smobile}{
        font-size: 10px;
    }

`
const SubText = styled(Text)`
    color: darkgrey;
    font-weight: normal;
    align-self: center;
    font-size: 16px;
    @media ${(props)=>props.theme.laptop}{
        font-size: 14px;
    }
    @media ${(props)=>props.theme.mobile}{
        font-size: 12px;
    }
    @media ${(props)=>props.theme.Smobile}{
        font-size: 10px;
    }

`

const DeleteMessage = styled(Label)`
    margin: 20px;
    &:hover{
        color: black;
        cursor: pointer;

    }
`

const DashBoard = ()=>{
    const {firstName,lastName,userName,isAdmin,setUser} = useContext(UserInfoContext);
    const domain = useContext(DomainContext);
    const [updateFirstName,setUpdateFirstName] = useState("")
    const [updateLastName,setUpdateLastName] = useState("");
    return(
        <>
        <Heading>Profile</Heading>
        <Form>
           <InputBox>
            <Label>User Name</Label>
            <Input value={userName} disabled/>
           </InputBox>
           {window.innerWidth<=size.mobile?<></>:<InputBox></InputBox>}
           <InputBox>
            <Label>First Name</Label>
            <Input value={updateFirstName} placeholder={firstName} onChange={(e)=>{
                setUpdateFirstName(e.target.value);
            }} />
           </InputBox>
           <InputBox>
            <Label>Last Name</Label>
            <Input value={updateLastName} placeholder={lastName} onChange={(e)=>{
                setUpdateLastName(e.target.value);

            }}/>
           </InputBox>
           <InputBox>
           <SubmitButton onClick={(e)=>{
               e.preventDefault();
               if(updateLastName===lastName&&updateFirstName===firstName){
                   alert("Please use different name to update");
                    return;
                }else if(updateFirstName===""&&updateLastName===""){
                    alert("Please Write down name to update");
                    return;
                }
                let fn = firstName;
                if(updateFirstName!==""){
                    fn = updateFirstName;
                }
                let ln = lastName;
                if(updateLastName!==""){
                    ln = updateLastName;
                }
                const update = {
                    userName,
                    firstName:fn,
                    lastName:ln,
                    
                }
             

               axios.patch(`${domain}/signup`,update,{withCredentials:true}).then((response)=>{
                    if(response.data.errMessage){
                        alert(response.data.errMessage);
                    }else{
                        console.log(response.data);
                         alert("Sucessfully updated");
                         setUser({
                            userName,
                            firstName: fn,
                            lastName: ln,
                            isAdmin,
                            setUser
                         });
                         setUpdateFirstName("");
                         setUpdateLastName("");
                    }
               })

           }} style={{margin: 0}}>Save Info</SubmitButton>
           </InputBox>
           <InputBox></InputBox>
           

        </Form>
    </>

    )
}

const Activity = ()=>{
    const {userName,isAdmin} = useContext(UserInfoContext);
    const domain = useContext(DomainContext);
    const [data,setData] = useState<any>({});
    useEffect(()=>{
        axios.get(`${domain}/postcount/${userName}`).then((response)=>{
            setData(response.data);
        })
    })
    
    return(

        <>  
        <Heading>My Post</Heading>
        <Status><Text>전체 게시글</Text> <SpecialLine></SpecialLine> <Text>{data.totalPost}</Text></Status>
        <Status><SubText>Q T</SubText> <CrossLine></CrossLine> <SubText>{data.numofQT}</SubText></Status>
        <Status><SubText>자유 게시판</SubText> <CrossLine></CrossLine> <SubText>{data.numofBTB}</SubText></Status>               
        {isAdmin?<Status><SubText>성경 공부</SubText> <CrossLine></CrossLine> <SubText>{data.numofBS}</SubText></Status>:<></>}
        {isAdmin?<Status><SubText>주일 학교</SubText> <CrossLine></CrossLine> <SubText>{data.numofCS}</SubText></Status>:<></>}
        <SecondHeading>My Comment</SecondHeading>
        <Status><SubText>Q T</SubText> <CrossLine></CrossLine> <SubText>{data.numofQTReview}</SubText></Status>
        <Status><SubText>자유 게시판</SubText> <CrossLine></CrossLine> <SubText>{data.numofBTBReview}</SubText></Status>               
        <Status><SubText>성경 공부</SubText> <CrossLine></CrossLine> <SubText>{data.numofBSReview}</SubText></Status>
        <Status><SubText>주일 학교</SubText> <CrossLine></CrossLine> <SubText>{data.numofCSReview}</SubText></Status>
        </>
    )
}

const ChangePassword = ()=>{
        const [password,setPassword] = useState("");
        const [newPassword,setNewPassword] = useState("");
        const [confirmPassword,setConfirmPassword] = useState("");
        const {userName,setUser} = useContext(UserInfoContext);
    const domain = useContext(DomainContext);
    const history = useHistory();
    const {setLogin} = useContext(LoginContext);

    function ValidationCheck(newPassword:string){
     
        let passwordCheck = /^\w{5,}$/;
        if(!passwordCheck.test(newPassword)){
            return false;
        }
        return true;
    }

    return(
        <>
        <Heading>
        Password
    </Heading>
    <PasswordForm>
        <InputBox>
            <Label>Old Password</Label>
            <Input  type="password" value={password} onChange={(e)=>{
                setPassword(e.target.value);
            }}></Input>
        </InputBox>
        <div></div>
        <InputBox>
            <Label>New Password</Label>
            <Input type="password" value={newPassword} onChange={(e)=>{
                setNewPassword(e.target.value);
            }}></Input>
        </InputBox>
        <div></div>
        <InputBox>
            <Label>Confirm New Password</Label>
            <Input  type="password" value={confirmPassword} onChange={(e)=>{
                setConfirmPassword(e.target.value);
            }}></Input>
        </InputBox>
        <div></div>
        <InputBox>
        <SubmitButton onClick={(e)=>{
            e.preventDefault();
            if(newPassword===""||password===""||confirmPassword===""){
                alert("please write down password please");
                return;
            }else if(newPassword!==confirmPassword){
                alert("Please write down same password for new password and confirm password");
                return;
            }else{
                const validate = ValidationCheck(newPassword);
                if(validate){
                    axios.patch(`${domain}/signup`,{userName,password,newPassword},{withCredentials:true}).then((response)=>{
                        if(response.data.errMessage){
                            alert(response.data.errMessage);
                        }else{
                            alert(response.data.message);                    
                            alert("please Login Again");
                            setUser({
                                userName: "",
                                firstName: "",
                                lastName: "",
                             isAdmin: false,
                             setUser: ()=>{}
                            });
                            setLogin(false);
                            history.replace("/");
                        }
                    })
                }else{
                    alert("Password should start with a letter and more than 5 characters");
                }
            
           
        }
        }} style={{margin: "0 ",width: "70%"}}>Confirm Change</SubmitButton>                    
        </InputBox>
        <InputBox>        
        </InputBox>
    </PasswordForm>
    <Heading>Account Setting</Heading>
    <DeleteMessage onClick={()=>{
        const confirm = window.confirm("Are you sure you want to delete your account? You cannot revert this action");
        if(confirm){
            axios.delete(`${domain}/login/${userName}`,{withCredentials:true}).then((response)=>{
                if(response.data.errMessage){
                    alert(response.data.errMessage);
                }else{
                    alert(response.data.message);
                    setUser({
                        userName: "",
                        firstName: "",
                        lastName: "",
                     isAdmin: false,
                     setUser: ()=>{}
                    });
                    setLogin(false);
                    history.replace("/");
                }
            })
        }

    }}>Delete Account</DeleteMessage>
    </>
    )
}


export const Profile = (): JSX.Element =>{
        const {firstName,lastName,userName,isAdmin,setUser} = useContext(UserInfoContext);
        const [tab,setTab] = useState(0);

        let options: JSX.Element = <></>;
        switch(tab){
            case 0:
                options = <DashBoard></DashBoard>;
                break;
            case 1:
                options = <Activity></Activity>;
                break;
            case 2:
                options = <ChangePassword></ChangePassword>;
                break;
        }
    return(
        <ProfileContainer>
            <Sidebar>
                <ImageSection>
                    <ImageBox>
                        <Image src={User}></Image>
                        <Name>Welcome, {firstName} 성도님</Name>
                    </ImageBox>
                </ImageSection>
                <TabSection>
                <OptionButton onClick={()=>{
                    setTab(0)
                }}>
                    <InfoIcon></InfoIcon><Option>DashBoard</Option>
                </OptionButton>
                <OptionButton onClick={()=>{
                    setTab(1)
                }}>
                    <AccessIcon></AccessIcon><Option>My Activities</Option>
                </OptionButton>
                <OptionButton onClick={()=>{
                    setTab(2)
                }}>
                    <SettingIcon></SettingIcon><Option>Settings</Option>
                </OptionButton>
                </TabSection>
            </Sidebar>
            <InfoContainer>
               {options}
            </InfoContainer>
        </ProfileContainer>

    )
}