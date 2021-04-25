export const createTeamStore = () =>{
    return {
        team: [],
        credit:100,
        teamAarr:[],
        teamBarr:[],
        allPlayers:[],
        allPlayerDataAvail:false,
        capID:"cap",
        viceCapID:"vice",
        addPlayer(el){
            let temp = {
                name: el.name,
                credit: el.credit,
                id:el.id,
                team:el.team,
                points:el.points,
                batFifty:el.batFifty,
                batHundred:el.batHundred,
                wk :el.wk,
            }
            this.team.push(temp)
            // console.log(this.credit)
        },
        removePlayer(id){
            this.team = this.team.filter((el)=>el.id !== id)
            // console.log(this.credit)
        },
        userCredit(){
            let n=0;
            for(let x in this.team){
                n = this.team[x].credit + n
            }
            this.credit = 100 - n
        },
        addPlayerToTeamA(el){
            let temp = {
                name: el.name,
                credit: el.credit,
                id:el.id,
                points:el.points,
                batFifty:el.batFifty,
                batHundred:el.batHundred,
                wk :el.wk,
            }
            this.teamAarr.push(temp)
            // console.log(this.credit)
        },
        removePlayerFromTeamA(id){
            this.teamAarr = this.teamAarr.filter((el)=>el.id !== id)
            // console.log(this.credit)
        },
        addPlayerToTeamB(el){
            let temp = {
                name: el.name,
                credit: el.credit,
                id:el.id,
                points:el.points,
                batFifty:el.batFifty,
                batHundred:el.batHundred,
                wk :el.wk,
            }
            this.teamBarr.push(temp)
            // console.log(this.credit)
        },
        removePlayerFromTeamB(id){
            this.teamBarr = this.teamBarr.filter((el)=>el.id != id)
            // console.log(this.credit)
        },
        changeCapID(id){
            this.capID = id
        },
        updatePoints(id,points,state){
            this.team = this.team.map(el=>{
                if(el.id === id){
                    el.points = el.points+points
                    if(state === "Batsman"){
                        if(el.points >=50 && ! el.batFifty){
                            el.batFifty = true
                        }if(el.points >=100 && ! el.batHundred){
                            el.batHundred = true
                        }
                    }
                    if(state === "Bowler"){
                        el.wk = el.wk+1
                    }

                }
                return el
            })
        },
        resetPoints(){
            this.team = this.team.map(el=>{
                el.points = 0
                return el
            })
        },

}
}