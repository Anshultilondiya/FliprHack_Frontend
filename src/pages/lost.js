import React from "react"
import {Link} from "react-router-dom"
import {useUserStore} from "../contextProvider/userContext";


const Lost = ()=>{

    const userStore = useUserStore()

    return(
        <div style={{width:"100%"}} className="lost">
            <div className="Brand">
                <h1>I Think You Are Lost </h1>
                <Link to="/" onClick={()=>{
                    userStore.user = {
                        username: "null",
                            email:"null",
                            token:null,
                            isLogin:false
                    }
                }}
                style = {{textDecoration:"none"}}
                >
                    <h4>Press Here to be Found</h4>
                </Link>
            </div>
        </div>
    )
}

export default Lost