import app from './app'
import { port } from './utils/config'

app.listen(port, () => console.log(`Server started on port ${port}`))
