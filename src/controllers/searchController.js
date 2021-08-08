require('dotenv').config()
const axios = require('axios')
const { arrToBulk } = require('../utils/arrToBulk')
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })

// Error handle
const ApiError = require('../error/ApiError');



const API_KEY = process.env.API_KEY //'dHOPJtw6qvMMMvE1EXy7EALVEORxtgoh'


class SearchController {
  // loading data from api book and loading it into elasticsearch
  async apiSearch(req, res) {
    try {
      const { size, searchText } = req.params;
      const url = `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?title=${searchText}&api-key=${API_KEY}`

      //request to the api book
      const rawData = await axios.get(url);
      //parse data from request
      const books = rawData.data.results.splice(0, +size)
      // check result from request
      if (books.length === 0) throw ApiError.badRequest({ status: Error, details: "no books on your request" })
      //create bulk, indexing and add result to elasticsearch 
      const result = await arrToBulk(books, 'books', client)

      res.status(200).json({ status: 200, data: result })
    } catch (e) {
      //"Api book error"
      console.error(e.message)
      return res.status(500).json({ status: e.status, details: e.message });//"Api book error"
    }
  }

  //finding data in elasticsearch
  async elasticSearch(req, res) {
    try {
      const { size, searchText } = req.params;

      const { body: response } = await client.search({
        index: "books",
        body: {
          size,
          query: {
            "prefix": {"title": searchText}
          }
        }

      })
      console.log(response.hits)
      if (response.hits.hits.length === 0) throw ApiError.badRequest({ status: Error, details: "no books on your request" });

      const result = response.hits.hits.map((element) => {
        let body = {}
        body = element._source

        return { elasic_id: element._id, body }
      });

      return res.status(200).json({ status: 200, data: result });

    } catch (e) {
      console.log(e.message)
      return res.status(500).json(e.message);
    }
  }

  //loading one record from elasticsearch
  async getOne(req, res) {
    try {
      const { elastic_id } = req.body;
      const { body } = await client.get({
        index: "books",
        id: elastic_id
      })
      console.log(body)

      res.status(200).send({ status: 200, data: { elastic_id: body._id, body: body._source } })
    } catch (e) {
      console.error(e.message)
      return res.status(404).send({ status: 404, details: "there are no records for the requested id" })
    }

  }

  //update record in elasticsearch 
  async update(req, res) {
    try {
      const { elastic_id, body } = req.body;
      console.log(elastic_id)
      const { response } = await client.update({
        index: "books",
        id: elastic_id,
        body: {
          doc: body
        }
      })
      console.log(response)
      return res.status(200).json({ status: 200, details: "updated" });
    } catch (e) {
      console.error(e.message)
      res.status(500).send({ status: Error, details: "no books on your request" })
    }

  }

  //delete record in elasticsearch 
  async delete(req, res) {
    try {
      const { elastic_id } = req.body;
      console.log(elastic_id)
      const { body } = await client.delete({
        index: "books",
        id: elastic_id
      })

      console.log(body)
      res.status(200).send({ status: 200, message: "delete" })
    } catch (e) {
      console.error(e.message)
      res.status(500).send({ status: Error, details: "there are no records to delete for your request, you may have requested an invalid id" })
    }

  }

}


module.exports = new SearchController();