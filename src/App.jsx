import { useState } from 'react'
import './App.css'

function App() {
  const [pokemonName, setPokemonName] = useState('')
  const [pokemonData, setPokemonData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const fetchPokemon = async () => {
    if (!pokemonName.trim()) {
      setError('Please enter a Pokemon name or ID')
      return
    }

    setLoading(true)
    setError(null)
    setPokemonData(null)

    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName.toLowerCase()}`)

      if (!response.ok) {
        throw new Error('Pokemon not found')
      }

      const data = await response.json()
      setPokemonData(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-400 via-purple-500 to-pink-500 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl font-bold text-white text-center mb-8 drop-shadow-lg">
          Pokemon Information App
        </h1>

        <div className="bg-white rounded-lg shadow-2xl p-6 mb-6">
          <div className="flex gap-3 mb-4">
            <input
              type="text"
              value={pokemonName}
              onChange={(e) => setPokemonName(e.target.value)}
              placeholder="Enter Pokemon name or ID"
              onKeyPress={(e) => e.key === 'Enter' && fetchPokemon()}
              className="flex-1 px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-purple-500 transition-colors"
            />
            <button
              onClick={fetchPokemon}
              className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition-colors shadow-md"
            >
              Search
            </button>
          </div>

          {loading && <p className="text-center text-gray-600 py-4">Loading...</p>}
          {error && <p className="text-center text-red-600 py-4 font-semibold">Error: {error}</p>}

          {pokemonData && (
            <div className="mt-6">
              <h2 className="text-4xl font-bold text-center text-purple-700 mb-4 capitalize">
                {pokemonData.name}
              </h2>

              <div className="flex justify-center mb-6">
                <img
                  src={pokemonData.sprites.front_default}
                  alt={pokemonData.name}
                  className="w-48 h-48 bg-gray-100 rounded-full shadow-lg"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-4 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-purple-800 mb-3">Types</h3>
                  <div className="flex gap-2 flex-wrap">
                    {pokemonData.types.map((type) => (
                      <span
                        key={type.slot}
                        className="px-4 py-2 bg-purple-600 text-white rounded-full font-semibold capitalize"
                      >
                        {type.type.name}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-100 to-purple-100 p-4 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-blue-800 mb-3">Abilities</h3>
                  <ul className="space-y-2">
                    {pokemonData.abilities.map((ability) => (
                      <li
                        key={ability.ability.name}
                        className="px-3 py-2 bg-blue-500 text-white rounded-lg capitalize"
                      >
                        {ability.ability.name}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg shadow md:col-span-2">
                  <h3 className="text-xl font-bold text-green-800 mb-3">Stats</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {pokemonData.stats.map((stat) => (
                      <div
                        key={stat.stat.name}
                        className="bg-white p-3 rounded-lg shadow-sm"
                      >
                        <div className="text-sm text-gray-600 capitalize">{stat.stat.name}</div>
                        <div className="text-2xl font-bold text-green-700">{stat.base_stat}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-100 to-orange-100 p-4 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-yellow-800 mb-2">Height</h3>
                  <p className="text-3xl font-bold text-yellow-700">{pokemonData.height}</p>
                </div>

                <div className="bg-gradient-to-r from-orange-100 to-red-100 p-4 rounded-lg shadow">
                  <h3 className="text-xl font-bold text-orange-800 mb-2">Weight</h3>
                  <p className="text-3xl font-bold text-orange-700">{pokemonData.weight}</p>
                </div>
              </div>
            </div>
          )}
        </div>

        <footer className="text-center text-white mt-8">
          <p className="text-lg font-semibold drop-shadow">
            Created by Shristi Mishra from Shivrajpur ✨
          </p>
        </footer>
      </div>
    </div>
  )
}

export default App
