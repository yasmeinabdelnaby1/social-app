import axios from 'axios'
import React, { useContext } from 'react'
import { data, useParams } from 'react-router-dom'
import CardPost from '../../Components/shared/cardPost/CardPost'
import { useQuery } from '@tanstack/react-query'
import { tokenContext } from '../../context/tokenContext'
import user from '../../assets/images/user.png';



export default function CommentsDetails({ post }) {
    let { userToken } = useContext(tokenContext)

    async function getCommments() {
        let { data } = await axios.get(`https://route-posts.routemisr.com/posts/${post._id}/comments?page=1&limit=10`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        // console.log('API Response:', data);
        return data?.data?.comments
    }

    let { data: comments, isLoading, isError, isFetching } = useQuery({
        queryFn: getCommments,
        queryKey: ['getcomments', post._id],
    })
    if (isLoading) {
        return <p className='text-sky-600 text-center'>Loading Comments.....</p>
    }
    if (isError) {
        return <p className='text-red-600 text-2xl'> There is Error....</p>
    }
    return (
        <>
            {comments.map((comment) => {
                return <div key={comment._id} className='flex items-center space-x-2'>
                    <img
                        src={
                            comment?.commentCreator?.photo && !comment?.commentCreator?.photo.includes('undefined')
                                ? comment.commentCreator.photo
                                : user}
                        alt='User Avatar'
                        className='w-8 h-8 rounded-full object-cover'
                    />
                    <div>
                        <p className='text-gray-800 font-semibold text-sm'>{comment?.commentCreator?.name}</p>
                        <p className='text-gray-500 text-sm'>{comment?.content}</p>
                    </div>
                </div>



            })}

        </>
    )

}




















