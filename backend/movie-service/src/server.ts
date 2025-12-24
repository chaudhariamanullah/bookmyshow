import app from './app.js';

const PORT = 3000
app.listen(PORT, () => {
  console.log(`Movie service running on port ${PORT}`)
})