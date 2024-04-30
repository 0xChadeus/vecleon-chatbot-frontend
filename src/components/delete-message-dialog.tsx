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
import { Trash2 } from "lucide-react"
import { CSRFToken } from "./csrftoken"
import { AlertDialogDescription, AlertDialogTitle } from "@radix-ui/react-alert-dialog"
const axios = require("axios");

interface DeleteMessageDialogProps {
    id: string;
    src?: string;
}

export const DeleteMessageDialog = ({
    id,
    src,
}: DeleteMessageDialogProps) => {
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

    const deleteMessage = async (event: any) => {
        const csrftoken = getCookie('csrftoken');

        await axios({
            withCredentials: true,
            method: "delete",
            data: {
              id: id  
            },
            url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/delete_message/`,
            headers: {"X-CSRFToken": csrftoken},
        })
        window.location.reload();
    }

  
  return (
    <>
    <CSRFToken/>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="bg-white text-black absolute right-2">
              <Trash2></Trash2>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="">
      <AlertDialogHeader>
          <AlertDialogTitle className="font-extrabold">Are you sure you want to delete this message?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete this message.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel</AlertDialogCancel>
          <AlertDialogAction 
          onClick={deleteMessage}>
            Delete</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}
