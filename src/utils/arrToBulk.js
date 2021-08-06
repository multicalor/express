const arrToBulk = async (dataSet, index, client) => {
    require('array.prototype.flatmap').shim()
    const body = dataSet.flatMap(doc => [{index: {_index: index}}, doc])
    const response = await client.bulk({ refresh: true, body: body })//{ body: bulkResponse }
    const bulkResponse = response.body
    const result = response.body.items.map((element, i) => {
      dataSet[i].elastic_id = element.index._id
    });

    console.log(response.body.items)
    if (bulkResponse.errors) {
      const erroredDocuments = []
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0]
        if (action[operation].error) {
          erroredDocuments.push({
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1]
          })
        }
      })
      console.log(erroredDocuments)
    }
    return dataSet;
    const { body: count } = await client.count({ index: index })
  }


module.exports.arrToBulk = arrToBulk;