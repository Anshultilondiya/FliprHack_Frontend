import axios from "axios";

const baseURL="https://fliprhackbackend.herokuapp.com"

const axiosConfig ={ headers: {"Access-Control-Allow-Origin": "https://fliprhackbackend.herokuapp.com/"}}


const  getMatchData =  ()=>{
    let data =  axios.get(`${baseURL}/randommatch`,{
    },axiosConfig.headers)
        .then(function (response){
            // console.log(response)
            return response.data
        })
        .catch(function(error){
            console.log(error)
        })
    return data
}

const  getPlayerCredits =  ()=>{
    let data =  axios.get(`${baseURL}/getcredit`,{
    },axiosConfig.headers)
        .then(function (response){
            // console.log(response.data)
            return response.data
        })
        .catch(function(error){
            console.log(error)
        })
    return data
}


export {getMatchData,getPlayerCredits};