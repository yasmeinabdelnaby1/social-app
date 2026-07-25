import React from 'react'
import Posts from '../../Components/posts/Posts'
import CreatePost from '../../Components/shared/createPost/CreatePost'
export default function Home() {
  return (
    <div>
      <CreatePost />
 <Posts />
    </div>
  )
}
