import React,{useState,useContext, useEffect} from 'react';
import { Link, RouterProps } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png';
import MenuIcon from '@material-ui/icons/Menu';
import { size } from '../styles/theme';
import { LoginContext, UserInfoContext } from '../states/LoginContext';
import axios from 'axios';
import { DomainContext } from '../states/DomainContext';
const HeaderContainer = styled.div`
    width: 100%;
    height: 14vh;
    min-height:114px;
    display:grid;
    grid-template-columns: 1fr 1fr;
    @media ${(props)=>props.theme.mobile}{
        min-height:60px;
        height:10%;
        display: flex;
        flex-direction:column;
        align-items:middle
        
    }

`;
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
    padding: 1rem 1rem;
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
    column-gap: 20px;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 2fr;
    @media ${(props)=>props.theme.mobile}{
        display:${(props)=>props.display?"flex":"none"};
        
        flex-direction:column;
        background-color: #242121
        
    }

`

const NavButton = styled.div`
    margin: auto auto;
    font-size: 1.2em;
    color: orange;
    @media ${(props)=>props.theme.mobile}{
        display: block;
        width:100%;
        padding: 10px 0px;
        border-bottom: 1px solid white;
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
    background-color: #1a73e8;
    border: 1px solid transparent;
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


export const Header = ():JSX.Element=>{
    const domain = useContext(DomainContext);
    console.log(domain);
    useEffect(()=>{
            axios.get(domain,{withCredentials:true}).then((response)=>{
                if(response.data.passport){
                    setLogin(true);
                    setUser(response.data.passport.user);
                }
                
        });
    },[]);

    const [menuDisplay,setmenuDisplay] = useState<boolean>(false);
    const [settingDisplay,setSettingDisplay] = useState<boolean>(false);
    const {login,setLogin}= useContext(LoginContext);
    const {firstName,setUser} = useContext(UserInfoContext);
    return(
    <HeaderContainer>
        <LogoContainer>
            <Link to='/'><Logo src={logo}/></Link>
            {window.innerWidth<=size.mobile?<Menubar style={{fontSize:"30px"}} onClick={()=>{
                setmenuDisplay(!menuDisplay);
            }}></Menubar>:<></>}
        </LogoContainer>
      

        <NavbarContainer display={menuDisplay}>
        <NavButton><Link to ="/">Home</Link></NavButton>
        <NavButton><Link to ="/about">About</Link></NavButton>
        <NavButton><Link to ="/worship">Worship</Link></NavButton>
        <NavButton><Link to ="/connect">Connect</Link></NavButton>
        <NavButton><Link to ="/contact">Contact</Link></NavButton>
        {login?<NavButton onClick={()=>{
            setSettingDisplay(!settingDisplay);
        }}>{firstName+" 성도님"}</NavButton>:<LoginButton><Link to ="/login">Login</Link></LoginButton>}
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
    </HeaderContainer>
    )
}