import { ICreateGoalRequest } from "../interfaces/ipost-goal";

export async function postGoal({
  title,
  desiredWeeklyFrequency,
}: ICreateGoalRequest) {

  const response = await fetch("http://localhost:3333/goals", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title,
      desiredWeeklyFrequency,
    }),
  });
  const data = await response.json();
  return data;
}
