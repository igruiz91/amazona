import express from 'express'
import morgan from 'morgan'
import data from './data.js'

const app = express()

app.use(morgan("dev"));

app.get('/api/products', (_, res) => {
  res.send(data.products)
})

app.get('/', (_, res) => {
  res.send('Server ready!')
})

const port = process.env.PORT || 5000


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`)
})