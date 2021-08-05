
// require('array.prototype.flatmap').shim()


const arrToBulk = async (dataSet, index, client) => {
    require('array.prototype.flatmap').shim()

    const body = dataSet.flatMap(doc => [{index: {_index: index}}, doc])
    const { body: bulkResponse } = await client.bulk({ refresh: true, body: body })

    if (bulkResponse.errors) {
      const erroredDocuments = []
      // The items array has the same order of the dataset we just indexed.
      // The presence of the `error` key indicates that the operation
      // that we did for the document has failed.
      bulkResponse.items.forEach((action, i) => {
        const operation = Object.keys(action)[0]
        if (action[operation].error) {
          erroredDocuments.push({
            // If the status is 429 it means that you can retry the document,
            // otherwise it's very likely a mapping error, and you should
            // fix the document before to try it again.
            status: action[operation].status,
            error: action[operation].error,
            operation: body[i * 2],
            document: body[i * 2 + 1]
          })
        }
      })
      console.log(erroredDocuments)
    }
  
    const { body: count } = await client.count({ index: index })
    console.log("count---->",count)
  }


module.exports.arrToBulk = arrToBulk;