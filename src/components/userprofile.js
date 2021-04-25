import React, {useEffect} from "react"
import Avatar from "@material-ui/core/Avatar";
import ABD from "../assets/ABD.jpg";
import {useUserStore} from "../contextProvider/userContext";
import {makeStyles} from "@material-ui/core/styles";
import styled from "styled-components";
import {Logout} from "../api/auth";
import {useHistory} from "react-router-dom"


const Button = styled.button`
  padding: 8px 15px;
  margin: 5px;
  border: solid 2px #97c655;
  border-radius: 10px;
`


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    large: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));


const Profile =()=>{
    const userStore = useUserStore()
    const classes = useStyles();

    const history = useHistory()


    useEffect(()=>{
        if(! userStore.user.isLogin){
            history.push("/lost")
        }
    },[])

    return(
            <div className="user-profile">
                <div>
                    <Avatar alt="Remy Sharp" src={ABD} className={classes.large} />
                    <h5>{userStore.user.username}</h5>
                </div>
                <Button onClick={()=>{
                    Logout(userStore.user.token)
                    userStore.user = {
                        username: "null",
                        email:"null",
                        token:null,
                        isLogin:false
                    }
                    history.push("/")
                }}>Logout</Button>


            </div>
    )
}

export default Profile