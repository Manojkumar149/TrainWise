import { useState } from 'react'
import type { StepCreate } from "../types"

export default function CreateSOP() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [steps, setSteps] = useState<StepCreate[]>([])
  const [currentStep, setCurrentStep] = useState('')

  const addStep = () => {
    setSteps([...steps, { text: currentStep }])
    setCurrentStep('')
  }

  const submit = async () => {
    await fetch('/sops/create', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({title, description, steps})
    })
  }

  return (
    <div className="p-4 space-y-2">
      <h1 className="text-2xl">Create SOP</h1>
      <input className="border p-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
      <textarea className="border p-2" placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
      <div className="space-y-2">
        {steps.map((s, i)=>(<div key={i}>{s.text}</div>))}
        <input className="border p-2" placeholder="Step" value={currentStep} onChange={e=>setCurrentStep(e.target.value)} />
        <button className="bg-gray-300 px-2" onClick={addStep}>Add Step</button>
      </div>
      <button className="bg-blue-500 text-white px-4 py-2" onClick={submit}>Save</button>
    </div>
  )
}
