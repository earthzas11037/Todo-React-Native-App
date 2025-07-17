import { tv } from 'tailwind-variants'

export const modalStyles = tv({
  slots: {
    overlay: 'justify-center items-center p-4 flex flex-1',
    container: 'bg-white flex w-full p-4 rounded-2xl gap-1 overflow-hidden',
    header: 'flex flex-row',
    title: 'flex flex-1 text-center gap-2',
    closeButton: 'text-black',
    content: '',
    actions: 'flex flex-row w-full justify-center items-center gap-2 mt-2'
  }
})
