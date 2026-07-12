import { Button } from "./button";

export function HabitForm() {
  return (
    <form className="flex flex-row items-center gap-2">
      <input type="text" placeholder="New Habit" className="flex-1 bg-zinc-800 px-4 py-2 rounded-lg text-white outline-none focus:visible:ring-2 focus-visible:to-blue-400 placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500"/>
      <Button variant="primary" className="bg-blue-900 px-4 py-2 font-medium">Add Habit</Button>
    </form>
  );
}