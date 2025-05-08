"use client";
import Filter from "./filter-tabs";

import { Button } from "@/components/ui/button";

import { Plus } from "lucide-react";


import JokeForm from "./joke-form";

export default function Toolbar() {




  return (
    <div className="flex items-center justify-between p-2 rounded-xl border bg-card">
      <Filter />
      <JokeForm />
      
    </div>
  );
}
