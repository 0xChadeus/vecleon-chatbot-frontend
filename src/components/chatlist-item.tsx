"use client";
import ReactMarkdown from 'react-markdown'
import classNames from 'classnames';
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
  const handleClick = (event: any) => {
    router.push(`../chat/${id}`)
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
          method: "delete",
          data: {
            id: id  
          },
          url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/delete_chat/`,
          headers: {"X-CSRFToken": csrftoken},
      })
      window.location.reload();
  }

  if(name === '') {
    return;
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


