import { Plus, X } from 'lucide-react'
import logo from './assets/logo-in-orbit.svg'
import letsStart from './assets/lets-start.svg'
import { Button } from './components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from './components/ui/dialog'
import { Label } from './components/ui/label'
import { Input } from './components/ui/input'
import {
  RadioGroup,
  RadioGroupIndicator,
  RadioGroupItem,
} from './components/ui/radio-group'

export function App() {
  return (
    <Dialog>
      <div className="h-screen flex flex-col items-center justify-center gap-8">
        <img src={logo} alt="in.orbit" />
        <img src={letsStart} alt="lets start" />

        <p className="text-zinc-300 leading-relaxed max-w-80 text-center">
          Você ainda não cadastrou nenhuma meta, que tal cadastrar um agora
          mesmo?
        </p>

        <DialogTrigger asChild>
          <Button>
            <Plus className="size-4" />
            Cadastrar meta
          </Button>
        </DialogTrigger>
      </div>

      <DialogContent>
        <div className="flex flex-col gap-6 h-full">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <DialogTitle>Cadastrar meta</DialogTitle>
              <X className="size-4" />
            </div>

            <DialogDescription>
              Adicione atividades que te fazem bem e que você quer continuar
              praticando toda semana.
            </DialogDescription>
          </div>

          <form action="" className="flex-1 flex flex-col justify-between">
            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Qual a atividade?</Label>
                <Input
                  autoFocus
                  placeholder="Praticar exercícios, meditar, etc..."
                />
              </div>
              <div className="flex flex-col gap-2">
                <Label htmlFor="title">Quantas vezes na semana?</Label>
                <RadioGroup>
                  <RadioGroupItem value="1">
                    <span>1x na semana</span> <RadioGroupIndicator />
                  </RadioGroupItem>
                  <RadioGroupItem value="2">
                    <span>2x na semana</span> <RadioGroupIndicator />
                  </RadioGroupItem>
                  <RadioGroupItem value="3">
                    <span>3x na semana</span> <RadioGroupIndicator />
                  </RadioGroupItem>
                  <RadioGroupItem value="4">
                    <span>4x na semana</span> <RadioGroupIndicator />
                  </RadioGroupItem>
                  <RadioGroupItem value="5">
                    <span>5x na semana</span> <RadioGroupIndicator />
                  </RadioGroupItem>
                  <RadioGroupItem value="6">
                    <span>6x na semana</span> <RadioGroupIndicator />
                  </RadioGroupItem>
                  <RadioGroupItem value="7">
                    <span>Todos os dias da semana.</span>
                    <RadioGroupIndicator />
                  </RadioGroupItem>
                </RadioGroup>
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
    </Dialog>
  )
}
