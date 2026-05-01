const { httpGet } = require('./mock-http-interface');


/**
 * @param {string[]} urls
 * @return {Promise<Array<{'Arnie Quote': string} | {'FAILURE': string}>>}
 */
const getArnieQuotes = async (urls) => 
  Promise.all(urls.map(httpGet)).then(responses => responses.map(arnieMapper));

const arnieMapper = ({ status, body })  => (
  message = JSON.parse(body).message,
  key = status === 200 ? 'Arnie Quote' : 'FAILURE',
  { [key]:message }
)


module.exports = {
  getArnieQuotes,
};
