export async function PostGoalCompletion(goalId: string) {
    const response = await fetch('http://localhost:3333/goals-completion',{
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            goalId
        })
    })
    const data = await response.json()
    return data
  }
  