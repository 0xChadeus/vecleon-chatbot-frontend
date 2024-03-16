'use client'
import Image from 'next/image'
import { LandingNavbar } from '@/components/landing-navbar'
import React, {useEffect, useRef, useState} from 'react';    
const axios = require('axios');
import { NavBar } from "@/components/navbar";
import Footer from '@/components/footer';


const BlogPost = (
    { params }: { params: { postId: string }},
  ) => {

    const [userAuthenticated, setUserAuthenticated] = useState(false);
    useEffect(() => {
      axios({
        withCredentials: true,
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/get_authstatus/`,
      }).then(function ( response: any) {
          if(response.data[0] === 'is_authenticated: true') {
            setUserAuthenticated(true);
          } else {
            setUserAuthenticated(false);
            console.log(response.data);
          }
      });  
    }, []);

    const [post, setPost] = useState({
      title: '',
      author: '',
      date: '',
      content: '',
      imageUrl: '',
    });

    const [error, setError] = useState(false);

    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/blogposts/${params.postId}.txt`);
          if (!response.ok) {
            throw new Error('Failed to fetch blog post');
          }
          const fileContents = await response.text();
          const lines = fileContents.split('\n');
          const title = lines[0];
          const author = lines[1].replace(/^Author:\s*/, '');
          const date = lines[2].replace(/^Date:\s*/, '');
          const imageUrl = lines[3].replace(/^Image:\s*/, '');
          const content = lines.slice(5).join('\n');
          setPost({ title, author, date, content, imageUrl });
          setError(false);
        } catch (error) {
          console.error('Error fetching blog post:', error);
          setError(true);
        }
      };

      fetchPost();
    }, [params.postId]);
    return (
        <>
        {userAuthenticated ? <NavBar/> : <LandingNavbar/>}
          <div className="bg-grey h-1/2 h-screen overflow-scroll pb-72">
            <article className="relative flex top-32 flex-col max-w-3xl mx-auto">
              <header className="mb-8">
                <h1 className="text-4xl font-bold mb-2">{post.title}</h1>
                {post.imageUrl && (
                <div className="mb-8">
                  <Image src={post.imageUrl} alt={post.title} width={800} height={400} />
                </div>
                )}
                <div className="text-gray-600">
                  <span>Author: {post.author}</span>
                  <span className="ml-4">Date: {post.date}</span>
                </div>
              </header>
              <div className="prose prose-lg whitespace-pre-wrap">{post.content}</div>
            </article>
          </div>
        <Footer/>
        </>
      );
    
}
  
export default BlogPost;