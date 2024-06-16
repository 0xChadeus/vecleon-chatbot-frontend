'use client'
import Image from 'next/image'
import { LandingNavbar } from '@/components/landing-navbar'
import { NavBar } from "@/components/navbar";
import React, {useEffect, useState} from 'react';    
const axios = require('axios');
import Footer from '@/components/footer';
import {  
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
 } from '@/components/ui/card';
 import Link from 'next/link';
 import path from 'path';
 import fs from 'fs';


 interface BlogPost {
  id: string;
  title: string;
  author: string;
  date: string;
  content: string;
  image: string;
}

//home (landing) page
const Blog = () => {

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

  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const response = await fetch('/api/blogposts');
        const fileNames = await response.json();
        const blogPostPromises = fileNames.map(async (fileName: string) => {
          const fileResponse = await fetch(`/blogposts/${fileName}`);
          const fileContents = await fileResponse.text();
          const lines = fileContents.split('\n');
          const id = fileName.replace('.txt', '');
          const title = lines[0];
          const author = lines[1].replace(/^Author:\s*/, '');
          const date = lines[2].replace(/^Date:\s*/, '');
          const image = lines[3].replace(/^Image:\s*/, '');
          const content = lines.slice(4).join('\n');
          return { id, title, author, date, content, image };
        });
        const blogPosts = await Promise.all(blogPostPromises);
        setBlogPosts(blogPosts);
      } catch (error) {
        console.error('Error fetching blog posts:', error);
      }
    };

    fetchBlogPosts();
  }, []);

  return (
    <>
    <head>
    <link href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADrF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv/rF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/w4BBSwAAAAAAAAAAAUAAjDrF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv8AAAAA6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADrF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWd7//1ne//9Z3v//Wd7//1ne//9Z3v//Wd7//1ne//9Z3v//Wd7//1ne//9Z3v//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAD+fwAA+B8AAPAPAADDwwAAh+EAAB/4AAA//AAAP/wAAD/8AAA//AAAP/wAAP//AADAAwAA//8AAA==" rel="icon" type="image/x-icon"/>
    </head>
      {userAuthenticated ? <NavBar/> : <LandingNavbar/>}

      <div className="bg-grey h-1/2 h-screen overflow-scroll pb-72">
      <div id="features" className="text-left">
      <div className="container flex flex-col">
        <div className=" col-md-10 col-md-offset-1 section-title">
          <h1 className="relative flex left-0 text-3xl font-sans top-20 font-extrabold">BLOG</h1>
            <div className="relative flex top-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {blogPosts.map((post) => (
                <Link key={post.id} href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog/${post.id}`}>
                  <Card className="cursor-pointer">
                    <CardHeader>
                      <Image
                        src={post.image}
                        alt={post.title}
                        width={700}
                        height={600}/>
                      <CardTitle>{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="line-clamp-3">{post.content}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between text-muted-foreground">
                      <span>Author: {post.author}</span>
                      <span>Date: {post.date}</span>
                    </CardFooter>
                  </Card>
                </Link>
              ))}      
              </div>          
            </div>
          </div>
        </div>
      </div>

      


      <Footer/>

    </>
  )
}

export default Blog;
