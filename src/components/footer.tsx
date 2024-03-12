'use client'
import React from 'react';    
import VecleonLogo from '@/components/logo';



//home (landing) page
export default function Footer() {

  return (
      <div id="footer" className='bg-black h-52'>
        <div className="relative flex top-"> 
          <div>
            <a href='https://vecleon.com' className='flex'>
              <VecleonLogo/>
            </a>
          </div>
        <div className="relative flex flex-col top-16 left-12 sm:left-1/4 text-slate-400">
          <a className="absolute flex top-0" href='https://vecleon.com/auth/register'>Valerie</a>
          <a className="absolute flex top-10" href='https://vecleon.com/support'>Contact</a>
          <a className="absolute flex top-20" href='https://vecleon.com/careers'>Careers</a>
        </div>
        <div className="relative flex flex-col top-16 left-48 sm:left-1/3 sm:left-96 text-slate-400">
          <a className="absolute flex top-0" href='https://vecleon.com/partners'>Enterprise</a>
          <a className="absolute flex top-10" href='https://vecleon.com/support'>Support</a>
          <a className="absolute flex top-20" href='https://vecleon.com/blog'>Blog</a>
        </div>
        <div className='absolute flex bottom-2 px-2 py-1 text-xs right-8'>
          &copy; Copyright Vecleon 2024
        </div>
      </div>
      </div>
  )
}

