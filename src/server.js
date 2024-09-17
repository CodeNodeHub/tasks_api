import http from 'node:http'

const server = http.createServer((req, res) => {
  const { method, url } = req

  if (method === 'GET' && url === '/tasks'){
    return res.end('Listagem de tarefas')
  }

  if (method === 'POST' && url === 'tasks') {
    return res.end('Criação de tasks')
  }

  return res.end('Hello World')
})

server.listen(3333)