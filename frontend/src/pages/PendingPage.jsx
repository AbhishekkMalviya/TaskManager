import React, { useState } from 'react'
import { layoutClasses, SORT_OPTIONS } from '../assets/dummy'
import { Filter, ListChecks } from 'lucide-react'
import {useOutletContext} from 'react-router-dom';
import { useMemo } from 'react';

const API_BASE = 'http://localhost:4000/api/tasks'

const PendingPage = () => {

  const { tasks = [], refreshTasks } = useOutletContext();
  const [sortBy, setSortBy] = useState('newest')
  const [selectedTask, setSelectedTask] = useState(null)
  const [showModal, setShowModal] = useState(false)

const getHeaders =() => {
  const token= localStorage.getItem('token')
  if(!token) throw new Error("No Auth Token Found")
    return { 'Content-Type' : 'application/json', Authorization: `Bearer ${token}`}
}

const sortedPendingTasks = useMemo(() => {
  const filtered = tasks.filter(
(t) => !t.completed || (typeof t.completed === 'string' &&
t.completed.toLowerCase() === 'No')
  )
  return filtered.sort((a,b) => {
    if(sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
    if(sortBy === 'oldest') return new Date(a.createdAt) - new Date(b.createdAt);
    const order = {high :3, medium: 2, low: 1};
    return order[b.priority.toLowerCase()] - order[a.priority.toLowerCase()]
  })
},[tasks, sortBy])

  return (
    <div className={layoutClasses.container}>
      <div className={layoutClasses.headerWrapper}>
        <div>
          <h1 className='flex text-2xl md:text-3xl font-bold text-gray-800 items-center gap-2'>
            <ListChecks className=' text-purple-500 ' />Pending Task
          </h1>
          <p className=' text-sm text-gray-500 mt-1 ml-7'>
            {sortedPendingTasks.length} task{sortedPendingTasks.length !== 1 && 's'}{' '}
            need your attention
          </p>
        </div>

        <div className={layoutClasses.sortBox}>
          <div className=' flex items-center gap-2 text-gray-700 font-medium'>
            <Filter className=' w-4 h-4 text-purple-500' />
            <span className=' text-sm'> Sort by:</span>
          </div>

          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
          className={layoutClasses.select} >
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="priority">By Priority</option>
          </select>

          <div className={layoutClasses.tabWrapper}>
            {SORT_OPTIONS.map(opt => (
              <button key={opt.id} onClick={() => setSortBy(opt.id)}
              className={layoutClasses.tabButton(sortBy === opt.id)}>
                {opt.icon}{opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PendingPage
