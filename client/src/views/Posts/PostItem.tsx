import React from 'react'

interface IPost {
  _id: string
  title: string
  content: string
  user: string
  username: string
  avatar: string
  date: string
}

interface PostItemProps {
  post: IPost
}

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return <div>abc</div>
}

export { PostItem }
