const z = require('zod')

const movieSchema = z.object({
  title: z.string({
    error: (issue) => issue.input === undefined
      ? 'Movie title is required. Please, check url'
      : 'Movie title must be a string'
  }),
  year: z.number().int().min(1900).max(2026),
  director: z.string(),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10).default(5),
  poster: z.url({ error: 'Poster must be a valid URL' }).endsWith('jpg'),
  genre: z.array(
    z.enum(['Action', 'Adventure', 'Comedy', 'Crime', 'Drama', 'Fantasy', 'Horror', 'Thriller', 'Sci-Fi'], {
      error: (issue) => issue.input === undefined
        ? 'Movie genre is required'
        : 'Movie genre must be an array of enum Genre'
    })
  )
})

function validateMovie (input) {
  return movieSchema.safeParse(input)
}

function validatePartialMovie (input) {
  return movieSchema.partial().safeParse(input)
}

module.exports = {
  validateMovie,
  validatePartialMovie
}
