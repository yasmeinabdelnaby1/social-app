 
 import axios from "axios";
 
 
 export async function sendRegisterData(dataForm){
     let {data}= await axios.post(`https://route-posts.routemisr.com/users/signup`, dataForm)

return data
  };
