import { X } from "lucide-react";
import { Button } from "./ui/button";

import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "./ui/dialog";

import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { createGoalSchema } from "../schemas/create-goal";

import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from "./ui/radio-group";

import { ICreateGoalRequest } from "../interfaces/ipost-goal";
import { postGoal } from "../http/post-goal";
import { useQueryClient } from "@tanstack/react-query";

export function CreateGoal() {
  const queryClient = useQueryClient();

  const { register, control, handleSubmit, formState , reset} = useForm<ICreateGoalRequest>({
    resolver: zodResolver(createGoalSchema),
  });

  async function handleCreateGoal(data: ICreateGoalRequest) {
    await postGoal({
      title: data.title,
      desiredWeeklyFrequency: data.desiredWeeklyFrequency,
    });

    queryClient.invalidateQueries({ queryKey: ["summary"] });
    queryClient.invalidateQueries({ queryKey: ["pending-goals"] });

    reset()
  }

  return (
    <DialogContent>
      <div className="flex flex-col gap-6 h-full">
        <div className="flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <DialogTitle>Cadastrar meta</DialogTitle>
            <DialogClose asChild>
              <X className="size-4" />
            </DialogClose>
          </div>

          <DialogDescription>
            Adicione atividades que te fazem bem e que você quer continuar
            praticando toda semana.
          </DialogDescription>
        </div>

        <form
          onSubmit={handleSubmit(handleCreateGoal)}
          className="flex-1 flex flex-col justify-between"
        >
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Qual a atividade?</Label>
              <Input
                id="title"
                autoFocus
                placeholder="Praticar exercícios, meditar, etc..."
                {...register("title")}
              />
              {formState.errors.title && (
                <p className="text-red-500 text-sm">
                  {typeof formState.errors.title.message === "string"
                    ? formState.errors.title.message
                    : "Erro desconhecido."}
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <Label htmlFor="title">Quantas vezes na semana?</Label>

              <Controller
                defaultValue={1}
                control={control}
                name="desiredWeeklyFrequency"
                render={({ field }) => {
                  return (
                    <RadioGroup
                      onValueChange={field.onChange}
                      value={String(field.value)}
                    >
                      <RadioGroupItem value="1">
                        <span>1x na semana 🥱</span> <RadioGroupIndicator />
                      </RadioGroupItem>
                      <RadioGroupItem value="2">
                        <span>2x na semana 🙂</span> <RadioGroupIndicator />
                      </RadioGroupItem>
                      <RadioGroupItem value="3">
                        <span>3x na semana 😎</span> <RadioGroupIndicator />
                      </RadioGroupItem>
                      <RadioGroupItem value="4">
                        <span>4x na semana 😜</span> <RadioGroupIndicator />
                      </RadioGroupItem>
                      <RadioGroupItem value="5">
                        <span>5x na semana 👏</span> <RadioGroupIndicator />
                      </RadioGroupItem>
                      <RadioGroupItem value="6">
                        <span>6x na semana 🤟</span> <RadioGroupIndicator />
                      </RadioGroupItem>
                      <RadioGroupItem value="7">
                        <span>Todos os dias da semana 🔥</span>
                        <RadioGroupIndicator />
                      </RadioGroupItem>
                    </RadioGroup>
                  );
                }}
              />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <DialogClose asChild>
              <Button className="flex-1" variant="secondary">
                Fechar
              </Button>
            </DialogClose>
            <Button className="flex-1">Salvar</Button>
          </div>
        </form>
      </div>
    </DialogContent>
  );
}
