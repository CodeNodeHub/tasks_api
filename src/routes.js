import { Database } from './database.js'
import { buildRoutPath } from './utils/build-routes-paath.js'

const database = new Database()

export const routes = [
  {
    method: "GET",
    path: buildRoutPath("/tasks"),
    handler: (req, res) => {
      const tasks = database.select("tasks")

      return res.end(JSON.stringify(tasks))
    },
  },
  {
    method: "POST",
    path: buildRoutPath("/tasks"),
    handler: (req, res) => {
      const { title, description } = req.body

      const task = {
        id: task.length + 1,
        title,
        description,
        completed_at: null,
      }

      database.insert("tasks", task)

      return res.writeHead(201).end()
    },
  },
  {
    method: "PUT",
    path: buildRoutePath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      database.update("tasks", id, {
        title,
        description,
      })

      return res.writeHead(204).end()
    }
  },
  {
    method: "DELETE",
    path: buildRoutPath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params

      database.delete("tasks", id)

      return res.writeHead(204).end()
    },
  },
]