'use client';
import { UserCircle2 } from "lucide-react";
import { UserPlus2 } from "lucide-react";
import { LandingSideBar } from "./landing-sidebar";
import VecleonLogo from "./logo";
import React from 'react';    

export const LandingNavbar = () => {
    return(
        <div className="fixed w-full items-center bg-black 
        h-14 z-50 font-sans">
            <div className="absolute flex left-14">
                <span className="svgIcon t-popup-svg">
                    <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/`} className='absolute flex'>
                        <VecleonLogo/>
                    </a>
                </span>
            </div>
            <div className="md:hidden">
                <LandingSideBar/>
            </div>
            <ul className="absolute flex flex-wrap right-1/4 top-2 hidden md:inline-flex">
                <li className="flex-1 w-32">
                    <a className="text-center block py-2 text-white font-semibold
                    hover:underline" href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/info`}>About Us</a>
                </li>
                <li className="flex-1 w-32">
                    <a className="text-center block text-white font-semibold
                    hover:underline py-2" href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/blog`}>Blog</a>
                </li>
                <li className="flex-1 w-32">
                    <a className="block text-center py-2 text-white font-semibold
                    hover:underline" href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/subscriptions`}>Pricing</a>
                </li>
                <li className="flex-1 w-32">
                    <a className="block text-center py-2 text-white font-semibold
                    hover:underline" href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/support`}>Support</a>
                </li>
            </ul>
            <ul className="absolute flex top-1 py-1 right-0">
                <li className="flex w-32">
                    <a className="flex block py-2 space-x-2 text-white font-semibold text-center
                    hover:underline" href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/register`}>
                        <UserPlus2/>
                        <div>
                            Sign Up
                        </div>
                    </a>
                </li>
                <li className="flex w-32">
                    <a className="flex block py-2 space-x-2 text-white font-semibold text-center
                    hover:underline" href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/auth/login`}>
                        <UserCircle2/>
                        <div>
                            Login
                        </div>
                    </a>
                </li>
            </ul>
        </div>
    );
}