"use client";
import Image from "next/image";
const axios = require('axios');
import fs from 'fs';
import { CharacterForm } from "@/components/character-form";
import { useRouter } from "next/navigation";
import { NavBar } from "@/components/navbar";
import { ListItem, ListItemProps } from "@/components/character-world-list-item";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { UserPlus, Pencil } from "lucide-react";


const CharacterListPage = ({}) => {
    const [characters, setCharacters] = useState<ListItemProps[]>([]);

    const router = useRouter();
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
        <NavBar/>
        <div className="flex flex-col fixed xl:left-1/4 \
        sm:left-0 xl:w-1/2 w-full top-20 bottom-10  
        border rounded-md border-slate-700 overflow-scroll bg-slate-950">
          <div className="fixed xl:w-1/2 sm:w-full h-20 bg-slate-950 z-50 rounded-sm">
          <a href="./characters/new">
            <Button className="absolute left-6 top-6 rounded-xl">
              <UserPlus/>
            </Button>
          </a>
          </div>
          <div className="absolute top-20 right-0">
            {characters.map((character) => (
              <ListItem
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
