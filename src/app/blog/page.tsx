'use client'
import Image from 'next/image'
import { LandingNavbar } from '@/components/landing-navbar'
import React, {useEffect, useRef} from 'react';    
import {useScroll, motion, useTransform} from 'framer-motion';
import { Button } from '@/components/ui/button';
import VecleonLogo from '@/components/logo';
import Footer from '@/components/footer';



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

  return (
    <>
      <LandingNavbar/>

      <div className="bg-grey h-1/2 h-screen">
      <div id="features" className="text-left">
      <div className="container flex flex-col">
        <div className=" col-md-10 col-md-offset-1 section-title">
          <h2 className="relative flex left-0 text-3xl font-sans top-24 md:top-20 font-extrabold">BLOG</h2>
          <h3 className="relative flex left-0 text-2xl font-sans font-bold top-28 sm:top-40"></h3>
          <h4 className="relative flex left-0 text-md font-sans top-28 sm:top-40"> cyka blyat</h4>
        </div>
      </div>
      </div>
      </div>

      <Footer/>

    </>
  )
}

