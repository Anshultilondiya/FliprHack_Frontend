import React, {useState} from 'react'
import {AiOutlineMinusCircle} from "react-icons/ai";
import {Observer} from 'mobx-react'
import {useTeamStore} from "../contextProvider/teamProvider";
import {useUserStore} from "../contextProvider/userContext";
import styled from "styled-components";
import Profile from "./userprofile";
import {Link} from "react-router-dom"


const CapButton = styled.div`
border-radius: 50%;
  //border:solid 2px #111;
  width: 25px;
  height: 25px;
  font-size: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const UserPanel = ()=>{

    const teamStore = useTeamStore()
    const userStore = useUserStore()

    return(
        <Observer>
            {()=>{
                return(
                    <div className="user-panel">
                        <Profile/>
                        <div className="your-team">
                            <h3>{userStore.user.username.toUpperCase()}'s Team</h3>
                            <div className="indicators">
                                <CapButton className="indicators-btn"
                                           style={{
                                               backgroundColor:(teamStore.team.length === 11)? ("#FFA500") :("transparent")
                                           }}
                                >11</CapButton>
                                <CapButton className="indicators-btn"
                                           style={{
                                               backgroundColor:(teamStore.capID !== "cap")? ("#FFA500") :("transparent")
                                           }}
                                >C</CapButton>
                                <CapButton className="indicators-btn"
                                           style={{
                                               backgroundColor:(teamStore.viceCapID !== "vice")? ("#FFA500") :("transparent")
                                           }}
                                >VC</CapButton>
                            </div>
                            <div className="team-list">
                                <div className="team-meta">
                                    <h5>Credit Available : {teamStore.credit}</h5>
                                    {
                                        teamStore.team.length === 11 && teamStore.capID !== "cap" && teamStore.viceCapID !== "vice" ? (
                                            <Link to="/game">
                                                <button onClick={()=>{
                                                    teamStore.resetPoints()
                                                }}>Save Team</button>
                                            </Link>
                                        ):null
                                    }


                                </div>

                                <ul>
                                    {teamStore.team.map((el,index)=>{
                                        return(
                                            <li key={el.id}>
                                                <div className="cap-vc">
                                                    <CapButton onClick={()=>{
                                                        if(el.id !== teamStore.viceCapID){
                                                            teamStore.capID= el.id
                                                    }
                                                    }

                                                    }
                                                    style={{
                                                        backgroundColor:(el.id === teamStore.capID)? ("#FFA500") :("transparent")
                                                    }}
                                                    >C</CapButton>
                                                    <CapButton onClick={()=> {
                                                        if(teamStore.capID !== el.id){
                                                            teamStore.viceCapID= el.id
                                                        }
                                                    }}
                                                               style={{
                                                                   backgroundColor:(el.id === teamStore.viceCapID)? ("#7CFC00") :("transparent")
                                                               }}
                                                    >VC</CapButton>
                                                </div>
                                                <div className="player-name">{el.name}</div>
                                                <div className="credits">
                                                    <div>{el.credit} <p style={{fontSize:"50%"}}>credits</p></div>
                                                    <div onClick={()=>{
                                                        teamStore.removePlayer(el.id)
                                                        el.team === "A"? teamStore.addPlayerToTeamA(el):teamStore.addPlayerToTeamB(el)
                                                        teamStore.userCredit()
                                                        if(el.id === teamStore.capID){
                                                            teamStore.capID = "cap"
                                                        }
                                                        else if(el.id === teamStore.viceCapID){
                                                            teamStore.viceCapID = "vice"
                                                        }
                                                    }}
                                                         className="icon"
                                                    ><AiOutlineMinusCircle/></div>
                                                </div>
                                            </li>
                                        )
                                    })}
                                </ul>
                            </div>
                        </div>
                    </div>
                )
            }}
        </Observer>

    )
}

export default UserPanel