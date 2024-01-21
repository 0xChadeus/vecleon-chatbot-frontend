'use client';
import { ProfileMenu } from "@/components/profile_menu";
import { SideBar } from './sidebar';
import { ChatList } from './chatlist';

export const NavBar = () => {
    return(
        <div className="fixed w-full flex items-center bg-slate-950 
        h-14 z-50 border-b border-slate-700">
            <SideBar/>
            <svg className="relative flex">
            </svg>
            <ul className="absolute top-1 right-4 py-1">
                <ProfileMenu/>
            </ul>
        </div>
    );
}