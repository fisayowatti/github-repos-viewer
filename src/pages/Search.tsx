import React, { useState } from 'react'
import { useHistory } from 'react-router';

export default function Search() {
  const [value, setValue] = useState("");
  const history = useHistory();
  return (
    <div className="min-h-screen p-4">
      <input value={value} onChange={(e) => setValue(e.target.value)} placeholder='see me here na' />
      <button onClick={() => history.push("/repos", { username: value })}>Click me</button>
    </div>
  )
}
