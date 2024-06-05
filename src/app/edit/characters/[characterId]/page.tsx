"use client"
import { CharacterForm } from "@/components/character-form";
import { NavBar } from '@/components/navbar';
import { useEffect } from "react";
const axios = require('axios');
import { useRouter } from "next/navigation";

const CharacterPage = (
  { params }: { params: { characterId: string }},
) => {

  const router = useRouter();

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


    const newCharacter = params.characterId === 'new';

    return (
      <>
        <NavBar/>
        <div className="relative top-24">
          <CharacterForm
            characterId={newCharacter ? null : params.characterId}
          />
        </div>
      </>
    );  
  
  }

export default CharacterPage;
  
