import http from 'node:http'

const tasks = []

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/tasks'){
    return res
      .setHeader('Content-type', 'application/json')
      .end(JSON.stringify(tasks))
  }

  if (method === 'POST' && url === '/tasks') {
    tasks.push({
      id: 1,
      title: "Estudar Node",
      description: "Aprenda o básico do Node.js",
      completed_at: null
    })

    return res.writeHead(201).end()
  }

  return res.writeHead(404).end()
})

server.listen(3333)