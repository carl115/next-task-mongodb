import Link from 'next/link'

export default function TaskCard({ task }) {
  return (
    <Link href={`/tasks/${task._id}`} className='bg-gray-800 p-10 text-white rounded-md hover:cursor-pointer hover:bg-gray-900'>
        <h1 className='text-2xl font-bold'>{task.title}</h1>
        <p className='text-slate-300'>{task.description}</p>
        <p className='text-slate-500'>
          <span>Created at: {new Date(task.createdAt).toLocaleDateString()}</span>
        </p>
    </Link>
  )
}
