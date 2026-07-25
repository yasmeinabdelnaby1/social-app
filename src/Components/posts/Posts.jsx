import axios from 'axios'
import React, { useContext} from 'react'
import CardPost from '../shared/cardPost/CardPost'
import Loading from '../shared/loading/Loading'
import { useQuery } from '@tanstack/react-query'
import { tokenContext } from '../../context/tokenContext'


export default function Posts() {
    let {userToken} = useContext(tokenContext)
   /// console.log(userToken)

  async  function getAllPosts() {
       // setIsloading(true)
        let {data} = await axios.get(`https://route-posts.routemisr.com/posts?limit=12`, {
            headers: {
                'Authorization':`Bearer ${userToken}`
            }
        })
        return data

    }
  let{data , isLoading , isError , isFetching} =  useQuery({
        queryFn: getAllPosts,
        queryKey: ['post'],
       // retry:3,
       // retryDelay:2000
    })

//console.log('data' , data)
//console.log('isLoading' , isLoading)
//console.log('isError' , isError)
//console.log('isFetching' , isFetching)
if (isLoading){
    return <Loading />
}
if (isError){
            return <p className='text-red-600 text-2xl'> There is Error....</p>
        }
    return (
        < >
            {data?.data?.posts.map((post) => {

                return <CardPost key={post.id} post={post} />

            })}

        </>

    )
}



