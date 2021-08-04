const searchService = require('../services/searchService')
const axios = require('axios')

// const ApiError = require('../error/ApiError')
const APIKEY = 'dHOPJtw6qvMMMvE1EXy7EALVEORxtgoh'

class SearchController {

  async search(req, res) {
    const { size, searchText } = req.body;
    console.log(size, searchText)
    const url = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${searchText}&api-key=${APIKEY}`
    const test = axios.get(url)
      // .then(response => (response) => {
      //   return res.json(response.data.response.docs[1]);
      // });
      //console.log(response.data.response.docs[1])
    console.log(test.then((req => {res.json(req.data.response.docs[1].multimedia.slice(+size))})))//.slice(size)
    // const { id } = req.params;
    // const {coast, products} = await basketService.create(req.body, id);
    
  }

  //   async getAll(req, res) {
  //     const { id } = req.user;
  //     const {coast, products} = await basketService.getAll(id);
  //     return res.json({coast, products});
  //   }

    async update(req, res) {
        // const productsInfo  = req.body;
        // const { id } = req.user;
        // const {coast, products} = await basketService.update(productsInfo, id);
        return res.json({"end": "end"});
    }

    async delete(req, res) {
      // const { productId, quantity }  = req.body;
      // const { id } = req.user;
      // const basket = await basketService.addOne(productId, quantity, id);
      return res.json("basket");
    }


  // //todo complete function
  //   async removeOne(req, res) {
  //     const { productId }  = req.body;
  //     console.log("req.body",req.body)
  //     const { id } = req.user;
  //     const basket = await basketService.removeOne(productId, id);
  //     return res.json(basket);
  //   }

  // async updateOne(req, res) {
  //   const { oldProductId, newProduct }  = req.body;
  //   const { id } = req.user;
  //   const basket = await basketService.updateOne(oldProductId, newProduct , id);
  //   return res.json(basket);
  // }
}


module.exports = new SearchController();