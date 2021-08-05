const elasticsearchService = require('../services/elasticSearchService')
const axios = require('axios')

const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })


const API_KEY = 'dHOPJtw6qvMMMvE1EXy7EALVEORxtgoh'
// let BASE_URL = 

class SearchController {

  async search(req, res) {
    console.log(req.params)
    const { size, searchText } = req.params;

    console.log(size, searchText)
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchText}&api-key=${API_KEY}`
    const rawData = await axios.get(url);
    const data = rawData.data.response.docs;
    
    // const result = await elasticsearchService.run(data, 'putin', size=1).catch(console.log)
    async function run (data, searchText, size) {
      await client.index({
        index: 'data',
        id: '1',
        body: {
          data,
        }
      })
      const { body } = await client.exists({
        index: 'data',
        id: 1
      })
  
      console.log(body)
    }

    run(data, searchText, size).catch(console.log)
    

    res.json('result')
    
  }

    async update(req, res) {
        // const productsInfo  = req.body;
        // const { id } = req.user;
        // const {coast, products} = await basketService.update(productsInfo, id);
        return res.json({"end": "end"});
    }

    async delete(req, res) {
      return res.json("basket");
    }

}


module.exports = new SearchController();