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

    const result = await arrToBulk(books, 'books', client)
    console.log(result)
    res.status(200).json(result)

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
    const result = response.hits.hits.map((element, i) => {
      element._source.elastic_id = element._id
      return element._source
    });

    return res.status(200).json(result);
  }

  async update(req, res) {

    return res.json({ "test": "test" });
  }


  async delete(req, res) {
    return res.json({ "test": "test" });
  }

}


module.exports = new SearchController();