const elasticsearchService = require('../services/elasticSearchService')
const axios = require('axios')
const { arrToBulk } = require('../utils/arrToBulk')

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })


const API_KEY = 'dHOPJtw6qvMMMvE1EXy7EALVEORxtgoh'
// let BASE_URL = 

class SearchController {

  async elasticSearch(req, res) {
    res.seng('test')
  }



  async apiSearch(req, res) {

    const { size, searchText } = req.params;
    console.log(searchText)
    const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?title=${searchText}&api-key=${API_KEY}`

    const rawData = await axios.get(url);
    const books = rawData.data.results.books.splice(0, +size)

    // console.log('books---->', books)

    const result = await arrToBulk(books, 'books', client)
    console.log(result)
    res.json(result)

  }

  async elasticSearch(req, res) {
    const { size, searchText } = req.params;

    console.log(searchText)

    const { body: response } = await client.search({
      index: "books",
      body: {
        query: {
          multi_match: {
            query: searchText,
            fields: ['title', 'description']
          }
        }
      }

    })
    return res.json(response.hits.hits);//.hits.hits
  }

  async update(req, res) {

    return res.json({ "test": "test" });
  }


  async delete(req, res) {
    return res.json({ "test": "test" });
  }

}


module.exports = new SearchController();