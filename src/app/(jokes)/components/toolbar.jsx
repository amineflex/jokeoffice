"use client";
import Filter from "./filter-tabs";
import Nav from "./nav-tabs";
import JokeForm from "./joke-form";

export default function Toolbar() {
  return (
    <>
      <Nav />
      <div className="flex items-center justify-between p-2 rounded-xl border bg-card">
        <Filter />
        <JokeForm />
      </div>
    </>
  );
}
