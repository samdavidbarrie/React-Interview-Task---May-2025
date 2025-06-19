import type { Sighting } from './types'

export async function fetchSightingsApi(): Promise<Sighting[]> {
  const res = await fetch('https://my-json-server.typicode.com/Louis-Procode/ufo-Sightings/ufoSightings')
  if (!res.ok) throw new Error('Failed to fetch data')
  return res.json()
}
