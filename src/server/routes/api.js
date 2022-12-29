const express = require('express');
const router = express.Router();
const data = require('./data.json');

/* GET events listing. */
router.get('/events', function (req, res, next) {
  res.send({ events: JSON.parse(data) });
});

router.get('/eventTypesOptions', function (req, res, next) {
  res.send({ options: [...new Set(data.map((i) => i.eventType))] });
});

/* GET events paginated results. */
router.get('/events/paginate', paginatedResults(data), (req, res) => {
  res.json(res.paginatedResults);
});

function paginatedResults(model) {
  // middleware function
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);
    const filter = JSON.parse(req.query.filter);

    // calculating the starting and ending index
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    let data = model;
    const filterKey = Object.keys(filter);
    filterKey.map((key) => {
      data = data.filter((item) => filter[filterKey].indexOf(item[key]) > -1);
    });

    const results = {};
    results.total = data.length;

    if (endIndex < data.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.results = data.slice(startIndex, endIndex).sort(function (a, b) {
      return a.time.localeCompare(b.time);
    });

    res.paginatedResults = results;
    next();
  };
}

module.exports = router;
