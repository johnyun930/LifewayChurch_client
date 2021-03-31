import React,{useState,useContext, useEffect} from 'react';
import { Link, RouterProps } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import logo from '../images/logo.png';
import MenuIcon from '@material-ui/icons/Menu';
import { size } from '../styles/theme';
import { LoginContext, UserInfoContext } from '../states/LoginContext';
import axios from 'axios';
import { DomainContext } from '../states/DomainContext';
interface styleProps{
    position: boolean;
}

const slide = keyframes`
    from {
        margin-right: -300px;
    }
    to{
        margin-left: 0;
    }
`;

const HeaderContainer = styled.div`
    width: 100%;
    height: 14vh;
    min-height:114px;
    background-color: #f5f0ec;
    display:grid;
    grid-template-columns: 1fr 1fr;
    @media ${(props)=>props.theme.mobile}{
        min-height:60px;
        height:10%;
        display: flex;
        z-index:1;
        flex-direction:column;
        align-items:middle;
    } 
    position:${(props: styleProps)=>props.position?"fixed":"static"};
   
`
const LogoContainer = styled.div`

    @media ${(props)=>props.theme.mobile}{
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items:center;
    }
`

const Menubar = styled(MenuIcon)`

    @media ${(props)=>props.theme.mobile}{
        display:inline-block;
        justify-self:right;
        padding-right: 5px;
    }
`

const Logo = styled.img`
    padding: 20px 16px;
    padding-left: 30px;
    width: 130px;
    height: 90px;
    @media ${(props)=>props.theme.mobile}{
        width: 50px;
        height: 50px;
     padding: 5px 5px;

        
    }
`

type DisplayProps = {
    display: boolean
}

const NavbarContainer = styled.div<DisplayProps>`
    justify-self: center;
    vertical-align:middle;
    text-align:center;
    display: grid;
    column-gap: 30px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 2fr;
    align-self:center;
    @media ${(props)=>props.theme.mobile}{
        width: 50%;
        height: 100vh;
        position: fixed;
        right: 0;
        display:${(props)=>props.display?"grid":"none"};
        grid-template-rows: repeat(6,8%);
        grid-template-columns: none;
        padding-top: 5%;
        background-color: white;
        animation: 1s ${slide} ease-out;

        
    }

`

const NavButton = styled.div`
    margin: auto auto;
    font-size: 1.3em;
    color: #44525d;
    @media ${(props)=>props.theme.mobile}{
        display: block;
        width:100%;
        height: 100%;
        color: #9AC0E7;

    }
    &:hover{
        cursor:pointer;
    }
`
const LoginButton = styled.div`
     margin: auto auto;
     min-width: 96px;
     min-height: 30px;
     vertical-align:middle;
    font-size: 1.2em;
    color: white;
    line-height: 30px;
    background-color: #8d828f;
    border: 1px solid transparent;
    @media ${(props)=>props.theme.mobile}{
       background-color: white;
        color: #9AC0E7;
        font-size: 1.4em;
    }
`
const SettingContainer = styled.div<DisplayProps>`
    display: ${(props)=>props.display?"block":"none"};
    position: absolute;
    top: 10%;
    right: 9%;
    font-size:1.2em;
    width: 7%;
    height: 2.5%;
    border: 1px solid black;
    &:hover{
        cursor:pointer;
    }
`
const MobileSettingBar = styled.div`
    width:100vh;
    height:100vh;
    position:fixed;
    z-index: 1;

  
`


export const Header = ():JSX.Element=>{
    const domain = useContext(DomainContext);
    const [menuDisplay,setmenuDisplay] = useState<boolean>(false);
    const [settingDisplay,setSettingDisplay] = useState<boolean>(false);
    const {login,setLogin}= useContext(LoginContext);
    const {firstName,setUser} = useContext(UserInfoContext);
    const [header,setHeader] = useState(false);
    console.log(header);
        function checkYOffset(){
        if(window.pageYOffset===0){
            setHeader(false);
        }else{
            setHeader(true);
        }
        console.log(window.pageYOffset);
    }
    useEffect(()=>{
        axios.get(domain,{withCredentials:true}).then((response)=>{
            if(response.data.passport){
                setLogin(true);
                setUser(response.data.passport.user);
            }
            
    });
},[]);
useEffect(()=>{
    window.addEventListener('scroll',checkYOffset);
    return ()=>{
        window.removeEventListener('scroll',checkYOffset);
    
    }
}

,[]);

const sidebar =  <NavbarContainer display={menuDisplay}>
<Link to ="/"><NavButton onClick={()=>{
            setmenuDisplay(false);
    }}>Home</NavButton></Link>
   <Link to ="/about"> <NavButton  onClick={()=>{
            setmenuDisplay(false);
    }}>About</NavButton></Link>
   <Link to ="/worship"> <NavButton  onClick={()=>{
            setmenuDisplay(false);
    }}>Worship</NavButton></Link>
   <Link to ="/connect"> <NavButton  onClick={()=>{
            setmenuDisplay(false);
    }}>Connect</NavButton></Link>
   <Link to ="/contact"> <NavButton  onClick={()=>{
            setmenuDisplay(false);
    }}>Contact</NavButton></Link>
    {login?<NavButton onClick={()=>{
        setSettingDisplay(!settingDisplay);
    }}>{firstName+" 성도님"}</NavButton>:<Link to ="/login"><LoginButton>Login</LoginButton></Link>}
    <SettingContainer onClick={()=>{
        axios.get(`${domain}/logout`,{withCredentials:true}).then((response)=>{
            alert(response.data.message);
            setLogin(false);
            setSettingDisplay(false);
            setUser({userName: "",
            firstName: "",
            lastName: "",
            isAdmin: false,
            setUser: ()=>{}});

        });
    }} display={settingDisplay}>Log Out</SettingContainer>
    </NavbarContainer>
    return(
        <>
    <HeaderContainer position={header}>
        <LogoContainer>
            <Link to='/'><Logo src={logo}/></Link>
            {window.innerWidth<=size.mobile?<Menubar style={{fontSize:"30px"}} onClick={()=>{
                setmenuDisplay(!menuDisplay);
            }}></Menubar>:<></>}
        </LogoContainer>
      
        {window.innerWidth<=size.mobile?<></>:sidebar}
       
    </HeaderContainer>
    {window.innerWidth<=size.mobile?
    <MobileSettingBar onClick={()=>{
        setmenuDisplay(false);
    }}>
        {sidebar}
        </MobileSettingBar>
    :<></>}
        </>

    
    )
}