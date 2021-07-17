import React, { useState, useEffect } from 'react'
import Loading from './Loading'
import Tours from './Tours'
//fetching data from url
const url = 'https://course-api.com/react-tours-project'

function App() {
  const [loading, setLoading] = useState(true)
  const [tours, setTours] = useState([])
// it's a component that removes wrong tours.
  const removeTour = (id) => {
    const newTours = tours.filter((tour) => tour.id !== id)
    setTours(newTours)
  }
 
  //use async function for fetching data
  const fetchTours = async () => {
    setLoading(true)
    //if fetching was successful
    try {
      const response = await fetch(url)
      const tours = await response.json()
      setLoading(false)
      setTours(tours);
    }
    //if fetching data faces with errors.(error handling)
     catch (error) {
      setLoading(false)
      console.log(error)
    }
  }
  //fetching data with useEffect Hook
  useEffect(() => {
    fetchTours()
  }, [])
//conditional rendering
  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    )
  }
  if (tours.length === 0) {
    return (
      <main>
        <div className='title'>
          <h2>no tours left</h2>
          <button className='btn' onClick={() => fetchTours()}>
            refresh
          </button>
        </div>
      </main>
    )
  }
  //use props
  return (
    <main>
      <Tours tours={tours} removeTour={removeTour} />
    </main>
  )
}

export default App