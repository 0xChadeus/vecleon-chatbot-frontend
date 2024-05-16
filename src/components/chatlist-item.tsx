"use client";
import { useRouter } from 'next/navigation';
import { Button } from './ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Trash2 } from 'lucide-react';
import { useState, useEffect } from "react";
const axios = require("axios");

export interface ChatListItemProps {
  id: string;
  name: string;
  character_name: string;
  src?: string;
}

export const ChatListItem = ({
  id,
  name,
  character_name,
  src
}: ChatListItemProps) => {
  const router = useRouter();

  const [userSrc, setUserSrc] = useState<string>(''); 

  const handleClick = (event: any) => {
    router.push(`${process.env.NEXT_PUBLIC_SELF_URL}/chat/${id}/`)
  }
  function getCookie(name: any) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        const cookies = document.cookie.split(';');
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Does this cookie string begin with the  name we want?
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
  }    

  const deleteChat = async (event: any) => {
      const csrftoken = getCookie('csrftoken');
      await axios({
        withCredentials: true,
        method: 'put',
        url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/get_chat/`,
        data: {
          chat_id: id
        },
        headers: {"X-CSRFToken": csrftoken},
      }).then((response: any) => {
          setUserSrc(response.data.user_img);
      });  
        console.log('src: ' + userSrc);
        const urlParts = userSrc.split('/');
        const imageName = urlParts.pop();
        let folder = urlParts.pop();
        folder = urlParts.pop() + '/' + folder;
        folder = urlParts.pop() + '/' + folder;
        const s3Item = folder + '/' + imageName
        console.log('FOLDER: ' + folder);
        console.log('meme: ' + s3Item);
        const deleteResponse = await fetch('/api/aws/', 
                                        { method:'DELETE', 
                                        body: JSON.stringify({ imageName: s3Item }) 
                                        });
      await axios({
          withCredentials: true,
          method: "delete",
          data: {
            chat_id: id  
          },
          url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/delete_chat/`,
          headers: {"X-CSRFToken": csrftoken},
      })
      router.push(`${process.env.NEXT_PUBLIC_FRONTEND_URL}/edit/characters/`)
  }

  return(
    <div className={"group flex w-full \
        bg-black rounded-lg my-0.5 \
        py-1 overflow-hidden h-24\
        border border-white border-4"}> 
      <img className="mx-2 rounded-lg bg-black"
          src={src}
      />
      <div className="flex flex-col">
        <Button size="sm" variant="outline" className="bg-white text-black text-lg" onClick={handleClick}>
            {name}
        </Button>
        <div className="mx-4 text-white">
          Chatting with:
        </div>
        <div className="mx-4 text-cyan-600">
          {character_name}
        </div>
      </div>
      <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="sm" className="bg-white text-black absolute right-8">
              <Trash2></Trash2>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="">
      <AlertDialogHeader>
          <AlertDialogTitle className="font-extrabold">Are you sure you want to delete this chat?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this chat.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel</AlertDialogCancel>
          <AlertDialogAction 
          onClick={deleteChat}>
            Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};


