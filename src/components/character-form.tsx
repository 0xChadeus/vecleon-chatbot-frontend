"use client";
const axios = require('axios');
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField, FormItem, 
    FormControl, FormMessage, FormLabel} from "@/components/ui/form";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Wand2 } from "lucide-react";
import { CSRFToken } from "./csrftoken";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import generateUploadUrl from "./aws-s3"
import crypto, { randomBytes } from "crypto"
import { NavBar } from "./navbar";


interface CharacterFormProps {
    characterId: string | null;
}

const characterFormSchema = z.object({
    id: z.string(),
    name: z.string().min(1, {
        message: "Name is required.",
    }).max(200, 
        {message: "Name must not be more than 200 characters"}),
    description: z.string().min(1, {
        message: "Description is required.",
    }).max(10000, 
        {message: "Description must not be more than 10000 characters"}),
    src: z.string().min(1, {
        message: "Image is required.",
    }),
    personality_summary: z.string().max(10000, 
        {message: "personality summary must not be more than 10000 characters"
    }),
    scenario: z.string().max(10000, 
        {message: "scenario must not be more than 10000 characters"
    }),    
});


export const CharacterForm = ({
    characterId,
}: CharacterFormProps) => {
    const router = useRouter();
    const {toast} = useToast();
    const [character, setCharacter] = useState({
        src: '',
        name: '',
        description: '',
        personality_summary: '',
        scenario: '',
    });  

    const maxFileSize = Number(process.env.NEXT_PUBLIC_IMAGE_FILE_LIMIT);

    useEffect(() => {
        if(characterId) {
            const csrftoken = getCookie('csrftoken');
            axios({
            withCredentials: true,
            method: 'put',
            url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/get_character/`,
            data: {
                id: characterId
                },
            headers: {"X-CSRFToken": csrftoken},
            }).then((response: any) => {
                setCharacter(response.data);
                characterForm.reset({...response.data});
            });
        }
    }, []);
  
    const characterForm = useForm<z.infer<typeof characterFormSchema>>({
        resolver: zodResolver(characterFormSchema),
        defaultValues: {
            id: '',
            name:  '',
            description: '',
            personality_summary: '',
            src:'',
            scenario: '',
        }
    });

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


    const isLoading = characterForm.formState.isSubmitting;


    const characterSubmit = async (values: z.infer<typeof characterFormSchema>) => {
        const imgSrc = characterForm.getValues().src;
        console.log("src here: " + imgSrc);
        if(!imgSrc.includes("amazonaws")) {
            const rawBytes = await randomBytes(16);
            const imageName = rawBytes.toString('hex');
            let imgFile = await fetch(imgSrc).then(r => r.blob()).then(
                blobFile => new File([blobFile], imageName, 
                    { type: "image/png" }));
            if(imgFile.size >= maxFileSize) {
                console.log('file size > 2MB');
                toast({
                    description: "File size must be less than 3MB"
                })    
                return
            }
            const imageUploadUrl = generateUploadUrl('images/' + imageName + ".png");
            await fetch(imageUploadUrl,{
                method:'PUT',
                headers: {
                    "Content-Type": "image/png"
                },
                body: imgFile,
            });
            const finalImageUrl = imageUploadUrl.split('?')[0];
            characterForm.setValue("src", finalImageUrl);    
        }
        try {
            const csrftoken = getCookie('csrftoken');
            const send_data = characterForm.getValues();
            if(characterId !== null) {
                send_data.id = characterId;
                axios({
                    withCredentials: true,
                    method: 'patch',
                    url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/update_character/`,
                    data:  send_data,
                    headers: {"X-CSRFToken": csrftoken},
                })                
                toast({
                    description: "Character updated!"
                })    
            } else {
                axios({
                    withCredentials: true,
                    method: 'post',
                    url: `${process.env.NEXT_PUBLIC_MIDSERVER_URL}/api/create_character/`,
                    data: send_data,
                    headers: {"X-CSRFToken": csrftoken},
                });
                toast({
                    description: "Character created!"
                })    
                
            }
        }  catch(error) {
            toast({
                variant: "destructive",
                description: "Could not submit"
            })
        }
        router.push("../../edit/characters");
    };
   
    return (
        <>
        <CSRFToken/>
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
            <Form {...characterForm}>
                <form onSubmit={characterForm.handleSubmit(characterSubmit)}
                className="space-y-8 pb-10">
                    <div className="space-y-2 w-full">
                        <h3 className="text-left font-bold text-lg">
                            {characterId? "Edit this Character": "Create a Character"}
                        </h3>
                    </div>
                    <FormField
                        name="src"
                        render={({field}) => (
                            <FormItem className="flex flex-col items-center
                            justify-center space-y-4">
                                <FormControl>
                                    <ImageUpload
                                        disabled={isLoading}
                                        onChange={field.onChange}
                                        value={field.value}
                                        defaultSrc={characterId? character.src: null}
                                    />
                                </FormControl>
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <div className="flex flex-col gap-4">
                            <FormField 
                                name="name"
                                control={characterForm.control}
                                render={({field}) => (
                                    <FormItem className="col-span-2 md:col-span-1">
                                        <FormLabel>Name (required)</FormLabel>
                                        <Input 
                                            disabled={isLoading}
                                            placeholder={"Name"}
                                            {...field}
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="description"
                                control={characterForm.control}
                                render={({field}) => (
                                    <FormItem className="col-span-2 md:col-span-1">
                                        <FormLabel>Description (required) </FormLabel>
                                        <Textarea 
                                            disabled={isLoading}
                                            placeholder={"Description. For the best results, use between 100 and 300 words to describe this character. Anything significantly over 300 words may cause issues."}
                                            {...field}
                                            className="resize-none"
                                            rows={7}
                                            defaultValue={characterId? character.description: ""}
                                            value={field.value}
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="personality_summary"
                                control={characterForm.control}
                                render={({field}) => (
                                    <FormItem className="col-span-2 md:col-span-1">
                                        <FormLabel>Personality Summary (optional) </FormLabel>
                                        <Textarea 
                                            disabled={isLoading}
                                            placeholder={"Personality Summary"}
                                            {...field}
                                            className="resize-none"
                                            rows={5}
                                            defaultValue={characterId? character.personality_summary: ""}
                                        />
                                    </FormItem>
                                )}
                            />
                            <FormField 
                                name="scenario"
                                control={characterForm.control}
                                render={({field}) => (
                                    <FormItem className="col-span-2 md:col-span-1">
                                        <FormLabel>Scenario (optional) </FormLabel>
                                        <Textarea
                                            disabled={isLoading}
                                            placeholder={"Scenario"}
                                            {...field}
                                            className="resize-none"
                                            rows={5}
                                            defaultValue={characterId? character.scenario: ""}
                                        />
                                    </FormItem>
                                )}
                            />
                    </div>
                    <div className="w-full flex justify-center">
                        <Button size="lg" disabled={isLoading}>
                            {characterId? "Edit": "Create"}
                            <Wand2 className="w-4 h-4 ml-2"/>
                        </Button>
                    </div>
                </form>
            </Form>
        </div>
        </>
    );
}
