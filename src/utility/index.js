const teamBuilder = (arr)=>{
    let A=[],B=[];
    // console.log(arr)
    for(let x in arr){
        let key = Object.keys(arr[x])
        let data = arr[x][key]
        let strike = data["batsman"]
        let non_strike = data["non_strike"]
        let bowler = data["bowler"]

        if(! A.includes(strike)){
            A.push(strike)
        }
        if(! A.includes(non_strike)){
            A.push(non_strike)
        }
        if(! B.includes(bowler)){
            B.push(bowler)
        }
    }
    A= A.filter(el=>el !== undefined)
    B= B.filter(el=>el !== undefined)
    // console.log("A",A)
    // console.log("B",B)
    return {"batsmanArr" : A ,"bowlerArr" :B}
}

const uniqueArr=(a,b)=>{
    for(let x in a){
        if(! b.includes(a[x])){
            b.push(a[x])
        }
    }
return b
}

const playersInfoBuilder =(teamArr, playersArr, teamName)=>{
    let temp =[]
    // console.log("Players Arr ",playersArr)
    for(let x in teamArr){
        let player = playersArr.find(el=>el.name === teamArr[x])
        // console.log(player)
        temp.push({...player, team:teamName,batFifty:false,
            batHundred:false,wk :0,})
    }
    // console.log(`Team ${teamName}` ,temp)
    return temp
}

const completeTeam = (A, B, players)=>{
    let Asize = A.length

    let temp = A.concat(B)
    while(temp.length <22){
        let ran = randomChoice(players)
        let team = (11-Asize>0) ? "A":"B";
        if(temp.find(el=>el.id === ran.id) === undefined){
            temp.push({...ran, team:team,batFifty:false,
                batHundred:false,wk :0,})
            Asize++
        }
    }
    let team_A = temp.filter((el)=>{
        if(el.team === "A"){
            return el
        }
    })
    let team_B = temp.filter((el)=>{
        if(el.team === "B"){
            return el
        }
    })
    // console.log(temp)
    // console.log(team_A)
    // console.log(team_B)
    return {team_A,team_B}
}

const randomChoice =(players)=>{
    return  players[Math.floor(Math.random() * (315))];
}


export {teamBuilder,uniqueArr,playersInfoBuilder,completeTeam}

