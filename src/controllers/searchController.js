const elasticsearchService = require('../services/elasticSearchService')
const axios = require('axios')
const { arrToBulk } = require('../utils/arrToBulk')

const { Client } = require('@elastic/elasticsearch')
const { response } = require('express')
const client = new Client({ node: 'http://localhost:9200' })


const API_KEY = 'dHOPJtw6qvMMMvE1EXy7EALVEORxtgoh'
// let BASE_URL = 

class SearchController {

  async getOne(req, res) {
    const { elastic_id } = req.body;
    const { body } = await client.get({
      index: "books",
      id: elastic_id
    })
    console.log(body)

    res.send( { elasic_id:body._id, body: body._source })
  }

  async apiSearch(req, res) {

    const { size, searchText } = req.params;

    const url = `https://api.nytimes.com/svc/books/v3/lists/current/hardcover-fiction.json?title=${searchText}&api-key=${API_KEY}`

    const rawData = await axios.get(url);
    const books = rawData.data.results.books.splice(0, +size)

    const result = await arrToBulk(books, 'books', client)
    console.log(result)
    res.status(200).json(result)
  }

  async elasticSearch(req, res) {
    const {size, searchText } = req.params;

    console.log(searchText)

    const { body: response } = await client.search({
      index: "books",
      body: {
        size,
        query: {
          multi_match: {
            query: searchText,
            
            fields: ['title', 'description']
          }
        }
      }

    })

    const result = response.hits.hits.map((element) => {
      let body = {}
      body = element._source

      return {elasic_id:element._id, body}
    });

    return res.status(200).json(result);
  }

  async update(req, res) {
    const { elastic_id, body } = req.body;
    console.log(elastic_id)
    const { response } = await client.update({
      index: "books",
      id: elastic_id,
      body: {
        doc:body
      }
    })
    console.log(response)
    return res.status(200).json(response);
  }


  async delete(req, res) {
    const { elastic_id } = req.body;
    const {body} = await client.delete({
      index: "books",
      id: elastic_id
    })
    res.status(200).send(body)
  }

}


module.exports = new SearchController();