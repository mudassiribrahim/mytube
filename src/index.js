import dotenv from 'dotenv'
import connectDb from './db/db-connection.js'

dotenv.config({
    patht : './env'
})

connectDb()