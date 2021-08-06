require('dotenv').config()
const axios = require('axios')
const { arrToBulk } = require('../utils/arrToBulk')
const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })



const API_KEY = process.env.API_KEY //'dHOPJtw6qvMMMvE1EXy7EALVEORxtgoh'


class SearchController {

  async getOne(req, res) {
    try {
      const { elastic_id } = req.body;
      const { body } = await client.get({
        index: "books",
        id: elastic_id
      })
      console.log(body)

      res.send({ status: 200, data: { elasic_id: body._id, body: body._source } })
    } catch (e) {
      return res.status(500).json({ status: Error, ditaile: e.message });
    }

  }

  async apiSearch(req, res) {
    try {
      const { size, searchText } = req.params;
      const url = `https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?title=${searchText}&api-key=${API_KEY}`

      const rawData = await axios.get(url);

      const books = rawData.data.results.splice(0, +size)

      if (books.length === 0) return res.status(500).json({ status: Error, ditaile: "no books on your request" });
      console.log(books)
      const result = await arrToBulk(books, 'books', client)
      console.log('books------->')
      console.log(result)
      res.status(200).json({ status: 200, data: result })
    } catch (e) {
      return res.status(500).json({ status: Error, ditaile: e.message });//"Api book error"
    }
  }

  async elasticSearch(req, res) {
    try {
      const { size, searchText } = req.params;

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
      console.log(response.hits)
      if (response.hits.hits.length === 0) return res.status(500).json({ status: Error, ditaile: "no books on your request" });

      const result = response.hits.hits.map((element) => {
        let body = {}
        body = element._source

        return { elasic_id: element._id, body }
      });

      return res.status(200).json({ status: 200, data: result });
    } catch (e) {
      return res.status(500).json({ status: Error, ditaile: "data base error" });
    }



  }

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
      return res.status(200).json(response);
    } catch (e) {
      res.status(500).send({ status: Error, message: e.message })
    }

  }


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
      res.status(500).send({ status: Error, message: "no record according to your request" })
    }

  }

}


module.exports = new SearchController();