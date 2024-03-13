'use client'
import Image from 'next/image'
import { LandingNavbar } from '@/components/landing-navbar'
import React, {useEffect, useRef} from 'react';    
import {useScroll, motion, useTransform} from 'framer-motion';
import { Button } from '@/components/ui/button';
import VecleonLogo from '@/components/logo';
import Footer from '@/components/footer';
import {  
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
  CardFooter,
 } from '@/components/ui/card';



//home (landing) page
export default function Blog() {

  const container = useRef(null);
  const {scrollYProgress} = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  });

  const titleScroll = useTransform(scrollYProgress, [0, 1], [0, 700]);
  const bgScroll = useTransform(scrollYProgress, [0, 1], [-100, -200]);
  const infoScroll = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const rd = Math.floor(Math.random() * -75) - 25;

  const blogPosts = [
    {
      id: 1,
      title: 'AI Companions: The Future of Personal Assistants is Here',
      content: 'In our fast-paced, modern world, who couldn\'t use an extra helping hand to boost productivity and efficiency? Enter AI companions - artificially intelligent virtual assistants that offer powerful capabilities as your personal AI assistant interact with computers and access information information information information information information information information information information information information information information interact with computersinteract with computers',
      author: 'John Doe',
      date: 'March 15, 2023'
    },
    {
      id: 2,
      title: 'The Rise of ChatGPT: Exploring the Potential of Conversational AI',
      content: 'In recent months, the tech world has been abuzz with the emergence of ChatGPT, a revolutionary conversational AI system developed by OpenAI. This cutting-edge technology has the potential to transform the way we interact with computers and access information information information information information information information information information information information information information information interact with computersinteract with computers',
      author: 'Jane Smith',
      date: 'February 20, 2023'
    },
    // Add more blog post objects as needed
  ];



  return (
    <>
      <LandingNavbar/>

      <div className="bg-grey h-1/2 h-screen">
      <div id="features" className="text-left">
      <div className="container flex flex-col">
        <div className=" col-md-10 col-md-offset-1 section-title">
          <h1 className="relative flex left-0 text-3xl font-sans top-24 md:top-20 font-extrabold">BLOG</h1>
            <div className="relative flex top-32 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {blogPosts.map((post) => (
                <a href='https://vecleon.com/blog' key={post.id}>
                  <Card className="max-w-md hover:shadow-lg transition-shadow h-full" >
                    <img src={'./background4.png'} alt={post.title} className="w-full h-48 object-cover" />
                    <CardHeader>
                      <CardTitle>{post.title}</CardTitle>
                    </CardHeader>
                    <CardContent className="flex-grow prose prose-sm max-h-40 overflow-hidden">
                      <CardDescription>{post.content}</CardDescription>
                    </CardContent>
                    <CardFooter className="flex justify-between text-muted-foreground">
                      <span>Author: {post.author}</span>
                      <span>Date: {post.date}</span>
                    </CardFooter>
                  </Card>                
                </a>
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

