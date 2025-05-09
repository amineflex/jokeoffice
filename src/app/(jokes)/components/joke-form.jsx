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
import { Plus, Loader2 } from "lucide-react";

import { Input } from "@/components/ui/input";  
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

export default function JokeForm() {
  const [username, setUsername] = useState("");
  const [content, setContent] = useState("");
  const [showForm, setshowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    setIsSubmitting(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/joke`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, content }),
      });

      if (response.ok) {
        setshowForm(false);
        alert("Blague ajoutée avec succès !");
        setUsername("");
        setContent("");
      } else {
        alert("Erreur lors de l'ajout de la blague.");
      }
    } catch (error) {
      console.error("Erreur lors de l'ajout de la blague:", error);
      alert("Erreur lors de l'ajout de la blague.");
    } finally {
      setIsSubmitting(false);
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
                <CardDescription>Entrez votre nom d'utilisateur ainsi que votre blague pour ajouter une nouvelle blague</CardDescription>
              </CardHeader>

              <CardContent className="grid gap-4 py-6">
                <div className="grid gap-2">
                  <Label>Nom d'utilisateur</Label>
                  <Input
                    type="text"
                    id="username"
                    placeholder="Ruben"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                <div className="grid gap-2">
                  <Label>Blague</Label>
                  <Textarea
                    id="content"
                    placeholder="Il est grand ce frais!"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                    disabled={isSubmitting}
                  ></Textarea>
                </div>
              </CardContent>

              <CardFooter className="space-x-2 flex justify-between mt-3">
                <Button 
                  variant={"secondary"} 
                  onClick={() => setshowForm(false)} 
                  className="w-1/2"
                  disabled={isSubmitting}
                >
                  Annuler
                </Button>
                <Button 
                  type="submit" 
                  className="w-1/2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Envoi...
                    </>
                  ) : (
                    "Ajouter une blague"
                  )}
                </Button>
              </CardFooter>
            </form>
          </Card>
        </div>
      )}
    </>
  );
}
