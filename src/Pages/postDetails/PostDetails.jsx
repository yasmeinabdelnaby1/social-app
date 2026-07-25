import axios from 'axios'
import  {  useState } from 'react'
import React, { useContext} from 'react'
import { data, useParams } from 'react-router-dom'
import CardPost from '../../Components/shared/cardPost/CardPost'
import Loading from '../../Components/shared/loading/Loading'
import { tokenContext } from '../../context/tokenContext'
import { useQuery } from '@tanstack/react-query'


export default function postDetails() {

    let { postId } = useParams()
   // console.log(postId)
    let [postDetails, setPostDetails] = useState()
    let { userToken } = useContext(tokenContext)

    async function getSinglePost() {
        let {data} = await axios.get(`https://route-posts.routemisr.com/posts/${postId}`, {
            headers: {
                'Authorization':`Bearer ${userToken}`
            }
        })
        return data
    }
        let { data, isLoading, isError, isFetching } = useQuery({
            queryFn: getSinglePost, 
            queryKey: ['singlePost' , postId],
           // postId clik on post => postDetails
            select : (data)=>data.data.post
            //retry=3 by defult
        }) 
      //  console.log('singlePost' , data)
        if (isLoading){
            return <Loading />
        }
        if (isError){
            return <p className='text-red-600 text-2xl'> There is Error....</p>
        }
        return (
            <div>
                {data ? <CardPost  isDetails={true} post={data} /> : <Loading />}    
            </div>
        )
    
}
