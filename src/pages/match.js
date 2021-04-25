import React, {useEffect, useState} from 'react'
import styled from "styled-components"
import {AiOutlinePlusCircle} from "react-icons/ai"
import {useTeamStore} from "../contextProvider/teamProvider";
import {Observer} from 'mobx-react'
import {getMatchData, getPlayerCredits} from "../api/match";
import {useMatchStore} from "../contextProvider/matchContext";
import {completeTeam, playersInfoBuilder, teamBuilder, uniqueArr} from "../utility";


const Matchdiv = styled.div`
  box-shadow: 2px 2px 50px 5px #ccc;
  background-color: rgba(255,255,255,0.85);
  border-radius: 10px;
  width: 80%;
  margin: auto;
  margin-bottom: 10px;
  padding: 10px;
`

const Match = ()=>{
    const teamStore = useTeamStore()
    const matchStore = useMatchStore()

    useEffect(async ()=>{
        let data;
        if(! matchStore.matchDataAvail){
            data = await getMatchData()
            console.log("Match",data)
            getTeam(data)
            getVenue(data)
            getDate(data)
            getMatchLocation(data)
            updateMatch(data)
            matchStore.matchDataAvail = true
        }
        let allplayers;
        if(! teamStore.allPlayerDataAvail){
            allplayers = await getPlayerCredits()
            teamStore.allPlayers = allplayers
            await makeTeam(data,allplayers)
            teamStore.allPlayerDataAvail = true
        }
        // setMatch(true)
    },[])

    const makeTeam = (data,allPlayersArr)=>{
        let firstInning = teamBuilder(data.innings[0]["1st innings"]["deliveries"])
        let tempA = firstInning.batsmanArr
        let tempB = firstInning.bowlerArr
        let secondInning = teamBuilder(data.innings[1]["2nd innings"]["deliveries"])
        tempA= uniqueArr(tempA,secondInning.bowlerArr)
        tempB = uniqueArr(tempB,secondInning.batsmanArr)
        let teamA = playersInfoBuilder(tempA, allPlayersArr,"A")
        let teamB = playersInfoBuilder(tempB, allPlayersArr,"B")
        let {team_A,team_B}=completeTeam(teamA, teamB, allPlayersArr)
        teamStore.teamAarr = team_A
        teamStore.teamBarr = team_B
    }

    const getTeam =(data)=>{
        let teams = data.info.teams.map(el=>{
            return{
                name:el,
                score:0,
            }
        })
        matchStore.teams = teams
    }
    const getMatchLocation = (data)=>{
        matchStore.location = data.info.city
    }
    const getVenue = (data)=>{
        matchStore.venue = data.info.venue
    }

    const getDate = (data) =>{
        let d = Date.parse(data.info.dates[0])
        let date = new Date(d)
        matchStore.date = date.toDateString()
    }

    const updateMatch = (data)=>{
        matchStore.toss =data.info.toss
        matchStore.umpires =data.info.umpires
        matchStore.winner =data.info["outcome"]["winner"]
        matchStore.firstInning = data.innings[0]["1st innings"]
        matchStore.secondInning = data.innings[1]["2nd innings"]
    }

    return(
        <Observer>
            {()=>{
                return(
        <div className="match">
            <div className="match-details">
                <Matchdiv>
                    <h3 className="match-between">{matchStore.teams[0].name} vs {matchStore.teams[1].name}</h3>
                    <h5 className="venue">{matchStore.venue}<span>{matchStore.date}</span></h5>
                </Matchdiv>
                <div className="teams">
                <div className="official-teams">
                    <h5>{matchStore.teams[0].name}</h5>

                    <ul className="team-box">
                        {teamStore.teamAarr.map((el,index)=>{
                            return(
                                <li key={el.id}>
                                    <span>{index +1}</span>
                                    <div className="player-name">{el.name}</div>
                                    <div className="credits">
                                        <div>{el.credit} <p style={{fontSize:"50%"}}>credits</p></div>
                                        {
                                            teamStore.credit >= el.credit && teamStore.team.length <11? (
                                                <div onClick={()=>{
                                                    teamStore.addPlayer(el)
                                                    teamStore.removePlayerFromTeamA(el.id)
                                                    teamStore.userCredit()
                                                }}
                                                     className="icon"
                                                ><AiOutlinePlusCircle/></div>
                                            ):null
                                        }
                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                <div className="official-teams">
                    <h5>{matchStore.teams[1].name}</h5>
                    <ul>
                        {teamStore.teamBarr.map((el,index)=>{
                            return(
                                <li key={el.id}>
                                    <span>{index +1}</span>
                                    <div className="player-name">{el.name}</div>
                                    <div className="credits">
                                        <div>{el.credit} <p style={{fontSize:"50%"}}>credits</p></div>
                                        {
                                            teamStore.credit >= el.credit && teamStore.team.length <11?(
                                                <div onClick={()=>{
                                                    teamStore.addPlayer(el)
                                                    teamStore.removePlayerFromTeamB(el.id)
                                                    teamStore.userCredit()
                                                }}
                                                     className="icon"
                                                ><AiOutlinePlusCircle/></div>
                                            ):null
                                        }

                                    </div>
                                </li>
                            )
                        })}
                    </ul>
                </div>
                </div>
            </div>
        </div>
                )
            }}
        </Observer>
    )
}

export default Match