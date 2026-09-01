import { Button } from "./button";
import { useState } from "react";

type HabitFormProps = {
    addHabit: (name: string) => void;
};

export function HabitForm({ addHabit} : HabitFormProps) {
  const [name, setName] = useState("");

  function handleSubmit(e: React.SubmitEvent) {
    e.preventDefault();

    if  (name.trim() === "") return;
    setName("");
    addHabit(name);
  }

  return (
    <form className="flex flex-row items-center gap-2" onSubmit={handleSubmit}>
      <input type="text" placeholder="New Habit" value={name} onChange={(e) => setName(e.target.value)} className="flex-1 bg-zinc-800 px-4 py-2 rounded-lg text-white outline-none focus:visible:ring-2 focus-visible:to-blue-400 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <Button disabled={name.trim() === ""}
       variant="primary"
       className="bg-blue-900 px-4 py-2 font-medium">
        Add Habit
      </Button>
    </form>
  );
}