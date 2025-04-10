import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { logger } from 'hono/logger';

const app = new Hono()

app.use('*', logger())

const users = [
  {
    id: 1,
    name: 'John Doe'
  },
  {
    id: 2,
    name: 'Jane Doe'
  }
]; 

app.get('/api/v1/users', (c) => {
  return c.json({
    users,
    message: "Users fetched"
  }, 200)
})

app.post('/api/v1/user/new', async (c) => {
  const body = await c.req?.json() as {name: string};
  const {name} = body 

  const id = Math.floor(Math.random() * 1000)

  const newUser = {
    id,
    name
  }

  users.push(newUser)

  return c.json({
    users,
    message: "User created"
  }, 201)
})

app.patch('/api/v1/user/:userId', async (c) => {
  const id = c.req.param('userId')

  const user = users.find((user) => user?.id === Number(id))

  if (!user) {
    return c.json({
      message: "User not found"
    }, 404)
  }

  const body = await c.req?.json() as {name: string};

  const {name} = body

  const upadedUser = {
    ...user,
    name
  }

  return c.json({
    message: "User updated",
    user: upadedUser,
  }, 200)
})


app.delete('/api/v1/user/delete/:userId', async (c) => {
  const userId = c.req.param('userId')

  const user = users.find((user) => user?.id === Number(userId))

  if (!user) {
    return c.json({
      message: "User not found"
    }, 404)
  }
  const userIndex = users.findIndex((user) => user?.id === Number(userId))

  users?.splice(userIndex, 1)

  return c.json({
    message: "User deleted",
    users
  }, 200)
})

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
