const { Client } = require('@elastic/elasticsearch')
const client = new Client({ node: 'http://localhost:9200' })


class ElasticSearchService {

  async run (data, searchText, size) {
    await client.index({
      index: searchText,
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

//   async search(data, searchText, size) {

//     const result = await client.search({
//       index: 'data',
//       body: {
//         query: {
//           match: { hello: searchText }
//         }
//       }
      
//     })
//     return result;
// }
}

module.exports = new ElasticSearchService();