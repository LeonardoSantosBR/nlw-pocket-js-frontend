import { Plus } from "lucide-react";
import { OutlineButton } from "./ui/outline-button";
import { useQuery } from "@tanstack/react-query";
import { GetPendingGoals } from "../http/get-pending-goals";
import { PostGoalCompletion } from "../http/post-goal-completion";

export function PendingGoals() {
  const { data } = useQuery({
    queryKey: ["pending-goals"],
    queryFn: GetPendingGoals,
    staleTime: 1000 * 60,
  });

  if (!data) return null;

  async function handleCompleteGoal(goalId: string) {
    await PostGoalCompletion(goalId);
  }

  return (
    <div className="flex flex-wrap gap-3">
      {data.map((goal) => {
        return (
          <OutlineButton
            key={goal.id}
            disabled={
              goal.completionCount >= goal.desiredWeeklyFrequency ? true : false
            }
            onClick={() => handleCompleteGoal(goal.id)}
          >
            <Plus className="size-4 text-zinc-600" />
            {goal.title}
          </OutlineButton>
        );
      })}
    </div>
  );
}
