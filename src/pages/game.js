import React, {useEffect,useState} from 'react'
import Profile from "../components/userprofile";
import {useTeamStore} from "../contextProvider/teamProvider";
import styled from "styled-components";
import {useMatchStore} from "../contextProvider/matchContext";

const CapButton = styled.div`
border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 80%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  margin-left: 5px;
`

const Game=()=>{
    const teamStore = useTeamStore()
    const matchStore = useMatchStore()
    const [currentScore, setCurrentScore] =useState(0)
    // const [teamBScore, setTeamBScore] =useState(0)
    const [batsman,setBatsman] = useState("")
    const [nonStrike,setNonStrike] = useState("")
    const [bowler,setBowler] = useState("")
    // const [batsmanScore , setCurrentScore] = useState(0)
    const firstInning = matchStore.firstInning
    const secondInning = matchStore.secondInning
    const [currentFirstBall, setCurrentFirstBall] = useState(0)
    const [currentSecondBall, setCurrentSecondBall] = useState(0)
    const [run,setRun] = useState(0)
    const [firstStart, setFirstStart] = useState(false)
    const [secondStart, setSecondStart] = useState(false)
    const [matchEnd, setMatchEnd] = useState(false)
    const [start, setStart] = useState(false)


    const UpdateBatsmanRun = (obj)=>{
        let {batsman, points} =obj
        let data = teamStore.team.find(el=>el.name === batsman)
        if( data !== undefined){
            teamStore.updatePoints(data.id, points,"Batsman")
        }
    }

    const UpdateOnWicket = (obj)=> {
        let {kind, bowler, fielders} = obj
        let forBowler = {
            "caught": 25,
            "bowled": 33,
            "lbw": 33,
            "stumped": 25,
            "caught and bowled": 40,
            "hit wicket": 25
        }
        let forFielder = {
            "run out": 25
        }
        if (Object.keys(forBowler).includes(kind)) {
            let data = teamStore.team.find(el => el.name === bowler)
            if (data !== undefined) {
                teamStore.updatePoints(data.id, forBowler[kind], "Bowler")
            }
        }
        if (kind === forFielder["run out"]) {
            for (let x in fielders) {
                let data = teamStore.team.find(el => el.name === fielders[x])
                if (data !== undefined) {
                    teamStore.updatePoints(data.id, forFielder["run out"], "Fielder")
                }
            }

        }
    }



const FirstPlay=(obj,start,totalBalls,batTeam)=>{
        if(start){
            setBatsman(obj["batsman"])
            setNonStrike(obj["non_striker"])
            setBowler(obj["bowler"])
            setRun(obj["runs"]["total"])

            let a={
                batsman : obj["batsman"],
                points: obj["runs"]["batsman"]
            }
            UpdateBatsmanRun(a)

            if(Object.keys(obj).includes("wicket")){
                let o ={
                    kind : obj["wicket"]["kind"],
                    bowler:obj["bowler"],
                    fielders : (Object.keys(obj["wicket"]).includes("fielders"))? obj["wicket"]["fielders"]:null
                }
                UpdateOnWicket(o)
            }
            let num = currentScore + obj["runs"]["total"]
            // console.log(num)
            setCurrentScore(num)

            matchStore.teams = matchStore.teams.map(el=>{
                if(el.name === batTeam){
                    el.score = num
                }
                return el
            })


            if(currentFirstBall < totalBalls && start){
                let x = currentFirstBall +1
                setCurrentFirstBall(x)
            }
        }
}
    const SecondPlay=(obj,start,totalBalls,batTeam)=>{
        if(start){
            setBatsman(obj["batsman"])
            setNonStrike(obj["non_striker"])
            setBowler(obj["bowler"])
            setRun(obj["runs"]["total"])
            let a={
                batsman : obj["batsman"],
                points: obj["runs"]["batsman"]
            }
            UpdateBatsmanRun(a)

            if(Object.keys(obj).includes("wicket")){
                let o ={
                    kind : obj["wicket"]["kind"],
                    bowler:obj["bowler"],
                    fielders : (Object.keys(obj["wicket"]).includes("fielders"))? obj["wicket"]["fielders"]:null
                }
                UpdateOnWicket(o)
            }

            let num = currentScore + obj["runs"]["total"]
            // console.log(num)
            setCurrentScore(num)

            matchStore.teams = matchStore.teams.map(el=>{
                if(el.name === batTeam){
                    el.score = num
                }
                return el
            })
            // let num = teamBScore + obj["runs"]["total"]
            // // console.log(num)
            // setTeamBScore(num)

            // matchStore.teams[1].score = matchStore.teams[1].score + obj["runs"]["total"]

            if(currentSecondBall < totalBalls && start){
                let x = currentSecondBall +1
                setCurrentSecondBall(x)
            }
        }
    }

useEffect(()=>{
    const timer = setTimeout(() => {
        let a = firstInning["deliveries"]
        let firstBat = firstInning["team"]
        let totalBalls = a.length
        if(currentFirstBall !== totalBalls){
            let key = Object.keys(a[currentFirstBall])
            let obj = a[currentFirstBall][key]
            FirstPlay(obj,firstStart,totalBalls,firstBat)
        }
        else if (currentFirstBall === totalBalls && firstStart){
            setCurrentScore(0)
            setSecondStart(true)
        }
    }, 100);
    return () => clearTimeout(timer);
},[firstStart,currentFirstBall])

    useEffect(()=>{
        const timer = setTimeout(() => {
            let a = secondInning["deliveries"]
            let secondBat = secondInning["team"]
            let totalBalls = a.length
            if(currentSecondBall !== totalBalls){
                let key = Object.keys(a[currentSecondBall])
                let obj = a[currentSecondBall][key]
                SecondPlay(obj,secondStart,totalBalls,secondBat)
            }
            if(currentSecondBall === totalBalls){
                setMatchEnd(true)
            }
        }, 100);
        return () => clearTimeout(timer);
    },[secondStart,currentSecondBall])


    const totalPoints =()=>{
        let num =0
        for(let x in teamStore.team){
            let points = teamStore.team[x].points
            if(teamStore.team[x].id === teamStore.capID){
                points = points*2
            }
            if(teamStore.team[x].id === teamStore.viceCapID){
                points = points*1.5
            }
            num = num + points
        }
        return num
    }




    return(
        <div className="game">
            <div className="user-panel">
                <Profile/>
                {
                    ! start?(
                        <button onClick={()=>{
                            setFirstStart(true)
                            setStart(true)
                        }}
                                className="start-button"
                        >Start</button>
                    ):null
                }

                <div className="team-panel">
                    <ul>
                        <li >
                            <span>SNo.</span>
                            <div className="player-name">
                                <p>Player</p>
                                <div>
                                    <h5>C | VC</h5>
                                </div>
                                <div>
                                    <h5>HC | C</h5>
                                </div>
                                <div>
                                    <h5>W</h5>
                                </div>
                            </div>
                            <div>
                                <h5>Points</h5>
                            </div>

                        </li>
                        {teamStore.team.map((el,index)=>{
                            return(
                                <li key={el.id}>
                                    <span>{index +1}</span>
                                    <div className="player-name">
                                       <p>{el.name}</p>
                                        <div>
                                            <h5>
                                            {teamStore.capID === el.id?(
                                            <CapButton style={{backgroundColor:"#FFA500"}}>C</CapButton>
                                            ):null}
                                            {teamStore.viceCapID === el.id?(
                                                <CapButton style={{backgroundColor:"#7CFC00"}}>VC</CapButton>
                                            ):null}
                                            </h5>
                                        </div>
                                        <div>
                                            <h5>


                                            {(el.batFifty)?(<CapButton className="indicators-btn"
                                                                       style={{
                                                                           backgroundColor: "#FFA500"
                                                                       }}
                                            >50</CapButton>):null
                                            }
                                            {(el.batHundred)?(<CapButton className="indicators-btn"
                                                                         style={{
                                                                             backgroundColor: "#FFA500"
                                                                         }}
                                            >100</CapButton>):null}
                                            </h5>
                                        </div>
                                        <div><h5>{el.wk}</h5></div>

                                    </div>
                                    <div>
                                        <h5>{el.points}</h5>
                                    </div>

                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            <div className="game-simulation">
                <div className="live-box">
                    <div className="game-info">
                        <h4>{matchStore.teams[0].name} vs {matchStore.teams[1].name}</h4>
                        <h5>{matchStore.date}</h5>
                        <div className="game-meta-info">
                            <h5>Toss : {matchStore.toss.winner} | {matchStore.toss.decision}</h5>
                            <h5>Umpires : {matchStore.umpires.map((el,index)=><span key={index}>{el}</span>)}</h5>
                        </div>
                        <div className="live-match">
                            <div className="scoreboard">
                                <h4>Scoreboard</h4>
                                <div>
                                    <h4>{matchStore.teams[0].name} - {matchStore.teams[0].score} </h4>
                                    <h4>{matchStore.teams[1].name} - {matchStore.teams[1].score} </h4>
                                </div>
                            </div>
                            <div className="innings-div">
                                <h5>Runs : {run}</h5>
                                <h5>Balls : {currentFirstBall} - {currentSecondBall}</h5>
                            </div>
                            <div>
                                <div className="batting">
                                    <div>
                                        <p>Batsman</p>
                                        <h4>{batsman}</h4>
                                    </div>
                                    <div>
                                        <p>Non-Strike</p>
                                        <h4>{nonStrike}</h4>
                                    </div>
                                </div>
                                <div className="fielding">
                                    <div>
                                        <p>Bowler</p>
                                        <h4>{bowler}</h4>
                                    </div>
                                </div>
                            </div>
                            <div>
                                {matchEnd?(
                                    <div>
                                    <h3>
                                        Winner : {matchStore.winner}
                                    </h3>
                                    <div>
                                        <h5>Your Team Score : {totalPoints()} </h5>
                                    </div>
                                    </div>
                                ):null}

                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Game