import React, { useContext, useState } from 'react'
import user from '../../../assets/images/user.png';
import { Link } from 'react-router-dom';
import CommentsDetails from '../../commentsDetails/CommentsDetails';
import { useForm } from 'react-hook-form';
import { useRef } from 'react';
import { tokenContext } from '../../../context/tokenContext';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@heroui/react';
import axios from 'axios'
import { RiSendPlaneFill } from 'react-icons/ri'
import { ImImages } from 'react-icons/im'

export default function Comments({ post, details }) {


    let {userToken} = useContext(tokenContext)
    let [selectedImage, setSelectedImage] = useState(null)
    let inputFile = useRef()

    let { register, handleSubmit, reset } = useForm({
        defaultValues: {
            content: ''
        }
    })

    function createPostComment(data) {
        console.log(data.content);

        const form = new FormData()
        form.append('content', data.content)
            if (selectedImage) {
                form.append('image', selectedImage)
            } 

        mutate(form)

    }

    async function sendData(formData) {
        let { data } = await axios.post(`https://route-posts.routemisr.com/posts/${post._id}/comments`, formData, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        return data?.data?.comments
    }


    const queryClient = useQueryClient()

    let { mutate } = useMutation({
        mutationFn: sendData,
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['getcomments'],

            }),
                queryClient.invalidateQueries({
                    queryKey: ["post"],

                }),
                reset();
            setSelectedImage(null)
            toast.success(data.message)
            // console.log(data);
        },

        onError: () => {
        },
    })



    function getImageFile(e) {
        // console.log('change' ,e.target.files[0] );
        setSelectedImage(e.target.files[0])
    }
    return (
        <div>
            <div className="flex items-center justify-between text-gray-500">
                <div className="flex items-center space-x-2">
                    <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                        <svg className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M12 21.35l-1.45-1.32C6.11 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-4.11 6.86-8.55 11.54L12 21.35z" />
                        </svg>
                        <span>55 Likes </span>
                    </button>
                </div>
                <button className="flex justify-center items-center gap-2 px-2 hover:bg-gray-50 rounded-full p-1">
                    <svg width="22px" height="22px" viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 13.5997 2.37562 15.1116 3.04346 16.4525C3.22094 16.8088 3.28001 17.2161 3.17712 17.6006L2.58151 19.8267C2.32295 20.793 3.20701 21.677 4.17335 21.4185L6.39939 20.8229C6.78393 20.72 7.19121 20.7791 7.54753 20.9565C8.88837 21.6244 10.4003 22 12 22ZM8 13.25C7.58579 13.25 7.25 13.5858 7.25 14C7.25 14.4142 7.58579 14.75 8 14.75H13.5C13.9142 14.75 14.25 14.4142 14.25 14C14.25 13.5858 13.9142 13.25 13.5 13.25H8ZM7.25 10.5C7.25 10.0858 7.58579 9.75 8 9.75H16C16.4142 9.75 16.75 10.0858 16.75 10.5C16.75 10.9142 16.4142 11.25 16 11.25H8C7.58579 11.25 7.25 10.9142 7.25 10.5Z" />
                    </svg>
                    <span>{post?.commentsCount}</span>
                </button>
            </div>

            <hr className="mt-2 mb-2" />

            <div className='flex justify-between w-full'>
                <p className="text-gray-800 font-semibold">Comment</p>
                {!details ? (
                    <Link to={`/postDetails/${post._id}`}>
                        <p className='text-sky-700 font-semibold'>View Details...</p>
                    </Link>
                ) : null}
            </div>

            <hr className='mt-2 mb-2' />
            <form onSubmit={handleSubmit(createPostComment)} >
                <div className='bg-transparent flex items-center gap-2 '>
                    <input {...register('content', { required: true })}
                        type="text"
                        placeholder="Add Your Comment.."
                        className=" bg-gray-100 outline-none text-sm 
            text-gray-900  w-full rounded-full px-4 py-2
            placeholder:text-gray-500 "
                    />
                    <button
                        type="button"
                        onClick={() => inputFile.current.click()}
                    >
                        < ImImages size={25} className='text-sky-700' />
                    </button>
                    <button
                        type="submit"  >
                        <  RiSendPlaneFill size={25} className='text-sky-700 ' />
                    </button>
                    <input ref={inputFile} type="file" hidden onChange={getImageFile} />

                </div>
            </form>


            <div className="mt-4">
                {!details ? ( // لو مش صفحة التفاصيل اعرضي اول كومنت بس
                    post?.commentsCount > 0 ? (
                        <div className='flex items-start gap-2'>
                            <img
                                src={
                                    post?.commentCreator?.photo && !post?.commentCreator?.photo.includes('undefined')
                                        ? post?.commentCreator.photo
                                        : user}
                                alt='User Avatar'
                                className='w-8 h-8 rounded-full object-cover'
                            />

                            <div>
                                <p className='text-gray-800 font-semibold text-sm'>{post?.topComment?.commentCreator?.name}</p>
                                <p className='text-gray-500 text-sm'>{post?.topComment?.content}</p>
                            </div>
                        </div>
                    ) : (
                        <p className='text-gray-400 text-sm'>No comments yet</p>
                    )
                ) : (
                    <CommentsDetails post={post} />
                )}
            </div>
        </div>
    )
}