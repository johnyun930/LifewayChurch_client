import React,{useState} from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import logo from '../images/logo.png';
import MenuIcon from '@material-ui/icons/Menu';
import { size } from '../styles/theme';
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
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr;
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


export const Header = ():JSX.Element=>{
    const [display,setDisplay] = useState<boolean>(false);
    return(
    <HeaderContainer>
        <LogoContainer>
            <Link to='/'><Logo src={logo}/></Link>
            {window.innerWidth<=size.mobile?<Menubar style={{fontSize:"30px"}} onClick={()=>{
                setDisplay(!display);
            }}></Menubar>:<></>}
        </LogoContainer>
      

        <NavbarContainer display={display}>
        <NavButton><Link to ="/">Home</Link></NavButton>
        <NavButton><Link to ="">About</Link></NavButton>
        <NavButton><Link to ="/worship">Worship</Link></NavButton>
        <NavButton><Link to ="">Connect</Link></NavButton>
        <NavButton><Link to ="">Contact</Link></NavButton>
        {/* <LoginButton><Link to ="/login">Login</Link></LoginButton> */}
        </NavbarContainer>
    </HeaderContainer>
    )
}