'use client'
import Image from 'next/image'
import { LandingNavbar } from '@/components/landing-navbar'
import React, {useEffect, useRef, useState} from 'react';    
const axios = require('axios');
import { NavBar } from "@/components/navbar";
import Footer from '@/components/footer';


const Terms = (
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

    const [tos, setTos] = useState('');
    const [error, setError] = useState(false);

    useEffect(() => {
      const fetchPost = async () => {
        try {
          const response = await fetch(`/tos.txt`);
          if (!response.ok) {
            throw new Error('Failed to fetch tos');
          }
          const fileContents = await response.text();
          const terms = fileContents;
          setTos(terms);
        } catch (error) {
          console.error('Error fetching tos:', error);
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
                <h1 className="font-extrabold font-3xl">
                    Terms of Use for All Services Provided by Vecleon Pty. Ltd.
                </h1>
                <div className="prose prose-lg whitespace-pre-wrap pt-14">
                    {tos}
                </div>
            </article>
          </div>
        <Footer/>
        </>
      );
    
}
  
export default Terms;