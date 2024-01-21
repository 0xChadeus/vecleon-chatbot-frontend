import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Trash2 } from "lucide-react"
import { CSRFToken } from "./csrftoken"
import { AlertDialogDescription, AlertDialogTitle } from "@radix-ui/react-alert-dialog"
import { useRouter } from "next/navigation"
const axios = require("axios");
import { useState } from "react"
import { s3Delete } from "./aws-s3"

interface DeleteDialogProps {
    id: string;
    src: string;
}

export const DeleteDialog = ({
    id,
    src,
}: DeleteDialogProps) => {
    const router = useRouter();

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

    const deleteCharacter = async (event: any) => {
        const csrftoken = getCookie('csrftoken');

        console.log('src: ' + src);
        const urlParts = src.split('/');
        const imageName = urlParts.pop();
        const folder = urlParts.pop();
        const s3Item = folder + '/' + imageName
        console.log('meme: ' + s3Item);
        s3Delete(s3Item);

        await axios({
            withCredentials: true,
            method: "delete",
            data: {
              id: id  
            },
            url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/delete_character`,
            headers: {"X-CSRFToken": csrftoken},
        })
        window.location.reload();
    }

    const deleteWorld = (event: any) => {
        const csrftoken = getCookie('csrftoken');
        axios({
            withCredentials: true,
            method: "delete",
            data: {
                id: id  
            },  
            url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/delete_world`,
            headers: {"X-CSRFToken": csrftoken},
        })
    }

    const deleteChat = (event: any) => {
        const csrftoken = getCookie('csrftoken');
        axios({
            withCredentials: true,
            method: "delete",
            data: {
                id: id  
            },  
            url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/delete_chat`,
            headers: {"X-CSRFToken": csrftoken},
        })
    }


  return (
    <>
    <CSRFToken/>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="bg-white absolute right-2">
              <Trash2></Trash2>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="">
      <AlertDialogHeader>
          <AlertDialogTitle className="font-extrabold">Are you sure you want to delete this character?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this character, including all their chats.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel</AlertDialogCancel>
          <AlertDialogAction 
          onClick={deleteCharacter}>
            Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}
