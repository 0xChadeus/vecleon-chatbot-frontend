'use client'
import Image from 'next/image'
import { LandingNavbar } from '@/components/landing-navbar'
import React, {useEffect, useRef} from 'react';    
import {useScroll, motion, useTransform} from 'framer-motion';



//home (landing) page
export default function Home() {

  const container = useRef(null);
  const {scrollYProgress} = useScroll({
    target: container,
    offset: ['start start', 'end start'],
  });

  const titleScroll = useTransform(scrollYProgress, [0, 1], [0, 700]);
  const bgScroll = useTransform(scrollYProgress, [0, 1], [0, -50]);
  const infoScroll = useTransform(scrollYProgress, [0, 1], [0, -2000]);
  const rd = Math.floor(Math.random() * -75) - 25;

  return (
    <>
      <LandingNavbar/>
      <motion.h1 style={{y:titleScroll}}  className="flex absolute top-1/4 md:left-1/2 sm:left-10 md:text-7xl sm:text-6xl font-mono font-extrabold drop-shadow-[0_3px_3px_rgba(0,0,0,0.99)]" >AI PRODUCTS THAT ELEVATE EVERYTHING</motion.h1>  
      <motion.div className="flex relative shrink-0 bg-img" style={{y:bgScroll}}>
        <Image src={'/background4.png'} alt={''} fill={true} objectFit="cover"/>
      </motion.div>

      <motion.div className="bg-slate-950 h-screen w-full" style={{y:infoScroll}}>

      <div id="features" className="text-center">
      <div className="container">
        <div className="col-md-10 col-md-offset-1 section-title">
          <h2>PLACEHOLDER</h2>
          <h2>PLACEHOLDER</h2>
          <h2>PLACEHOLDER</h2>
          <h2>PLACEHOLDER</h2>
          <h2>PLACEHOLDER</h2>
          <h2>PLACEHOLDER</h2>
          <h2>PLACEHOLDER</h2>

        </div>
        <div className="row">

        </div>
        </div>
      </div>
      </motion.div>


    </>
  )
}

