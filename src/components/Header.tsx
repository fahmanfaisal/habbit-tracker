import { Button } from "./button";

export function Header(){
  return (
    <header className="flex items-center justify-between">
     <div className="flex flex-col justify-start gap-1">
        <h1 className="text-3xl font-bold text-white">
          Habit Tracker
        </h1>
       <span className="text-sm text-zinc-400">
          1 / 1 done today
       </span>
      </div>
      <div className="flex flex-col items-end gap-1">
        <span className="text-sm text-zinc-400">
          July 6 - July 30
        </span>
         <div className="flex items-center gap-2">
          <Button>Prev</Button>
          <Button>Next</Button>
          </div>
      </div>  
    </header>
  );
}