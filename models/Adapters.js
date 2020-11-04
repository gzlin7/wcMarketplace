const cannedAdapters = require('./cannedAdapters');

let data = [];

// TODO: remove canned adapters
data = data.concat(cannedAdapters);

/**
 * @typedef Adapter
 * @prop {string} id - UUID
 * @prop {string} name - adpater name
 * @prop {string} url - url
 * @prop {string} code - adapter code
 * @prop {string} description - description
 */

/**
 * @class User
 * Stores all User.
 * Note that all methods are static.
 * Wherever you import this class, you will be accessing the same data.
 */
class Adapters {
  /**
   * Add a Adapter.
   * @param {string} id - id
   * @param {string} name - adpater name
   * @param {string} url - url
   * @param {string} code - code
   * @param {string} description - description
   * @return {Adapter} - created Adapter
   */
  static addOne(id, name, url, code, description) {
    const adapter = { id, name, url, code, description };
    data.push(adapter);
    return adapter;
  }

  /**
   * Find a Adapter by id.
   * @param {string} id - id of Adapter to find
   * @return {Adapter | undefined} - found Adapter
   */
  static findOne(id) {
    return data.filter(adapter => adapter.id === id)[0];
  }

  /**
   * Find a Adapter by name
   * @param {string} name - name of Adapter to find
   * @return {Adapter | undefined} - found Adapter
   */
  static findOneByName(name) {
    return data.filter(adapter => adapter.name === name)[0];
  }

  /**
   * Return an array of all of the Adapters.
   * @return {Adapter[]}
   */
  static findAll() {
    return data;
  }

  /**
   * Update Adapter User.
   * @param {string} id - id of User to update
   * @param {string} name - adpater name
   * @param {string} url - url
   * @param {string} code - code
   * @param {string} description - description
   * @return {Adapter | undefined} - updated User
   */
  static updateOne(id, name, url, code, description) {
    const user = Adapters.findOne(id);
    adapter.name = name;
    adapter.url = url;
    adapter.code = code;
    adapter.description = description; 
    return adapter;
  }

  /**
   * Delete a Adapter
   * @param {string} id - id of Adapter to delete
   * @return {Adapter | undefined} - deleted Adapter
   */
  static deleteOne(id) {
    const adapter = Adapters.findOne(id);
    data = data.filter(u => u.id !== id);
    return adapter;
  }

}

module.exports = Adapters;
