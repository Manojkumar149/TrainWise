import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    await fetch('/auth/login', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({email, password})
    })
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Login</h1>
      <form onSubmit={submit} className="space-y-2">
        <input className="border p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input type="password" className="border p-2" placeholder="Password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="bg-blue-500 text-white px-4 py-2" type="submit">Login</button>
      </form>
    </div>
  )
}
