export const createMatchStore = () =>{
    return{
            matchDataAvail:false,
            teams:["",""],
            location:"",
            venue:"",
            date:"",
            toss:"",
            winner:"",
            umpires:[],
            firstInning:"",
            secondInning:"",
    }
}