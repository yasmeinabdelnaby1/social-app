import React, { useContext } from 'react'
import nature from '../../../assets/images/nature.png'
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Button } from "@heroui/react";
import { CiMenuKebab } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { FaFilePen } from "react-icons/fa6";
import { tokenContext } from '../../../context/tokenContext';
import axios from 'axios';
import { Mutation } from '@tanstack/react-query';
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@heroui/react';



export default function HeaderCard({ post }) {

    let { userData } = useContext(tokenContext);
   // console.log(userData);
   // console.log(post._id);
    
let {userToken} = useContext(tokenContext);


async function deletUserPost (){
  let {data} =   await  axios.delete(`https://route-posts.routemisr.com//posts/${post._id}`, {
            headers: {
                'Authorization':`Bearer ${userToken}`
            }
        })
        return data?.data
        
    }
    const queryClient = useQueryClient()

    let { mutate } = useMutation({
        mutationFn:deletUserPost,
        onSuccess: (data) => {
            console.log(data);
            queryClient.invalidateQueries({
                queryKey: ['post'],


            }),
                queryClient.invalidateQueries({
                    queryKey: ['profilePosts'],

                })  
                             toast.success(data?.message);
   
        },

        onError: () => {
        },
    })


    return (
        <div>
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                    <img src={post.user.photo} alt="User Avatar" className="w-8 h-8 rounded-full" />
                    <div>
                        <p className="text-gray-800 font-semibold">{post.user?.name}</p>
                        <p className="text-gray-500 text-sm">{post.createdAt?.split('T')[0]}</p>
                    </div>
                </div>

                <div className="text-gray-500 cursor-pointer">
                    {userData?._id === post.user._id && ( 
                        <Dropdown>
                            <DropdownTrigger>
                                <Button isIconOnly variant="light"> 
                                    <CiMenuKebab size={20} />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu aria-label="Post Actions">
                                <DropdownItem
                                    key="update" 
                                    startContent={<FaFilePen size={18} />}
                                    className="text-blue-950 font-semibold"
                                >
                                    Update
                                </DropdownItem>
                                <DropdownItem onClick={() => mutate()}
                                    key="delete"
                                    startContent={<MdDelete size={18} />}
                                    className="text-danger font-semibold"
                                    color="danger"
                                >
                                    Delete
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    )}
                </div>
            </div>

            {/* message */}
            <div className="mb-4">
                <p className="text-gray-800">{post.body}</p>
            </div>

            {/* Image */}
            <div className="mb-4">
                <img
                    src={post.image? post.image : nature}
                    alt="Post Image"
                    className="w-full h-96 object-cover rounded-md"
                />
            </div>
        </div>
    )
}