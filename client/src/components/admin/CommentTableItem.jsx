import React from 'react'
import { assets } from '../../assets/assets'

const CommentTableItem = ({ comment, fetchComments }) => {
  const { blog, createdAt } = comment
  const BlogDate = new Date(createdAt)

  return (
    <tr className='border-y border-gray-300'>
      <td className='px-4 py-4 w-[60%]'>
        <p><b className='font-medium text-gray-600'>Blog</b>: {blog.title}</p>
        <br />
        <p><b className='font-medium text-gray-600'>Name</b>: {comment.name}</p>
        <p><b className='font-medium text-gray-600'>Comment</b>: {comment.content}</p>
      </td>

      <td className='px-4 py-4 max-sm:hidden w-[20%]'>
        {BlogDate.toLocaleDateString()}
      </td>

      <td className='px-4 py-4 text-center w-[20%]'>
        <div className='flex items-center justify-center gap-4'>
          {!comment.isApproved ? (
            <img
              src={assets.tick_icon}
              className='w-5 hover:scale-110 transition-all cursor-pointer'
              alt="Approve"
            />
          ) : (
            <p className='text-xs border border-green-600 bg-green-100 text-green-600 rounded-full px-3 py-1'>
              Approved
            </p>
          )}
          <img
            src={assets.bin_icon}
            className='w-5 hover:scale-110 transition-all cursor-pointer'
            alt="Delete"
          />
        </div>
      </td>
    </tr>
  )
}

export default CommentTableItem
