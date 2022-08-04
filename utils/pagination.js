module.exports = {
  pagination: (model, page, limit) => {
    const startIndex = (page - 1) * limit
    const endIndex = page * limit
    const results = {}

    if (endIndex < model.length) {
      results.next = {
        page: parseInt(page) + 1,
        limit: parseInt(limit)
      }
    }

    if (startIndex > 0) {
      results.previus = {
        page: parseInt(page) - 1,
        limit: parseInt(limit)
      }
    }

    results.results = model.slice(startIndex, endIndex)

    return results
  }
}
