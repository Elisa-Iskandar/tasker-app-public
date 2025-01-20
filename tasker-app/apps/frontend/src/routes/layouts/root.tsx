import React from "react"
import { Outlet } from "react-router"
import { Link } from "react-router-dom"

export default function Root() {
  return (
    <main>
      <header className="flex flex-row justify-between items-center px-8 py-3">
        <h1 className="text-2xl font-semibold">Tasker App</h1>
        <nav className="flex flex-row justify-end gap-4">
          <ul className="flex flex-row justify-end items-center gap-2">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/tasks">Tasks</Link>
            </li>
            <li>
              <Link to={"/team"}></Link>
            </li>
          </ul>
          <button className="">
            <div className="rounded-full bg-blue-600 text-white font-semibold h-8 w-8 flex flex-col justify-center items-center">
              A
            </div>
          </button>
        </nav>
      </header>
      <Outlet />
    </main>
  )
}
