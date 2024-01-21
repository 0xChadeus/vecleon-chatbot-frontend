'use client';
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import {Form, FormField, FormItem, 
  FormControl, FormMessage, FormLabel} from "@/components/ui/form";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
  } from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {BsPlusCircle} from 'react-icons/bs'
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { ListItemProps } from "./character-world-list-item";
import * as z from "zod";
import {useForm} from "react-hook-form"
import {zodResolver} from "@hookform/resolvers/zod";
import { Check, ChevronsUpDown, MessageSquarePlusIcon } from "lucide-react";
import classNames from "classnames";
import { CSRFToken } from "./csrftoken";

const chatFormSchema = z.object({
  name: z.string().min(1, {
      message: "Name is required.",
  }).max(200, 
      {message: "Name must not be more than 200 characters"}),
  character_id: z.string().min(1, {
      message: "Character is required.",
  }).max(500),
});

interface ChatCreateProps {
  characterId?: string | null;
  characterName?: string | null;
}


export const ChatCreate = ({
  characterId,
  characterName,
}:ChatCreateProps) => {

    const [characterList, setCharacterlist] = useState<ListItemProps[]>([]);

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

    const chatForm = useForm<z.infer<typeof chatFormSchema>>({
      resolver: zodResolver(chatFormSchema),
      defaultValues: {
          name: "",
          character_id: characterId? characterId: "",
      }
    });

    useEffect(() => {
      axios({
          withCredentials: true,
          method: "get",
          url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/get_characters/`
      }).then(function ( response: any) {
          setCharacterlist(response.data);
      });
    }, []);

    const chatSubmit = async (e: any) => {
      const csrftoken = getCookie('csrftoken');
      await axios({
        withCredentials: true,
        method: "post",
        url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/create_chat/`,
        data: chatForm.getValues(),
        headers: {"X-CSRFToken": csrftoken},
      })
      window.location.reload();
    }
  

  return (
    <>
    <CSRFToken/>
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="bg-white text-black">
            <MessageSquarePlusIcon className="px-1" size={30}/>
            New Chat
        </Button>
      </AlertDialogTrigger>
      <Form {... chatForm}>
        <AlertDialogContent className="sm:max-w-[425px]">
          <AlertDialogHeader>
            <AlertDialogTitle>Create a new chat</AlertDialogTitle>
            <AlertDialogDescription>
              Make a new chat with any of your existing characters.
              Click "Create Chat" when you're done.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <FormField 
              name="name"
              render={({field}) => (
                  <FormItem className="w-full">
                    <Input 
                    id="name" 
                    value={field.value} 
                    onChange={field.onChange} 
                    className="w-60" 
                    />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="username" className="text-right">
                Character
              </Label>
              <FormField
              name="character_id"
              control={chatForm.control}
              render={({field}) => (
                <FormItem>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant="outline"
                          role="combobox"
                          className={classNames(
                            "w-[200px] justify-between",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value
                            ? characterList.find(
                                (character) => character.id === field.value
                              )?.name: "Select character"}
                          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0">
                      <Command>
                        <CommandInput placeholder="Search characters..." />
                        <CommandEmpty>No character found.</CommandEmpty>
                        <CommandGroup>
                          {characterList.map((character) => (
                            <CommandItem
                              value={character.name}
                              key={character.id}
                              onSelect={() => {
                                chatForm.setValue("character_id", character.id)
                              }}
                            >
                              <Check
                                className={classNames(
                                  "mr-2 h-4 w-4",
                                  character.id === field.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {character.name}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormItem>
              )}
              />
            </div>
          </div>
          <AlertDialogFooter>
          <AlertDialogCancel>
            Cancel</AlertDialogCancel>
            <AlertDialogAction type="submit"
              onClick={chatSubmit}
            >Create Chat</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </Form>
    </AlertDialog>
    </>
  )
}


