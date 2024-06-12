'use client';
import { ProfileMenu } from "@/components/profile_menu";
import { SideBar } from './sidebar';
import { ChatList } from './chatlist';
import VecleonLogo from "./logo";

export const NavBar = () => {
    return(
        <div className="fixed w-full flex items-center bg-black 
        h-14 z-50 border-b border-slate-700">
            <div className="absolute flex top-0">
                <a href={`${process.env.NEXT_PUBLIC_FRONTEND_URL}/`} className='absolute flex'>
                    <VecleonLogo/>
                </a>
            </div>
            <div className="absolute flex left-20 top-0">
            <SideBar/>
            </div>
            <ul className="absolute top-1 right-4 py-1">
                <ProfileMenu/>
            </ul>
        </div>
    );
}
