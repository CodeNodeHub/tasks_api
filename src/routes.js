import { Database } from './database.js'
import { buildRoutPath } from './utils/build-routes-path.js'

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

      const tasks = database.select("tasks")

      const task = {
        id: tasks.length + 1,
        title,
        description,
        completed_at: null,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }

      database.insert("tasks", task)

      return res.writeHead(201).end()
    },
  },
  {
    method: "PUT",
    path: buildRoutPath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params
      const { title, description } = req.body

      const existingTask = database
        .select("tasks")
        .find((task) => task.id === Number(id))

      if (!existingTask) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ message: "Task not found" }))
      }

      if (!title && !description) {
        return res.writeHead(400).end(
          JSON.stringify({
            error: "At least one field (title or description) must be provided",
          })
        )
      }

      const updatedTask = {
        ...existingTask,
        title: title ?? existingTask.title,
        description: description ?? existingTask.description,
      }

      database.update("tasks", Number(id), updatedTask)

      return res.writeHead(204).end()
    },
  },
  {
    method: "PATCH",
    path: buildRoutPath("/tasks/:id/complete"),
    handler: (req, res) => {
      const { id } = req.params
      const existingTask = database
        .select("tasks")
        .find((task) => task.id === Number(id))

      if (!existingTask) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ error: "Task not found" }))
      }

      const isCompleted = existingTask.completed_at
        ? null
        : new Date().toISOString()

      const updatedTask = database.update("tasks", Number(id), {
        ...existingTask,
        completed_at: isCompleted,
      })

      return res.writeHead(200).end(JSON.stringify(updatedTask))
    },
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
  {
    method: "GET",
    path: buildRoutPath("/tasks/:id"),
    handler: (req, res) => {
      const { id } = req.params
      const task = database
        .select("tasks")
        .find((task) => task.id === Number(id))
      if (!task) {
        return res
          .writeHead(404)
          .end(JSON.stringify({ error: "Task not found" }))
      }
      return res.end(JSON.stringify(task))
    },
  },
]