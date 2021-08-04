const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  cloud: {
    id: 'name:bG9jYWxob3N0JGFiY2QkZWZnaA==',
  },
  auth: {
    username: 'elastic',
    password: 'changeme'
  }
})