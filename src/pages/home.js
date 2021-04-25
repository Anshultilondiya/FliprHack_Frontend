import React, {useEffect, useState} from "react";
import styled from 'styled-components'

import {loginUser,createUser} from '../api/auth'
import {useUserStore} from "../contextProvider/userContext";
import {useHistory} from "react-router-dom"

const Button = styled.button`
  padding: 8px 15px;
  margin: 5px;
  border: solid 2px #97c655;
  border-radius: 10px;
`
 const Home =()=>{

    const userStore = useUserStore()

    const [selectLogin, setSelectLogin] = useState(true)
     const [username, setUsername] = useState("")
     const [password, setPassword] =  useState("")
     const [email, setEmail] = useState("")
     const [wait, setWait] = useState(false)
     // const [errorAC, setErrorAC] = useState(false)

     const history = useHistory()

     const Login = async ()=>{
        try{
            let data = await loginUser({username,password})
            // console.log("data",data)
            setWait(true)
            if(data.status === 200){
                userStore.user.username=data.data.user.username
                userStore.user.email=data.data.user.email
                userStore.user.token=data.data.user.token
                userStore.user.isLogin = true
                // setShowError(false)
                setTimeout(()=>{
                    history.push("/match")
                },5000)
            }

        }
        catch (e){
            alert(e.message)
        }
     }

     const Create = async ()=>{
         try{
             let data = await createUser({username, password,email})
             console.log("data",data)
             // setSelectLogin(true)
             setWait(true)
             Login()
             if(data.status === 200){
                 // setSelectLogin(true)
             }
         }
         catch (e){

             alert(e.message)
         }
     }

     const auth = (
         <div className="auth-input">
             <div>
                 <input placeholder="username" onChange={(e)=>setUsername(e.target.value)} value={username}/>
                 <input placeholder="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
             </div>
             <Button onClick={()=>Login()}>Enter</Button>
         </div>
     )

     const signup = (
         <div className="sign-up">
             <div>
                 <input placeholder="username" onChange={(e)=>setUsername(e.target.value)} value={username}/>
                 <input placeholder="email" onChange={(e)=>setEmail(e.target.value)} value={email}/>
                 <input placeholder="password" onChange={(e)=>setPassword(e.target.value)} value={password}/>
             </div>
             <Button onClick={()=>Create()}>Create Account</Button>
         </div>
     )

     return(
        <div className="home">
        <div className="Brand">
            <h1>Geek's Eleven</h1>
            <h4>Be a sporty nerd</h4>
        </div>
        <div className="outer-login-div">
            <div className="login-box">
                {wait ? (
                    <p style={{color:"red", fontSize:"80%"}}>Please Wait, While server is processing</p>
                ):null}
                <div className="user-pass">
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                        <Button onClick={()=> {
                            setSelectLogin(true)
                            setUsername("")
                            setEmail("")
                            setPassword("")
                            setWait(true)
                        }}>Login</Button>
                        <Button onClick={()=> {
                            setSelectLogin(false)
                            setUsername("")
                            setEmail("")
                            setPassword("")
                        }}>Sign Up</Button>
                    </div>
                    <div>
                        {selectLogin ? auth : signup}
                    </div>
                </div>
                <div className="other-login">
                    <div className="otp">
                        <h3>Login with Mobile</h3>
                        <input placeholder="mobile"/>
                        <Button>Send OTP</Button>
                    </div>
                    <div className="fb">
                        <Button>Facebook</Button>
                    </div>
                </div>

            </div>
            </div>
        </div>
    )
}

export default Home
