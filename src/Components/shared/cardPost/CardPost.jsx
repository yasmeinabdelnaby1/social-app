import React from 'react'
import HeaderCard from '../headerCard/HeaderCard'
import Comments from '../coments/Comments'
import { Link } from 'react-router-dom'
import CommentsDetails from '../../commentsDetails/CommentsDetails'

export default function CardPost({ post , isDetails }) {
    return (
        <div>
            <div className="  min-h-screen flex items-center justify-center">
                <div className="bg-white p-7 rounded-lg shadow-md w-lg mb-4 ">
                        <HeaderCard post={post} />
                    <Comments post={post} details={isDetails} />
                </div>
            </div>



        </div>
    )
}
