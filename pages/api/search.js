// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

const { GoogleSearch } = require("google-search-results-nodejs");
const search = new GoogleSearch(process.env.SERP_API_KEY);

// Workaround to make it work with Promises
// https://github.com/serpapi/google-search-results-nodejs/issues/4
function promisifiedGetJson(params) {
  return new Promise((resolve, reject) => {
    try {
      search.json(params, resolve);
    } catch (e) {
      reject(e);
    }
  });
}

export function getSearchResults(queries) {
  const promises = queries.map((q) => {
    const params = {
      q,
      location: "Austin, TX"
    };

    return promisifiedGetJson(params);
  });

  return Promise.all(promises);
}

export default async function handler(req, res) {
  const queries = decodeURIComponent(req.query.q).split(",");

  const searchResults = await getSearchResults(queries);

  res.status(200).json(searchResults);
  res.end();
}
