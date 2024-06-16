'use client'
import { LandingNavbar } from '@/components/landing-navbar'
import React from 'react';    
import Footer from '@/components/footer';
import Image from 'next/image'



//home (landing) page
export default function Info() {

  return (
    <>
    <head>
    <link href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADrF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv/rF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/w4BBSwAAAAAAAAAAAUAAjDrF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv8AAAAA6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADrF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWd7//1ne//9Z3v//Wd7//1ne//9Z3v//Wd7//1ne//9Z3v//Wd7//1ne//9Z3v//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAD+fwAA+B8AAPAPAADDwwAAh+EAAB/4AAA//AAAP/wAAD/8AAA//AAAP/wAAP//AADAAwAA//8AAA==" rel="icon" type="image/x-icon"/>
    </head>
      <LandingNavbar/>

      <div className="bg-grey h-1/2 h-screen">
      <div id="features" className="text-left">
      <div className="container flex flex-col">
        <div className=" col-md-10 col-md-offset-1 section-title top-34">
          <h1 className="relative flex left-0 text-3xl font-sans top-28 md:top-20 font-extrabold">TALK TO ANYONE, FROM ANY WORLD, ANYTIME, ANYWHERE, FOR ANY REASON.</h1>
          <h2 className="relative flex left-0 text-2xl font-sans font-bold top-28 sm:top-40"></h2>
          <h2 className="relative flex left-0 text-md font-sans top-28 sm:top-40"> At Vecleon, our goal is to create a safe and easy place for anyone to make connections with AI companions and characters. It is our belief that AI represents a new frontier of human development, both in terms of economic prosperity and more fundamentally, the way people live. As such, this web application is a stepping stone on the way to realizing this frontier, our hope being that it will serve as a proof of concept for human connection with intelligent machines.</h2>
        </div>
        <div className="mb-8 mt-8 flex relative top-60">
          <Image src={"/background4.jpg"} alt={'lol'} width={900} height={800} />
        </div>
      </div>
      </div>
      </div>

      <Footer/>

    </>
  )
}

