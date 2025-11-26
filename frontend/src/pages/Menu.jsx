import React from 'react'
import { useEffect, useState } from 'react'

export default function Menu() {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true)
      setError('')
      try {
        // Ejemplo: si el backend tuviera /api/menu, consumirlo aquí
        // Por ahora usaremos datos mock
        const data = [
          { id: 1, nombre: 'Pizza Margarita', precio: 8.5 },
          { id: 2, nombre: 'Pasta Alfredo', precio: 9.2 },
          { id: 3, nombre: 'Ensalada César', precio: 6.0 },
        ]
        setItems(data)
      } catch (e) {
        setError('No se pudo cargar el menú')
      } finally {
        setLoading(false)
      }
    }
    fetchMenu()
  }, [])

  if (loading) return <p>Cargando menú...</p>
  if (error) return <p style={{ color: 'red' }}>{error}</p>

  return (
    <section>
      <h2>Menú</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.nombre} — ${item.precio.toFixed(2)}
          </li>
        ))}
      </ul>
    </section>
  )
}
