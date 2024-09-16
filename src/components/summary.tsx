import dayjs from 'dayjs'
import ptBr from 'dayjs/locale/pt-BR'

import { CheckCircle2, Plus } from 'lucide-react'
import { Button } from './ui/button'
import { DialogTrigger } from './ui/dialog'
import { InOrbitLogo } from './in-orbit-logo'
import { Progress, ProgressIndicator } from './ui/progress-bar'
import { Separator } from './ui/separator'
import { OutlineButton } from './ui/outline-button'
import { useQuery } from '@tanstack/react-query'
import { GetSummary } from '../http/get-summary'
import { PendingGoals } from './pending-goals'

dayjs.locale(ptBr)

export function Summary() {
  const { data } = useQuery({
    queryKey: ['summary'],
    queryFn: GetSummary,
    staleTime: 1000 * 60,
  })

  if (!data) return null

  const firstDayOfWeek = dayjs().startOf('week').format('D MMM')
  const lastDayOfWeek = dayjs().endOf('week').format('D MMM')

  const completedPercentage = Math.round((data?.completed * 100) / data?.total)

  return (
    <div className="py-10 max-w-[400px] px-5 mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <InOrbitLogo />
          <span className="text-lg font-semibold capitalize">
            {firstDayOfWeek} - {lastDayOfWeek}
          </span>
        </div>
        <DialogTrigger asChild>
          <Button>
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>
      <div className="flex flex-col gap-3">
        <Progress max={15} value={5}>
          <ProgressIndicator style={{ width: `${completedPercentage}%` }} />
        </Progress>
      </div>
      <div className="flex items-center justify-between text-xs text-zinc-400">
        <span>
          Você completou{' '}
          <span className="text-zinc-100">{data?.completed}</span> de{' '}
          <span className="text-zinc-100">{data?.total}</span> metas nessa
          semana.
        </span>
        <span>{Math.round((data?.completed * 100) / data?.total)}%</span>
      </div>
      <Separator />
      <PendingGoals />
      <div className="flex flex-col gap-6">
        <h2 className="text-xl font-medium">Sua semana</h2>

        {Object.entries(data.goalsPerDay).map(([date, goals]) => {
          const weekDay = dayjs(date).format('dddd')
          const goalCompletedAt = dayjs(date).format('D[ de ]MMMM')

          return (
            <div key={date} className="flex flex-col gap-4">
              <h3 className="font-medium ">
                <span className="capitalize">{weekDay}</span>
                <span className="text-zinc-400 text-xs ml-1">
                  ({goalCompletedAt})
                </span>
              </h3>

              <ul className="flex flex-col gap-3">
                {goals.map(goal => {
                  const time = dayjs(goal.completedAt).format('HH:mm')
                  return (
                    <li key={goal.id} className="flex items-center gap-2">
                      <CheckCircle2 className="size-4 text-pink-500" />
                      <span className="text-sm text-zinc-400">
                        Você completou "
                        <span className="text-zinc-100">{goal.title}</span>" às
                        {'  '}
                        <span>{time}h</span>
                      </span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}
