"use client"

import { ChangeEvent, FormEvent, useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import Link from 'next/link'
import Task from '@/models/Task'

export default function FormPage() {
    const [newTask, setNewTask] = useState({
        title: '',
        description: ''
    })

    const router = useRouter()
    const params = useParams()

    const inputStyle = "bg-gray-800 border-2 w-full p-4 rounded-lg my-4"

    const getTask = async () => {
        const res = await fetch(`/api/tasks/${params.id}`)
        const data = await res.json()
        setNewTask({ title: data.title, description: data.description })
    }

    const DeleteTask = async () => {
        if(window.confirm('Are you sure to delete this task?')) {
            try {
                await fetch(`/api/tasks/${params.id}`, {
                    method: 'DELETE'
                })
    
                router.push('/')
                router.refresh()
            } catch (error) {
                console.log(error);
                
            }
        }
    }

    const HandleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => setNewTask({...newTask, [e.target.name]: e.target.value})

    const HandleSubmit = async (e: FormEvent) => {
        e.preventDefault()

        if(!params.id) {
            try {
                const res = await fetch('/api/tasks', {
                    method: 'POST',
                    body: JSON.stringify(newTask),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
        
                const data = await res.json()
    
                if(res.status === 200) {
                    router.push('/')
                    //router.refresh()
                }
    
                console.log(data)
            } catch (error) {   
                console.log(error)    
            }
        } else {
            try {
                const res = await fetch(`/api/tasks/${params.id}`, {
                    method: 'PUT',
                    body: JSON.stringify(newTask),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })

                const data = await res.json()

                router.push('/')
                router.refresh()

                console.log(data);
            } catch (error) {
                console.log(error);
                
            }
        }
    }

    useEffect(() => {
        if(params.id) {
            getTask()
        }
    }, [])

    return (
        <div className="h-[calc(100vh-7rem)] flex justify-center items-center flex-col">
            <div className='w-full'>
                <Link href={`/`}>Back</Link>
            </div>
            <form onSubmit={HandleSubmit}>
                <header className='flex justify-between'>
                    <h1 className='font-bold text-2xl'>
                        {!params.id ? 'Create Task' : 'Updated Task'}
                    </h1>
                    <button type='button' className='bg-red-500 px-3 py-1 rounded-md' onClick={DeleteTask}>Delete</button>
                </header>
                <input 
                    type="text" 
                    name="title" 
                    placeholder="Title" 
                    className={inputStyle}
                    onChange={HandleChange} 
                    value={newTask.title}
                />
                <textarea 
                    name="description" 
                    rows={3}
                    placeholder="Description" 
                    className={inputStyle}
                    onChange={HandleChange}
                    value={newTask.description} 
                ></textarea>

                <button type='submit' className="bg-green-500 hover:bg-green-700 text-white py-2 px-4 font-bold rounded-lg">
                    {!params.id ? 'Save' : 'Update'}
                </button>
            </form>
        </div>
    )
}
