import { Card, CardHeader, CardBody, CardFooter, Divider, Link, Image } from "@heroui/react";
import { useContext, useRef } from "react";
import { tokenContext } from "../../../context/tokenContext";
import { defaultValueTypes } from "framer-motion";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Avatar } from "@heroui/react";
import { useMatches } from "react-router-dom";
import { QueryClient, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@heroui/react';
import axios from 'axios'
import { ImImages } from 'react-icons/im'



export default function CreatePost() {

    let { userData, userToken } = useContext(tokenContext)
    let [imgSrc, setSrc] = useState(null)

    let [selectedFile, setSelectedFile] = useState(null)


    let inputFile = useRef()
    let { register, handleSubmit, reset } = useForm
        ({
            defaultValues: {
                body: ''
            }
        })

    function submiteForm(data) {
       // console.log(data);
        const fd = new FormData();
        fd.append('body', data.body)
if(selectedFile) {
     fd.append('image', selectedFile)
}
      //send data to api
        mutate(fd)
    }

    function getImageFile(e) {
      //  console.log('change', URL.createObjectURL(e.target.files[0]))
        setSrc(URL.createObjectURL(e.target.files[0]))
        setSelectedFile(e.target.files[0])

    }




    async function sendDataToApi(formData) {
        let { data } = await axios.post(`https://route-posts.routemisr.com/posts`, formData, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        })
        return data?.data
    }


    const queryClient = useQueryClient()

    let { mutate } = useMutation({
        mutationFn: sendDataToApi,
        onSuccess: (data) => {
            reset(),
                setSrc(null),
                setSelectedFile(null),
            queryClient.invalidateQueries({
                queryKey: ['post'],


            }),
                queryClient.invalidateQueries({
                    queryKey: ['profilePosts'],

                }),
                                setSelectedImage(null)


            // console.log(data);
        },

        onError: () => {
        },
    })
    return (
        <Card className=" w-full max-w-2xl mx-auto px-2 sm:px-4 ">
            <CardHeader className="flex gap-3">
                <Image
                    alt="heroui logo"
                    height={40}
                    radius="sm"
                    src={userData?.photo} />
                <div className="flex flex-col">
                    <p className="text-md"> {userData?.name}</p>

                    <p className="text-small text-default-500">Create Post</p>
                </div>
            </CardHeader>
            <Divider />

            <form onSubmit={handleSubmit(submiteForm)}>
                <CardBody>
                    <input{...register('body')} type="text" placeholder="What is in your mind ...?" />

                </CardBody>
                <Divider />
                <CardFooter>
                    <div className=" flex justify-end w-full items-center">
                        {imgSrc && <img src={imgSrc} width='100' alt="..." />
                        }
                        <button type="button" onClick={() => inputFile.current.click()} >

                            < ImImages size={25} className='text-sky-700' />

                        </button>
                        <input type="file" onChange={getImageFile} ref={inputFile} hidden />
                        <button type="submit"
                            className="bg-blue-600 hover:bg-blue-800  text-white rounded-full px-5 py-1.5 
            text-sm font-semibold cursor-pointer m-1 "  >
                            Create
                        </button>
                    </div>
                </CardFooter>
            </form>
        </Card>
    );
}
