'use client';
import { UserCircle2 } from "lucide-react";
import { UserPlus2 } from "lucide-react";
import { LandingSideBar } from "./landing-sidebar";

export const LandingNavbar = () => {
    return(
        <div className="flex items-center bg-slate-950 
        h-14 border-b border-slate-700">
            <svg className="relative flex">
            </svg>
            <div className="md:hidden">
                <LandingSideBar/>
            </div>
            <ul className="absolute flex flex-wrap xl:left-60 hidden md:inline-flex">
                <li className="flex-1 w-32">
                    <a className="text-center block py-2 text-white font-semibold
                    hover:text-cyan-400" href="info">About Us</a>
                </li>
                <li className="flex-1 w-32">
                    <a className="text-center block text-white font-semibold
                    hover:text-cyan-400 py-2" href="blog">Blog</a>
                </li>
                <li className="flex-1 w-32">
                    <a className="block text-center py-2 text-white font-semibold
                    hover:text-cyan-400" href="subscriptions">Pricing</a>
                </li>
                <li className="flex-1 w-32">
                    <a className="block text-center py-2 text-white font-semibold
                    hover:text-cyan-400" href="support">Support</a>
                </li>
            </ul>
            <ul className="absolute flex top-1 right-2 py-1 xl:right-60">
                <li className="flex w-32">
                    <a className="flex block py-2 space-x-2 text-white font-semibold text-center
                    hover:text-cyan-400" href="auth/register">
                        <UserPlus2/>
                        <div>
                            Sign Up
                        </div>
                    </a>
                </li>
                <li className="flex w-32">
                    <a className="flex block py-2 space-x-2 text-white font-semibold text-center
                    hover:text-cyan-400" href="auth/login">
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