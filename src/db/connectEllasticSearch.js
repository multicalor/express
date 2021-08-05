const { Client } = require('@elastic/elasticsearch')
const client = new Client({
  host:'localhost:9200'
})