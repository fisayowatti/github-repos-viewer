import React, { useState } from 'react'
import { useHistory } from 'react-router';

export default function Search() {
  const [value, setValue] = useState("");
  const history = useHistory();
  return (
    <div className="min-h-screen p-4 flex flex-col items-center justify-center">
      <div className="w-full px-4 md:px-0 md:w-1/2 flex flex-col items-center justify-center space-y-4">
        <div>
          <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M25 0C11.1875 0 0 11.1875 0 25C0 36.0625 7.15625 45.4062 17.0937 48.7187C18.3437 48.9375 18.8125 48.1875 18.8125 47.5312C18.8125 46.9375 18.7812 44.9687 18.7812 42.875C12.5 44.0312 10.875 41.3437 10.375 39.9375C10.0937 39.2187 8.875 37 7.8125 36.4062C6.9375 35.9375 5.6875 34.7812 7.78125 34.75C9.75 34.7187 11.1562 36.5625 11.625 37.3125C13.875 41.0937 17.4687 40.0312 18.9062 39.375C19.125 37.75 19.7812 36.6562 20.5 36.0312C14.9375 35.4062 9.125 33.25 9.125 23.6875C9.125 20.9687 10.0937 18.7188 11.6875 16.9688C11.4375 16.3438 10.5625 13.7812 11.9375 10.3437C11.9375 10.3437 14.0312 9.6875 18.8125 12.9062C20.8125 12.3437 22.9375 12.0625 25.0625 12.0625C27.1875 12.0625 29.3125 12.3437 31.3125 12.9062C36.0937 9.65625 38.1875 10.3437 38.1875 10.3437C39.5625 13.7812 38.6875 16.3438 38.4375 16.9688C40.0313 18.7188 41 20.9375 41 23.6875C41 33.2812 35.1562 35.4062 29.5937 36.0312C30.5 36.8125 31.2812 38.3125 31.2812 40.6562C31.2812 44 31.25 46.6875 31.25 47.5312C31.25 48.1875 31.7187 48.9687 32.9687 48.7187C37.9316 47.0432 42.2441 43.8535 45.2993 39.5987C48.3545 35.3439 49.9985 30.2381 50 25C50 11.1875 38.8125 0 25 0Z" fill="black"/>
          </svg>
        </div>
        <input 
          className="px-4 py-1 bg-white text-sm rounded-lg border w-9/12" 
          value={value} onChange={(e) => setValue(e.target.value)} 
          placeholder="Enter your Github username" 
        />
        <button disabled={!value} className="px-4 py-1 bg-gray-100 text-sm font-medium rounded-lg border disabled:text-gray-400" onClick={() => history.push("/repos", { username: value })}>Show my repos</button>
      </div>
    </div>
  )
}
