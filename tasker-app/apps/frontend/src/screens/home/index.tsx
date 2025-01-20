import React from "react"
import { Link } from "react-router-dom"

export default function HomeScreen() {
  return (
    <div className="h-screen flex flex-col justify-start items-stretch">
      <header className="flex flex-row justify-between items-center px-6 py-3">
        <h1 className="text-2xl font-bold">Home</h1>
        <nav>
          <ul>
            <li>Home</li>
            <li>
              <a href="/about">About</a>
              <Link to={"/about"}>About</Link>
            </li>
            <li>Contact</li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
