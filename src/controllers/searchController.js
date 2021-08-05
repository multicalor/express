const elasticsearchService = require('../services/elasticSearchService')
const axios = require('axios')
const { arrToBulk } = require('../utils/arrToBulk')

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })


const API_KEY = 'dHOPJtw6qvMMMvE1EXy7EALVEORxtgoh'
// let BASE_URL = 

class SearchController {

  async search(req, res) {
    console.log(typeof +req.params.size)
    const { size, searchText } = req.params;

    const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?title=${searchText.replace(' ', '%')}&api-key=${API_KEY}`

    const rawData = await axios.get(url);
    const books = rawData.data.results.books.splice(0, +size)

    console.log('books---->', books)

    await arrToBulk(books, 'books', client)

    const { body: response } = await client.search({
      index: "books",
      body: {
        query: {
          match: {
            description: 'after'
          }
        }
      }

    })

    res.json(response.hits.hits)
  }

  async update(req, res) {

    return res.json({ "test": "test" });
  }

  async delete(req, res) {
    return res.json({ "test": "test" });
  }

}


module.exports = new SearchController();