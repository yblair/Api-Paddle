module.exports = {
  pagination: (model, page, limit) => {
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    if (endIndex < model.length) results.nextPage = parseInt(page) + 1

    if (startIndex > 0) results.previusPage = parseInt(page) - 1

    if (!model.lengt) results.count = model.length

    results.results = model.slice(startIndex, endIndex)

    return results
  }
}
