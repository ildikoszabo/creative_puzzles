import request from "superagent";

const Requests = {};

Requests.post = (url, headers = {}, data, query = {}) => {
  let defaultHeaders = {
    Accept: "application/json",
  };

  return request
    .post(url)
    .query(query)
    .set(Object.assign({}, defaultHeaders, headers))
    .send(data);
};

export default Requests;
