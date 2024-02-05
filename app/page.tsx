"use client";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

import { Input } from "@/components/ui/input";
import { useState } from "react";
const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
];

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import eddy from "../public/eddy.png";
import eduble from "../public/eduble.png";

const formSchema = z.object({
    profileImage: z.any(),
});

export default function Home() {
    const [transcript, setTranscript] = useState<string>("");
    const [summarize, setSummarize] = useState<string>("");
    const [notes, setNotes] = useState<string>("");
    const [translate, setTranslate] = useState<string>("");
    const [quiz, setQuiz] = useState<string>("");

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    // 2. Define a submit handler.
    async function onSubmit(values: z.infer<typeof formSchema>) {
        const formData = new FormData();
        formData.append("file", values.profileImage);
        console.log(values.profileImage);

        await fetch("http://127.0.0.1:5328/api/video", {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json(); // Call .json() to parse the JSON data
            })
            .then((data) => {
                console.log("Received data from Flask server:", data);
                // Do something with the received data
                setTranscript(data.transcript);
                setSummarize(data.summarized_text);
                setTranslate(data.translated_chinese);
            })
            .catch((error) => console.error("Error:", error));
    }

    return (
        <div>
            <main className="flex min-h-screen flex-col">
                <section className="container p-6 space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                    <div className="flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto">
                        <p className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl">
                            Meet Eduble
                        </p>
                        <p className="max-w-[40rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8 my-2">
                            Micro Learning, Mega Knowledge
                        </p>
                        <div className="space-x-4">
                            <Link
                                href="/login"
                                className={cn(buttonVariants({ size: "lg" }))}
                            >
                                Get Started
                            </Link>
                            <Link
                                href="/"
                                target="_blank"
                                rel="noreferrer"
                                className={cn(
                                    buttonVariants({
                                        variant: "outline",
                                        size: "lg",
                                    })
                                )}
                            >
                                Learn More
                            </Link>
                        </div>
                    </div>
                </section>

                <section className="container p-6 space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                    <div className="flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto">
                        <p className="font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl">
                            {/* Elevate Your Studying Experience */}
                            Welcome to a new era of learning
                        </p>
                        <p className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
                            Your key to a seamless lecture starts here
                        </p>
                    </div>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                        <div className="bg-neutral-100 rounded-2xl flex flex-col items-center p-10 dark:bg-neutral-900">
                            <div className="mb-4">
                                <Image src={eddy} alt="image" height={300} />
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold mb-2">
                                    Meet Eddy
                                </p>
                                <p className="text-md">
                                    Eduble first takes a lecture video in any
                                    language and transcripts the audio, with the
                                    option of converting it to English. It then
                                    outputs the auto-generated transcript on to
                                    the screen for the Student to read and use
                                    for note taking.
                                </p>
                            </div>
                        </div>

                        <div className="bg-neutral-100 rounded-2xl flex flex-col items-center p-10 dark:bg-neutral-900">
                            <div className="mb-4">
                                <Image src={eduble} alt="image" height={300} />
                            </div>
                            <div className="text-center">
                                <p className="text-2xl font-bold mb-2">
                                    Eduble Engine
                                </p>
                                <p className="text-md">
                                    {" "}
                                    Eduble is a AI-powered Educational Assistant
                                    developed with the aim of helping students
                                    from any background study more effectively
                                    and efficiently through the help of
                                    Artificial Intelligence (AI)
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="container p-6 space-y-6 pb-8 pt-6 md:pb-12 md:pt-10 lg:py-32">
                    <div className="flex max-w-[64rem] flex-col items-center gap-4 text-center mx-auto">
                        <p className="font-bold text-3xl sm:text-3xl md:text-4xl lg:text-5xl mb-6">
                            Be ready to be amazed
                        </p>
                    </div>
                    <div className="flex max-w-[64rem] flex-row gap-8 mx-auto">
                        {/* left */}
                        <div className="grid w-full">
                            <div className="my-4">
                                <Form {...form}>
                                    <form
                                        onSubmit={form.handleSubmit(onSubmit)}
                                        className="space-y-4"
                                    >
                                        <FormLabel>Upload your video</FormLabel>
                                        <FormField
                                            control={form.control}
                                            name="profileImage"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormControl>
                                                        <Input
                                                            accept=".jpg, .jpeg, .png, .svg, .gif, .mp4"
                                                            type="file"
                                                            name="profileImage"
                                                            onChange={(e) =>
                                                                field.onChange(
                                                                    e.target
                                                                        .files
                                                                        ? e
                                                                              .target
                                                                              .files[0]
                                                                        : null
                                                                )
                                                            }
                                                        />
                                                    </FormControl>

                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit">Submit</Button>
                                    </form>
                                </Form>
                            </div>
                        </div>
                        {/* right */}
                        <div>
                            <Tabs
                                defaultValue="transcript"
                                className="w-[600px]"
                            >
                                <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="transcript">
                                        Transcript
                                    </TabsTrigger>
                                    <TabsTrigger value="summarize">
                                        Summarize
                                    </TabsTrigger>
                                    {/* <TabsTrigger value="notes">
                                        Notes
                                    </TabsTrigger> */}
                                    <TabsTrigger value="translate">
                                        Translate
                                    </TabsTrigger>
                                </TabsList>
                                <TabsContent value="transcript">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Transcript</CardTitle>
                                            <CardDescription>
                                                Get the transcript of your
                                                content
                                            </CardDescription>
                                        </CardHeader>

                                        <CardContent className="space-y-2">
                                            <Button>Download</Button>

                                            {transcript
                                                .split("\n")
                                                .map((text) => (
                                                    <div
                                                        key={Math.random()}
                                                        className="mb-2"
                                                    >
                                                        {text}
                                                        {"\n"}
                                                    </div>
                                                ))}
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                <TabsContent value="summarize">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Summarize</CardTitle>
                                            <CardDescription>
                                                Get a quick summary of your
                                                content
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            {summarize
                                                .split("\n")
                                                .map((text) => (
                                                    <div
                                                        key={Math.random()}
                                                        className="mb-2"
                                                    >
                                                        {text}
                                                        {"/n"}
                                                    </div>
                                                ))}
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                                {/* <TabsContent value="notes">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Notes</CardTitle>
                                            <CardDescription>
                                                Make changes to your account
                                                here. Click save when you're
                                                done.
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            {notes}
                                        </CardContent>
                                    </Card>
                                </TabsContent> */}
                                <TabsContent value="translate">
                                    <Card>
                                        <CardHeader>
                                            <CardTitle>Translate</CardTitle>
                                            <CardDescription>
                                                Get a transalation of your
                                                content
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className="space-y-2">
                                            {translate}
                                        </CardContent>
                                    </Card>
                                </TabsContent>
                            </Tabs>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
}
