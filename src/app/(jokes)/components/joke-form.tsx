import React, { useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import { Input } from "@/components/ui/input";  
import { Textarea } from "@/components/ui/textarea";



export default function JokeForm() {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");

  const [showForm, setshowForm] = useState(false);


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/joke", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, content }),
    });

    if (response.ok) {
      alert("Blague ajoutée avec succès !");
      setUsername("");
      setContent("");
    } else {
      alert("Erreur lors de l'ajout de la blague.");
    }
  };

  return (
    <>
      <Button onClick={() => setshowForm(!showForm)}>
      <Plus />

       Ajouter une blague
      </Button>

    {showForm && (
    <div className="z-50 h-full w-full flex items-center justify-center fixed top-0 left-0 bg-black/50 backdrop-blur-sm">
      <Card className="w-96">
        <form onSubmit={handleSubmit}>
          <CardHeader className="flex flex-col items-start space-y-1">
            <CardTitle>Nouvelle blague</CardTitle>
            <CardDescription>Ajoute ta nouvelle masterclass ici</CardDescription>
          </CardHeader>

          <CardContent className="grid gap-4 py-6">
            <div className="grid gap-2">
              <Input
                type="text"
                id="username"
                placeholder="goatmine"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="grid gap-2">
              <Textarea
                id="content"
                placeholder="prout mdrrrr"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              ></Textarea>
            </div>
          </CardContent>

          <CardFooter className="space-x-2 flex justify-between mt-3">
            <Button variant={"secondary"} onClick={() => setshowForm(false)} className="w-1/2">
              Annuler
            </Button>
            <Button type="submit" className="w-1/2"> 
              Ajouter une blague
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
    )}
    </>
  ); 
}
