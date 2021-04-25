export const createUserStore = () =>{
    return{
        user:{
            username: "null",
            email:"null",
            token:null,
            isLogin:false
        }
    }
}