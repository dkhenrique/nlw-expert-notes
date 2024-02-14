import * as Dialog from '@radix-ui/react-dialog'
import * as AlertDialog from '@radix-ui/react-alert-dialog';
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { X } from 'lucide-react'

interface NoteCardProps {
  note: {
    id: string
    date: Date
    content: string
  }
  onNoteDeleted: (id: string) => void
}

export function NoteCard({ note, onNoteDeleted }: NoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger className='flex flex-col rounded-md text-left bg-slate-800 p-5 gap-3 overflow-hidden relative hover:ring-2 outline-none hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-lime-400'>
        
        <span className='text-sm font-medium text-slate-300'>
          {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true})}
        </span>
        
        <p className='text-sm leading-6 text-slate-400'>
          {note.content}
        </p>

        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-black/0 pointer-events-none'/>
      </Dialog.Trigger>
      
      <Dialog.Portal>
          <Dialog.Overlay className='inset-0 fixed bg-black/50'/>
          <Dialog.Content className='fixed inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-y-1/2 md:-translate-x-1/2 md:max-w-[640px] md:h-[60vh] w-full bg-slate-700 md:rounded-md flex flex-col outline-none overflow-hidden'>
            <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100'>
              <X className='size-5'/>
            </Dialog.Close>
            
            <div className='flex flex-1 flex-col gap-3 p-5'>
              <span className='text-sm font-medium text-slate-300'>
                {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true})}
              </span>
        
              <p className='text-sm leading-6 text-slate-400'>
                {note.content}
              </p>
            </div>

              <AlertDialog.Root>
                <AlertDialog.Trigger asChild>
                  <button 
                  type='button'
                  // onClick={() => onNoteDeleted(note.id)}
                  className='w-full bg-slate-800 py-4 text-center text-sm text-slate-300 outline-none group'
                >
                  Deseja <span className='text-red-400 group-hover:underline'>Apagar essa nota</span>?
                </button>
                </AlertDialog.Trigger>
                
                <AlertDialog.Portal>
                  <AlertDialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0" />
                  <AlertDialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%] max-h-[85vh] w-[90vw] max-w-[500px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-slate-800 p-[25px] focus:outline-none">
                    <AlertDialog.Title className="text-slate-300 m-0 text-[17px] font-medium" >Você tem certeza absoluta!</AlertDialog.Title>
                    <AlertDialog.Description className="text-slate-400 mt-4 mb-5 text-sm leading-normal"> 
                      Essa ação não pode ser desfeita. Isso excluirá permanentemente a nota!
                    </AlertDialog.Description>

                    <div className="flex justify-end gap-[25px]">
                      <AlertDialog.Cancel asChild>
                        <button className="text-slate-300 bg-slate-900 hover:bg-slate-950 focus:shadow-slate-700 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                          Cancelar
                        </button>
                      </AlertDialog.Cancel>
                      <AlertDialog.Action asChild>
                        <button
                        type='button'
                        onClick={() => onNoteDeleted(note.id)}
                        className="text-red-400 bg-red-100 hover:bg-red-200 hover:text-red-500 focus:shadow-red-500 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none outline-none focus:shadow-[0_0_0_2px]">
                          Sim, apagar
                        </button>
                      </AlertDialog.Action>
                    </div>

                </AlertDialog.Content>
              </AlertDialog.Portal>

              </AlertDialog.Root>
              

          </Dialog.Content>
        </Dialog.Portal>

      
      </Dialog.Root>
  )
}