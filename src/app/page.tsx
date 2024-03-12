'use client'
import Image from 'next/image'
import { LandingNavbar } from '@/components/landing-navbar'
import React, {useEffect, useRef} from 'react';    
import {useScroll, motion, useTransform} from 'framer-motion';
import { Button } from '@/components/ui/button';
import VecleonLogo from '@/components/logo';



//home (landing) page
export default function Home() {

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
      <motion.h1 style={{y:titleScroll}}  className="flex absolute top-1/4 md:left-1/2 sm:left-10 left-10 md:text-7xl sm:text-6xl text-5xl font-mono font-extrabold drop-shadow-[0_3px_3px_rgba(0,0,0,0.99)]" >AI PRODUCTS THAT ELEVATE YOUR LIFE</motion.h1>  
      <motion.div className="flex relative shrink-0 bg-img" style={{y:bgScroll}}>
        <Image src={'/background4.png'} alt={''} fill={true} objectFit="cover"/>
      </motion.div>

      <motion.div className="bg-grey h-1/2 sm:h-96 sm:h-dvh" style={{y:infoScroll}}>
      <div id="features" className="text-left">
      <div className="container flex flex-col">
        <div className=" col-md-10 col-md-offset-1 section-title">
          <h2 className="relative flex left-0 text-3xl font-sans top-12 md:top-20 font-extrabold">YOUR VERY OWN AI COMPANION, ASSISTANT, FAVORITE CHARACTER, AND TUTOR. UNCENSORED. ALL IN ONE PLACE.</h2>
          <h3 className="relative flex left-0 text-2xl font-sans font-bold top-28 sm:top-40">Valerie&apos;s Storybook</h3>
          <h4 className="relative flex left-0 text-md font-sans top-28 sm:top-40"> Chat with your favorite characters, original and otherwise.</h4>
          <a href="https://vecleon.com/auth/register">
          <Button className='relative flex top-28 sm:top-44 font-extrabold text-lg' size={"lg"}> GET STARTED </Button>
          </a>
          <h3 className="relative flex left-0 text-2xl font-sans font-bold top-32 sm:top-48">Vecleon Assistant</h3>
          <h4 className="relative flex left-0 text-md font-sans top-32 sm:top-48"> Get advice and tutoring from state-of-the-art assistant models.</h4>
          <Button className='relative flex top-32 sm:top-52 font-extrabold text-lg' size={"lg"} variant={'outline'}> COMING SOON</Button>
        </div>
      </div>
      </div>
      </motion.div>

      <footer className="bg-black h-52 text-left w-full">
        <div className="relative flex top-3 left-6"> 
          <span className="svgIcon t-popup-svg">
            <a href='https://vecleon.com' className='flex'>
              <VecleonLogo/>
            </a>
          </span>
        </div>
        <div className="relative flex top-0 left-1/3 text-slate-400">
          <a>Valerie </a>
          <a className="relative flex left-36"> Enterprise</a>
          {/* <a className="relative flex left-72"> 1</a> */}
        </div>
        <a className="relative flex top-4 left-1/3 text-slate-400">
          <a href={"https://vecleon.com/info"}>Company </a>
          {/* <a className="absolute flex left-48"> uanifus</a>
          <a className="absolute flex left-96"> uanifus</a> */}
        </a>
        <a className="relative flex top-8 left-1/3 text-slate-400">
          <a>Contact </a>
          {/* <a className="absolute flex left-34"> uanifus</a>
          <a className="relative flex left-72"> uanifus</a> */}
        </a>

        <div className='absolute flex px-2 py-1 text-xs right-8'>
        ©   Copyright Vecleon 2024
        </div>
      </footer>

    </>
  )
}

