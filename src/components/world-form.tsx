"use client";
const axios = require('axios');
import * as z from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {Form, FormField, FormItem, 
    FormControl, FormMessage, FormLabel} from "@/components/ui/form";
import { ImageUpload } from "@/components/image-upload";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";


const worldFormSchema = z.object({
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
    scenario: z.string().max(10000, 
        {message: "scenario must not be more than 10000 characters"
    }),    
})



export const WorldForm = () => {

    const worldForm = useForm<z.infer<typeof worldFormSchema>>({
        resolver: zodResolver(worldFormSchema),
        defaultValues: {
            name: '',
            description: '',
            scenario: '',
        }
    });


    const isLoading = worldForm.formState.isSubmitting;

    const worldSubmit = (values: z.infer<typeof worldFormSchema>) => {

    };

    return(
        <div className="h-full p-4 space-y-2 max-w-3xl mx-auto">
        <Form {...worldForm}>
            <form onSubmit={worldForm.handleSubmit(worldSubmit)}
            className="space-y-8 pb-10">
                <div className="space-y-2 w-full">
                    <h3 className="text-left font-bold text-lg">
                        Create a World
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
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <div className="flex flex-col gap-4">
                        <FormField 
                            name="name"
                            control={worldForm.control}
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
                            control={worldForm.control}
                            render={({field}) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Description (required) </FormLabel>
                                    <Textarea 
                                        disabled={isLoading}
                                        placeholder={"Description. For the best results, use at least 100 words to describe this world."}
                                        {...field}
                                        className="resize-none"
                                        rows={7}
                                    />
                                </FormItem>
                            )}
                        />
                        <FormField 
                            name="scenario"
                            control={worldForm.control}
                            render={({field}) => (
                                <FormItem className="col-span-2 md:col-span-1">
                                    <FormLabel>Scenario (optional) </FormLabel>
                                    <Textarea 
                                        disabled={isLoading}
                                        placeholder={"Scenario"}
                                        {...field}
                                        className="resize-none"
                                        rows={5}
                                    />
                                </FormItem>
                            )}
                        />
                </div>
            </form>
        </Form>
    </div>

    );
    

}
