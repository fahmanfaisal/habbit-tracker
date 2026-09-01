import { Header } from "./components/Header";
import { HabitForm } from "./components/HabitForm";
import { HabitList } from "./components/HabitList";
import { useState } from "react";
import type { Habit } from "./components/HabitList";
import { isSameDay } from "date-fns";
export default function App() {

  const [habits, setHabits] = useState<Habit[]>([]);
  
  function addHabit(name: string) {
    setHabits([...habits, { id: habits.length + 1, name, completions: [new Date()] }]);
  }

  function removeHabit(id: string) {
    setHabits(habits.filter(habit => habit.id.toString() !== id));
  }

  function toggleHabit(id: string, date: Date) {
    setHabits(habits.map(habit => {
      if (habit.id.toString() === id) {
        const isCompleted = habit.completions.some(d => isSameDay(d, date));
        return {
          ...habit,
          completions: isCompleted
            ? habit.completions.filter(d => !isSameDay(d, date))
            : [...habit.completions, date]
        };
      }
      return habit;
    }));
  }

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-4 p-4">
      <Header />
      <HabitForm addHabit={addHabit} />
      <HabitList habits={habits} removeHabit={removeHabit} toggleHabit={toggleHabit} />
    </div>
  );
}
