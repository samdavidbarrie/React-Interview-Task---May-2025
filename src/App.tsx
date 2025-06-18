import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    setLoading(true)
    fetch(
      'https://my-json-server.typicode.com/Louis-Procode/ufo-Sightings/ufoSightings',
    )
      .then((res) => res.json())
      .then((json) => {
        setData(json)
        setLoading(false)
      })
      .catch(() => {
        setError('Failed to fetch data')
        setLoading(false)
      })
  }, [])

  if (loading) return <div>Loading...</div>
  if (error) return <div>{error}</div>

  return (
    <div>
      <h1>UFO Sightings Dashboard</h1>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default App
