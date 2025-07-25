import React, { useEffect, useState } from 'react';
import { assets, blog_data } from '../../assets/assets';
import BlogTableItem from '../../components/admin/BlogTableItem';

const ListBlog = () => {
  const [blogs, setBlogs] = useState([]);

  const fetchBlogs = () => {
    setBlogs(blog_data);
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div className='flex-1 pt-5 px-5 sm:pt-12 sm:pl-16 bg-blue-50/50'>
      <h1 className="text-2xl font-semibold mb-4">All Blogs</h1>

      <div className='flex items-center gap-4 m-4 mt-6 text-gray-500'>
        <img src={assets.dashboard_icon_4} alt='' />
        <p>Latest Blogs</p>
      </div>

      {/* Fixed height scrollable table */}
      <div className='max-w-4xl shadow rounded-lg bg-white overflow-hidden'>
        <div className='overflow-y-auto max-h-[400px]'>
          <table className='w-full text-sm text-gray-500'>
            <thead className='sticky top-0 bg-white text-xs text-gray-600 uppercase z-10'>
              <tr>
                <th scope='col' className='px-2 py-4 xl:px-6'>#</th>
                <th scope='col' className='px-2 py-4'>Blog Title</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Date</th>
                <th scope='col' className='px-2 py-4 max-sm:hidden'>Status</th>
                <th scope='col' className='px-2 py-4'>Action</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, index) => (
                <BlogTableItem
                  key={blog._id || index}
                  blog={blog}
                  fetchBlogs={fetchBlogs}
                  index={index + 1}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListBlog;
