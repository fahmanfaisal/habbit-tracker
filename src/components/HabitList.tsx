import { Button } from "./button";
import { startOfWeek, eachDayOfInterval, endOfWeek, format, isFuture } from "date-fns";

const habits = [
  {
    id:1, name:"Hi",
  },
  
  ]

export function HabitList() {
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
                <HabitItem key={habit.id} habit={habit} />
            ))}
        </div>
    );
}

type HabitItemProps = {
    habit: {
        id: number;
        name: string;
    };
};

function HabitItem({ habit }: HabitItemProps) {

  const visibleDates = eachDayOfInterval({
    start: startOfWeek(new Date(), { weekStartsOn: 1 }), // Monday as the first day of the week
    end: endOfWeek(new Date(), { weekStartsOn: 1 }), // Monday as the first day of the week
  });

    return (
        <div className="rounded-xl bg-zinc-800 p-4 flex flex-col gap-3">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{habit.name}</span>
                  <span className="text-amber-400 text-sm"> 🔥 3 times</span>
                </div>
                <Button variant="ghost-destructive" className="text-red-500 text-sm">Delete</Button>
            </div>
            <div className="flex gap-1.5">
              {visibleDates.map((date) => (
                <Button className="flex flex-1 flex-col items-center justify-evenly gap-0.5 rounded-lg text-sm" key={date.toISOString()} disabled={isFuture(date)}>
                  <span className="font-medium"> {format(date, "EEE")} </span>
                  <span> {format(date, "d")} </span>
                </Button>
              ))}

            </div>
        </div>
    ); 
}