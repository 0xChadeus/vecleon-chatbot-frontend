"use client"
import fs from 'fs';
import { CharacterForm } from "@/components/character-form";
import { NavBar } from '@/components/navbar';

const CharacterPage = (
  { params }: { params: { characterId: string }},
) => {
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
  
