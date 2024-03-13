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
          <h1 className="relative flex left-0 text-3xl font-sans top-24 md:top-20 font-extrabold">BLOG</h1>
          <div className='relative flex flex-col top-32'>
          <h1 >AI Companions: The Future of Personal Assistants is Here</h1>
            In our fast-paced, modern world, who couldn't use an extra helping hand to boost productivity and efficiency? Enter <a href="...">AI companions</a> - artificially intelligent virtual assistants that offer powerful capabilities as your personal AI assistant.
            <h2>What is an AI Companion?</h2>

            Unlike smart speakers or smartphone AI, <a href="...">AI companions</a> provide highly advanced conversational AI tailored to your needs. Think of it as your own personal assistant available 24/7, powered by cutting-edge natural language AI technology.
            <h3>AI Companion Features & Capabilities</h3>

            <a href="...">AI companions</a> can assist you with a vast array of tasks:
            <ul> <li>Running errands & scheduling</li> <li>Researching topics & answering questions</li> <li>Writing & editing assistance</li> <li>Data analysis projects</li> <li>Tutoring & explanations</li> <li>Coding & software development</li> <li>And much more across nearly any domain</li> </ul>

            With seamless, contextual dialogue abilities, you can have natural conversations with your AI companion, asking follow-ups, giving new instructions, or switching topics freely.
            <h2>Benefits of an AI Assistant</h2>

            <b>Available 24/7</b>: No more waiting for office hours - your AI sidekick is always on-call.

            <b>Boost Your Productivity</b>: Let your <a href="...">AI companion</a> handle tasks like research and data analysis, freeing you to focus on bigger priorities.

            <b>Augment Your Intelligence</b>: While not self-aware, AI companions provide powerful augmented intelligence capabilities to complement your own skills.
            <h2>Experience the Future of AI Assistants</h2>

            Don't get left behind - unlock your productivity potential today with a cutting-edge <a href="...">AI companion</a> from [Company]. The future of personal assistants has arrived.
            </div>
        </div>
        </div>
        </div>
      </div>


      <Footer/>

    </>
  )
}

