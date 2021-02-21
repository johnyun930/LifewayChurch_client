import React, { ChangeEvent, useState } from 'react';

export const Singup = (): JSX.Element=>{
    const [username,setuserName] = useState<string>("");
    const [password,setPassword] = useState<string>("");
    const [firstName,setFirstName] = useState<string>("");
    const [lastName,setLastName] = useState<string>("");
    const [email,setEmail] = useState<string>("");


    return(
        <form action="http://localhost:8000/signup" method="POST">
            <input type="text" name="userName" placeholder="username" value={username} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setuserName(e.target.value);
            }}/>
            <input type="password" name="password" placeholder="password" value={password} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setPassword(e.target.value);
            }}/>
            <input type="text" name="firstName" placeholder="First Name" value={firstName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setFirstName(e.target.value)
            }}/>

            <input type="text" name="lastName" placeholder="Last Name" value={lastName} onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                setLastName(e.target.value)
            }}/>

            <input type="email" name="email" placeholder="Email" value={email} onChange={(e:ChangeEvent<HTMLInputElement>)=>{ 
                setEmail(e.target.value)
            }}/>
        <button type="submit">Sign Up</button>
        </form>

    )
}