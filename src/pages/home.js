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
     const [showError, setShowError] = useState(false)
     const [errorAC, setErrorAC] = useState(false)

     const history = useHistory()

     const Login = async ()=>{
        try{
            let data = await loginUser({username,password})
            console.log("data",data)
            if(data.status === 200){
                userStore.addName(data.data.user.username)
                userStore.addEmail(data.data.user.email)
                userStore.addToken(data.data.token)
                userStore.confirmLogin()
                setShowError(false)
                history.push("/match")
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
             {/*<Button onClick={async ()=>{*/}
             {/*    let data = await loginUser({username,password})*/}
             {/*    console.log("data",data)*/}
             {/*    if(data.status === 200){*/}
             {/*        userStore.addName(data.data.user.username)*/}
             {/*        userStore.addEmail(data.data.user.email)*/}
             {/*        userStore.addToken(data.data.token)*/}
             {/*        userStore.confirmLogin()*/}
             {/*        setShowError(false)*/}
             {/*        history.push("/match")*/}
             {/*    }*/}
             {/*    else{*/}
             {/*        setShowError(true)*/}
             {/*    }*/}

             {/*}}>*/}
             {/*    Enter</Button>*/}
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
             <Button onClick={async ()=>{
                 let data = await createUser({username, password,email})
                 console.log(data)
                 if(data.status === 200){
                     userStore.addName(data.data.user.username)
                     userStore.addEmail(data.data.user.email)
                     userStore.addToken(data.data.token)
                     userStore.confirmLogin()
                     setShowError(false)
                     history.push("/match")
                 }
                 else{
                     setErrorAC(true)
                 }
             }}>Create Account</Button>
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
                {showError ? (
                    <p style={{color:"red", fontSize:"80%"}}>Please Enter Correct username or password</p>
                ):null}
                {
                    errorAC ?(
                        <p style={{color:"red",fontSize:"80%"}}>Email already register, try login or use different email ID</p>
                    ):null
                }
                <div className="user-pass">
                    <div style={{display:"flex",flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                        <Button onClick={()=> {
                            setSelectLogin(true)
                            setUsername("")
                            setEmail("")
                            setPassword("")
                            setErrorAC(false)
                        }}>Login</Button>
                        <Button onClick={()=> {
                            setSelectLogin(false)
                            setUsername("")
                            setEmail("")
                            setPassword("")
                            setShowError(false)
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
