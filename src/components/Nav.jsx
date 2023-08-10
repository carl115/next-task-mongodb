import Link from 'next/link'

export default function Nav() {
  return (
    <nav className='bg-slate-600 py-3 px-5 flex justify-end gap-3'>
      <Link href={`/tasks/new`}>Create Task</Link>
    </nav>
  )
}
