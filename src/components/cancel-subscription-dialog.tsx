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
import { AlertTriangle, Trash2 } from "lucide-react"
import { CSRFToken } from "./csrftoken"
import { AlertDialogDescription, AlertDialogTitle } from "@radix-ui/react-alert-dialog"
import { useRouter } from "next/navigation"
const axios = require("axios");
import { useState } from "react"
import { s3Delete } from "./aws-s3"


export const CancelDialog =() => {
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

    const cancelSubscription = async (event: any) => {
        const csrftoken = getCookie('csrftoken');
        await axios({
            withCredentials: true,
            method: "put",
            url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/cancel_subscription/`,
            headers: {"X-CSRFToken": csrftoken},
        })
        window.location.reload();
    }


  return (
    <>
    <CSRFToken/>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="space-x-2 absolute top-32">
            <div>Cancel Subscription</div>  <div><AlertTriangle/></div>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="">
      <AlertDialogHeader>
          <AlertDialogTitle className="font-extrabold">Are you sure you want to cancel your subscription?</AlertDialogTitle>
          <AlertDialogDescription>
            This will cancel your current subscription. 
            When your billing period ends, 
            it will no longer be renewed.  
            If you want to renew your subscription, 
            you will have to buy it again. 
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>
            No, take me back</AlertDialogCancel>
          <AlertDialogAction 
          onClick={cancelSubscription}>
            Yes, cancel my subscription</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    </>
  )
}
