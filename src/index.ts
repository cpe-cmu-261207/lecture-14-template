declare global {
  namespace Express {
    interface Request {
      username: string;
    }
  }
}

import express, { Request, Response, NextFunction } from 'express'
import auth from 'basic-auth'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const app = express()
app.use(express.json())
app.use(express.urlencoded({
  extended: true
}));

type User = {
  username: string
  password: string
  money: number
}

const users: User[] = [
  {
    username: 'admin',
    password: '1234',
    money: 100
  },
  {
    username: 'test1',
    password: 'pass1',
    money: 50
  }
]

const SECRET = 'mysecret'

app.get('/login', async (req, res) => {
  const user = auth(req)
  if (!user) return res.status(404).json({ status: 'failed' })

})

//protected route without middleware
app.get('/money', async (req, res) => {
  return res.status(401).json({ status: 'failed' })
})

//protected route with middleware
const checkToken = async (req: Request, res: Response, next: NextFunction) => {
}

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log('Server is running at port ' + port)
})
