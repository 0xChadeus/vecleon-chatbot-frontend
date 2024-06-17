"use client";
const axios = require('axios');
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { ListItem, ListItemProps } from "@/components/character-world-list-item";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";


const CharacterListPage = ({}) => {
    const [characters, setCharacters] = useState<ListItemProps[]>([]);

    const router = useRouter();

    useEffect(() => {
      axios({
        withCredentials: true,
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/authbackend/get_authstatus/`,
      }).then(function ( response: any) {
          if(response.data[0] === 'is_authenticated: false') {
            router.push("https://vecleon.com/auth/login");
          } else {
            window.location.reload();
          }
      });  

  
    }, []);

    useEffect(() => {
      axios({
        withCredentials: true,
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/get_subscription_is_active/`,
      }).then(function ( response: any) {
          console.log(response);
          if(response.data.response === 'inactive') {
            router.push("https://vecleon.com/subscriptions");
          }
      });
    }, [])

    useEffect(() => {
      axios({
        withCredentials: true,
        method: 'get',
        url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/get_characters/`,
      }).then(function ( response: any) {
          setCharacters(response.data)
        }
      );
    }, [])
  

    return (
      <>
      <head>
      <link href="data:image/x-icon;base64,AAABAAEAEBAAAAEAIABoBAAAFgAAACgAAAAQAAAAIAAAAAEAIAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADrF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv/rF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/w4BBSwAAAAAAAAAAAUAAjDrF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv8AAAAA6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/6xde/+sXXv8AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADrF17/6xde/+sXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA6xde/+sXXv/rF17/6xde/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOsXXv/rF17/AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAWd7//1ne//9Z3v//Wd7//1ne//9Z3v//Wd7//1ne//9Z3v//Wd7//1ne//9Z3v//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA//8AAP//AAD+fwAA+B8AAPAPAADDwwAAh+EAAB/4AAA//AAAP/wAAD/8AAA//AAAP/wAAP//AADAAwAA//8AAA==" rel="icon" type="image/x-icon"/>
      </head>
        <NavBar/>
        <div className="flex flex-col fixed xl:left-1/4 \
        sm:left-0 xl:w-1/2 w-full top-20 bottom-10  
        border rounded-md border-slate-700 overflow-y-scroll scrollbar-thin scrollbar-thumb-slate-800 
        scrollbar-track-slate-950 bg-slate-950">
          <div className="flex absolute sm:w-1/2 h-20 bg-slate-950 z-50 rounded-sm border-slate-700">
          <a href="https://vecleon.com/edit/characters/new">
            <Button className="absolute left-6 top-6 rounded-xl">
              <UserPlus/>
            </Button>
          </a>
          </div>
          <div className="absolute top-20 right-0 w-full">
            {characters.map((character) => (
              <ListItem
                key={character.id}
                role="character"
                id={character.id}
                name={character.name}
                description={character.description}
                src={character.src}
              />
            ))
            }
          </div>
        </div>

      </>
    );
}

export default CharacterListPage
