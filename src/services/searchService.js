
const elasticsearch = require('../db/connectEllasticSearch');


class SearchService {

  async pass(data) {

    return data;
  }
}


module.exports = new SearchService();