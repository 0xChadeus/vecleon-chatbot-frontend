"use client";
import ReactMarkdown from 'react-markdown'
import classNames from 'classnames';
import {DeleteMessageDialog} from './delete-message-dialog'; 


export interface MessageProps {
  role: "ai" | "user";
  content: string;
  src?: string;
  images?: string[];
  audio?: string;
  mes_id: string;
  chat_id: string;
}

export const Message = ({
  role,
  content,
  src,
  images,
  audio,
  mes_id,
  chat_id,
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
            {images?.map((image, index) => (
              image?
              <div className='w-80 py-3 px-3' key={index}>
                <img className="mx-4 rounded-2xl bg-white"
                  src={image}
                />
              </div>:
              <div key={index}/>
            ))}
          </div>
            {audio? <audio controls src={audio}/> : <div/>}
          <ReactMarkdown>{content}</ReactMarkdown>
          <div className="pt-4">
            <DeleteMessageDialog id={mes_id} chatId={chat_id}/>
          </div>
        </div>
      </div>
    </div>
  );
};





