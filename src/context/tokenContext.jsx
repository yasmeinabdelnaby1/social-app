import axios from "axios";
import { createContext, useEffect, useState } from "react";



 export const tokenContext = createContext();
export function TokenContextProvider ({children}){

//lazy initionlization
let [userToken , setToken] = useState(()=>{
    return localStorage.getItem('token')
})

let [userData , setData] =  useState(null)
//did mount
useEffect (() =>{
  // let token = localStorage.getItem('token') ;
if (localStorage.getItem('token') !== null) {

axios.get( `https://route-posts.routemisr.com/users/profile-data`,{
    headers:{
                'Authorization':`Bearer ${userToken}`
    }
}).then((response)=>{
   // console.log('profile'  ,response.data.data.user)
    setData(response.data.data.user)
})

}},[])

    return <tokenContext.Provider value={{userToken , setToken, userData }} >
        {children}
    </tokenContext.Provider>
}