'use client';
import { BookOpen, CreditCard, HeartHandshake, Info, Menu } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';
import { ImBook } from "react-icons/im";

export const LandingSideBar = () => {

    return (
        <Sheet>
            <SheetTrigger className="pr-14">
                <Menu className='text-white absolute hover:text-slate-300 
                left-4 top-2 cursor-pointer' 
                size={40}/>
            </SheetTrigger>
            <SheetContent side="left" className='p-0 w-96 pt-10'>
                <a href='./'>
                <img className="w-32 relative left-28"
                    src="/placeholder.svg"
                    alt="logo" />
                </a>
                <li className="flex-1">
                    <a className="text-center block py-16 text-white font-semibold
                    hover:text-cyan-400 text-xl w-66 h-66" href="info">
                        <Info className='relative left-28 top-6'/>
                        <div>
                            About Us
                        </div>
                    </a>
                </li>
                <li className="flex-1">
                    <a className="text-center py-16 block text-white font-semibold
                    hover:text-cyan-400 py-2 w-66 h-66 text-xl" href="blog">
                        <BookOpen className='relative left-28 top-7'/>
                        <div>
                            Blog
                        </div>
                    </a>
                </li>
                <li className="flex-1">
                    <a className="block text-center py-16 text-white font-semibold
                    hover:text-cyan-400 w-66 h-66 text-xl" href="subscriptions">
                        <CreditCard className='relative left-28 top-7'/>
                        <div>
                            Pricing
                        </div>
                    </a>
                </li>
                <li className="flex-1">
                    <a className="block text-center py-16 text-white font-semibold
                    hover:text-cyan-400 w-66 h-66 text-xl" href="support">
                        <HeartHandshake className='relative left-28 top-7'/>
                        <div>
                            Support
                        </div>
                    </a>
                </li>
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