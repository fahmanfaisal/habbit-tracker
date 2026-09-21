import { Button } from "./button";
import { startOfWeek, eachDayOfInterval, endOfWeek, format, isFuture, isSameDay, subDays } from "date-fns";

export type Habit = {
    id: number;
    name: string;
    completions: Date[];
};

type HabitListProps = {
    habits: Habit[];
    removeHabit: (id: string) => void;
    toggleHabit: (id: string, date: Date) => void;
};

export function HabitList( {habits, removeHabit, toggleHabit}: HabitListProps) {
    if (habits.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center gap-2">
                <strong className="text-zinc-400 text-lg">No habits yet</strong>
                <span className="text-zinc-500 text-sm">Add a habit to start tracking</span>
            </div>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {habits.map((habit) => (
                <HabitItem  key={habit.id} habit={habit} removeHabit={removeHabit} toggleHabit={toggleHabit} />
            ))}
        </div>
    );
}

type HabitItemProps = {
    habit: Habit;
    removeHabit: (id: string) => void;
    toggleHabit: (id: string, date: Date) => void;
};

function HabitItem({ habit, removeHabit, toggleHabit }: HabitItemProps) {

  const streak = getStreak(habit.completions);

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }), // Monday as the first day of the week
    end: endOfWeek(new Date(), { weekStartsOn: 1 }), // Monday as the first day of the week
  });

    return (
        <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{habit.name}</span>
                  {streak === 0 ? null : (
                    <span className="text-amber-400 text-sm"> 🔥 {streak}</span>
                  )}
                </div>
                <Button onClick={() => removeHabit(habit.id.toString())} variant="ghost-destructive" className="text-red-500 text-sm">Delete</Button>
            </div>
            <div className="flex gap-1.5">
              {visibleDates.map((date) => (
                <Button className="flex flex-1 flex-col items-center justify-evenly gap-0.5 rounded-lg text-sm" key={date.toISOString()} disabled={isFuture(date)} onClick={() => toggleHabit(habit.id.toString(), date)} variant={habit.completions.some(d=> isSameDay(date,d))
                    ? "primary"
                    : "secondary"
                }>
                  <span className="font-medium"> {format(date, "EEE")} </span>
                  <span> {format(date, "d")} </span>
                </Button>
              ))}

            </div>
        </div>
    ); 
}

function getStreak (completions: Date[]) {
   let streak = 0;
   let date = new Date();

   while (completions.some(c => isSameDay(c, date))) {
       streak++;
       date = subDays(date, 1);
   }
   return streak;
}