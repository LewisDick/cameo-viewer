interface ScheduledMoviesResponse {
    response: string
    movies: Movie[]
  }
  
  interface Movie {
    ID: string
    ScheduledFilmId: string
    Title: string
    CinemaId: string
    TrailerUrl: string
    show_times: Showtime[]
    available_cinemas: string[]
    image_url: string
  }
  
  interface Attribute {
                  id: number
                  attribute: string
                  attribute_full: string
                  description: string
                  attribute_category: string
                  display_type: number
                  is_active: number
                  created_at: string
                  updated_at: string
  }
  
  interface Showtime {
    CinemaId: string
    ScheduledFilmId: string
    Showtime: string
    EventId: string
    SessionId: string
    SessionAttributesNames: string[]
    ScreenName: string
    SoldoutStatus: number
    GlobalEventId: string
    cinema_image_url: string
    movie_image_url: string
    time_format: string
    time: string
    date: string
    date_f: string
    show_time: Date
    attributes: Attribute[]
  }