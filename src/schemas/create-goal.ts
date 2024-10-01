import { z } from "zod";

export const createGoalSchema = z.object({
    title: z.string().min(1, "Informe a atividade que deseja realizar."),
    desiredWeeklyFrequency: z.coerce.number().min(1, "Frequência inválida.").max(7, "Frequência inválida."),
})