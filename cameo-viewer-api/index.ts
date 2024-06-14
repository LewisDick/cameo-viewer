import fastify from 'fastify'
import ky from 'ky'
import cors from '@fastify/cors'

const server = fastify()

const CameoID = "005"

function isAvailableAtCameo(movie: Movie): boolean {
  return movie.available_cinemas.includes(CameoID)
}
    
function filterCameoShowtimes(showtime: Showtime): boolean {
  return showtime.CinemaId === CameoID
}

server.register(cors, {})

server.post('/movies', async (request, reply): Promise<Movie[]> => {
  const json: ScheduledMoviesResponse = await ky.post('https://www.picturehouses.com/api/scheduled-movies-ajax').json()
  return reply.send(json.movies
    .filter(m => isAvailableAtCameo(m))
    .map(m => { 
    return { ...m, show_times: m.show_times.filter(s => filterCameoShowtimes(s))}
  }))
})

server.listen({ port: 8080 }, (err, address) => {
  if (err) {
    console.error(err)
    process.exit(1)
  }
  console.log(`Server listening at ${address}`)
})