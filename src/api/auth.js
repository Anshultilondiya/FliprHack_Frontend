import axios from "axios";

const baseURL="https://fliprhackbackend.herokuapp.com"

const axiosConfig ={ headers: {"Access-Control-Allow-Origin": "https://fliprhackbackend.herokuapp.com"}}


const loginUser =(el)=>{
    let data = axios.post(`${baseURL}/api/auth/login`,{
        username : el.username,
        password : el.password
    },axiosConfig.headers)
        .then(function (response){
            console.log(response)
            let obj = {
                data: response.data,
                status : response.status
            }
            return obj
        })
        .catch(function(error){
            console.log(error)
            let obj = {
                status : 400
            }
            return obj
        })
    return data
}

const createUser = (el)=>{
    let data = axios.post(`${baseURL}/api/auth/register`,{
        username : el.username,
        password : el.password,
        email:el.email
    },axiosConfig.headers)
        .then(function (response){
            console.log(response)
            return response.data
        })
        .catch(function(error){
            console.log(error)
            let obj = {
                status : 400
            }
            return obj
        })
    return data
}

const Logout = (token)=>{
    axios.post(`${baseURL}/api/auth/logout`,{},{
        headers:{
            "authorization": `Token ${token}`,
        }
    })
        .then(function (response){
            console.log(response)
            console.log("LOGOUT")
        })
        .catch(function(error){
            console.log(error)

        })
}





export {loginUser,createUser,Logout};