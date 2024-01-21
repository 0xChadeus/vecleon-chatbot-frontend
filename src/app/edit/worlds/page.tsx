"use client";
import Image from "next/image";
const axios = require('axios');
import fs from 'fs';
import { useRouter } from 'next/navigation'
import { CharacterForm } from "@/components/character-form";

interface WorldListPageProps {
  params: {
    characters: [],
  };
};

const WorldListPage = ({
  params
}: WorldListPageProps) => {
    const router = useRouter();

    const characters = axios({
      withCredentials: true,
      method: 'get',
      url: 'http://127.0.0.1:7950/api/get_worlds/',
    });
  
    const handleClick = (event: any) => {    

    }

    return (
      <div>
      </div>
    );
  
}

export default WorldListPage
