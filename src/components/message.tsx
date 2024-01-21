"use client";
import ReactMarkdown from 'react-markdown'
import classNames from 'classnames';
import { useEffect, useState } from 'react';
const axios = require('axios');


export interface MessageProps {
  role: "ai" | "user";
  content: string;
  src?: string;
  images?: string[];
  audio?: string;
}

export const Message = ({
  role,
  content,
  src,
  images,
  audio,
}: MessageProps) => {
  if(content === '') {
    return;
  }

  
  return(
    <div className={classNames(
      "flex py-4",
      role === "user" && "justify-end",
      role === "ai" && "justify-start"
    )}> 
      <img className="mx-4 w-21 h-28 rounded-2xl bg-white"
          src={src}
      />
      <div className={classNames(
        'flex flex-row mx-4 space-x-4 rounded-xl',
        role === "user" && "bg-indigo-950 justify-end text-white",
        role === "ai" && "bg-black text-white")}>
        <div className='flex flex-col border border-white rounded-xl py-8 px-12'>
          <div className='flex flex-row'>
            {images?.map((image) => (
              image?
              <div className='w-80 py-3 px-3'>
                <img className="mx-4 rounded-2xl bg-white"
                  src={image}
                />
              </div>:
              <div/>
            ))}
          </div>
            {audio? <audio controls src={audio}/> : <div/>}
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>
      </div>
    </div>
  );
};





