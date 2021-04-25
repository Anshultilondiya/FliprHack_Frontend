import axios from "axios";

const baseURL="http://127.0.0.1:8000"

const axiosConfig ={ headers: {"Access-Control-Allow-Origin": "http://localhost:3000/"}}


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