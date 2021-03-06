import React from 'react';
import styled from 'styled-components';
import contact from '../images/contact.png'
import map from '../images/map.png'
import share from '../images/share.png'
import {SiteBy,Content,ChangedYoutubeIcon} from '../components/Footer';
import GoogleMapReact from 'google-map-react';
import { LogoBox } from './About';
import logo from '../images/contact.jpg';
import {Title as MainTitle} from '../routes/WorshipList';


const ContactBox = styled.div`
    width: 48%;
    height: 30vh;
    display: grid;
    grid-template-columns: repeat(3,1fr);
    grid-gap:2%;
    margin: 0 auto 70px;

    @media ${(props)=>props.theme.mobile}{
       grid-template-columns: none;
      grid-template-rows: repeat(3,1fr);
      width: 80%;
      height: 120vh;
    }

`;
const ItemBox = styled.div`
    width:100%;
    height:100%;
    text-align: center;
`;

const IconImage = styled.img`
    width:30%;
    height: 30%;
    margin-bottom:30px;

`;

const Title = styled.h3`
    font-size: 30px;
    font-weight:bold;
    margin-bottom:15px;
`;
const Divider = styled.hr`
    width: 50px;
    border: 1px solid #eaeaea;
    margin-bottom:15px;
`;

const ContextBox = styled.div`
    width: 100%;
    height: 40%;
    text-align:middle;
`

const Context = styled.p`
    font-size: 18px;
    margin-bottom:10px;
    
`

const BoldContext =styled.h4`
  font-size: 18px;
    font-weight: bold;
    display:inline;
`

const MapBox = styled.div`
  width:70%;
  height:60vh;
  margin: 0 auto 50px;
  @media ${(props)=>props.theme.mobile}{
       width: 90%;
    }
`

const mapStyles = {
    width: '100%',
    height: '100%'
  };

  const CustomMarker = styled.div`
 
 width: 30px;
  height: 30px;
  border-radius: 50% 50% 50% 0;
  background: red;
  position: absolute;
  transform: rotate(-45deg);
  left: 50%;
  top: 50%;
  margin: -20px 0 0 -20px;

  &:after {
  content: "";
  width: 14px;
  height: 14px;
  margin: 8px 0 0 8px;
  background: #e6e6e6;
  position: absolute;
  border-radius: 50%;
}
  `;

const Marker = (props: any) => {
    const {name } = props;
    return (
      <CustomMarker
        title={name}>
        </CustomMarker>
    );
  };

export const Contact = ()=>{
    return(
    <>
    <LogoBox url={logo}>
      <MainTitle>위치 안내</MainTitle>
    </LogoBox>
    <ContactBox>
        <ItemBox>
            <IconImage src={map} alt="address icon"/>
            <Title>address</Title>
            <Divider/>
            <ContextBox>
                <Context>4830 Boundary Rd</Context>
                <Context>Burnaby, BC </Context>
                <Context>V5R 2N8</Context>
            </ContextBox>
        </ItemBox>
        <ItemBox >
        <IconImage src={contact} alt="contact icon"/>
        <Title>Contacts</Title>
        <Divider/>
        <ContextBox>
        <Context><BoldContext>Tel: </BoldContext>604-840-8070</Context>
        <Context><BoldContext>Email: </BoldContext>life.way.generation.church@gmail.com</Context>
        </ContextBox>

        </ItemBox>
        <ItemBox>
        <IconImage src={share} alt="share icon"/>
        <Title>social network</Title>
        <Divider/>
        <Content><SiteBy href="https://www.youtube.com/channel/UCizDtprD82GRYylkU9Vz-LQ/videos"><ChangedYoutubeIcon style={{fontSize:50}}></ChangedYoutubeIcon></SiteBy></Content>

        </ItemBox>
     
    </ContactBox>
    <MapBox>
        <GoogleMapReact
          bootstrapURLKeys={{key:process.env.REACT_APP_API_KEY! }}
          defaultCenter={{ 
              lat: 49.241450,
            lng: -123.022990}}
          defaultZoom={16}
        > 
         <Marker
            lat={49.241450}
            lng={-123.022990}
            name="My Marker"
            
          />
    </GoogleMapReact>
    </MapBox>
    </>
    )
}
