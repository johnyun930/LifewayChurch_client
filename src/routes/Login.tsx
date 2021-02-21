import React, { ChangeEvent, useEffect, useState } from 'react';


export const Login  =(): JSX.Element =>{
    const [userName,setuserName] = useState<string>("");
    const [passowrd,setPassword] = useState<string>("");
    return( 
    <>
    <form method="POST" action="http://localhost:8000/login">
    <input type="text" name="userName" value={userName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
        setuserName(e.target.value);
    }} placeholder="UserName"/>
    <input type="password" name="password" value={passowrd} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
        setPassword(e.target.value);
    }} placeholder="Password"/>
    <button type="submit">Log in</button>
    </form>
    </>
    )
}