'use client';
import classNames from 'classnames';
import { useRouter } from 'next/navigation'
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { ImBook } from "react-icons/im";
import { Menu } from 'lucide-react';
import { ChatList } from './chatlist';
import { ChatCreate } from './chat-create';

export const SideBar = () => {

    return (
        <Sheet>
            <SheetTrigger className="pr-14">
                <ImBook className='text-white absolute hover:text-slate-300
                left-4 top-2 cursor-pointer' 
                size={40}/>
            </SheetTrigger>
            <SheetContent side="left" className='p-0 w-96 pt-10'>
            <div className="flex w-96 flex-col duration-500 ease-out transition-all
            justify-left fixed ab inset-y-0 inset-x-0 bg-black overflow-scroll
            bottom-14"> 
                <div className="flex flex-col group
                h-full w-full text-white ">
                    <div className="fixed p-3 flex-1 justify-center z-50 bg-black w-full">
                    <button form='' className="flex flex-wrap px-4 
                        text-2xl font-semibold hover:text-cyan-200 " 
                        type="submit">
                            <ChatCreate/>
                        </button>
                    </div>
                </div>
                <ChatList/>
            </div>
            <li className="flex fixed bottom-2 left-2">
                <div className='text-lg'>
                    ©  
                </div>
                <div className='px-2 py-1 text-xs'>
                    Copyright Vecleon Pty Ltd. 2023
                </div>
            </li>
            </SheetContent>
        </Sheet>
    );
}