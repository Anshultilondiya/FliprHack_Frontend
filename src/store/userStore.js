export const createUserStore = () =>{
    return{
        user:{
            username: "null",
            email:"null",
            token:null,
            isLogin:false
        },
        addName(el){
            this.user.username = el
        },
        addEmail(el){
            this.user.email = el
        },
        addToken(el){
          this.user.token = el
        },
        confirmLogin(){
            this.user.isLogin = false
        }
    }
}