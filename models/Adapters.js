const cannedAdapters = require('./cannedAdapters');

const db = require('./firebase');

// Get a reference to the database service
const database = db.ref();
const adaptersRef = database.child("adapters");

let data = [];

// TODO: remove canned adapters
data = data.concat(cannedAdapters);

function testDB(){
  // populate DB
  // data.forEach(adapter=>{
  //   // adaptersRef.push().set(adapter);
  //   adaptersRef.child(adapter.id).set(adapter);
  // });

  // Adapters.deleteOne('68fed7c1-fd40-4fb7-9d8f-1c6f34a3f2cb');
  // Adapters.updateOne('5a4f79aa-7c3a-4f23-afc2-27cef2bf14b8', "hello",
  //  "url", "", "test");
}
setTimeout( testDB, 5000);

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
  static async addOne(id, name, url, code, description) {
    const adapter = { id: id, name: name, url: url, 
      code: code, description: description };

    //data.push(adapter);

    adaptersRef.child(id).set(adapter);

    return adapter;
  }

  /**
   * Find a Adapter by id.
   * @param {string} id - id of Adapter to find
   * @return {Adapter | undefined} - found Adapter
   */
  static async findOne(id) {
    // return data.filter(adapter => adapter.id === id)[0];
    return adaptersRef.child(id).once("value", function(snapshot) {
      return snapshot.val();
    });
  }

  /**
   * Find a Adapter by name
   * @param {string} name - name of Adapter to find
   * @return {Adapter | undefined} - found Adapter
   */
  static async findOneByName(name) {
    data = await Adapters.findAll();
    return data.filter(adapter => adapter.name === name)[0];
    
  }

  /**
   * Return an array of all of the Adapters.
   * @return {Adapter[]}
   */
  static async findAll() {
//    return data;
    data = [];
    return adaptersRef.once("value", function(snapshot) {
      snapshot.forEach(function (child) {
        const adapter = child.val();
        data.push(adapter);
      });
    }).then(()=>{return data;});
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
  static async updateOne(id, name, url, code, description) {
    const adapter = { id: id, name: name, url: url, 
      code: code, description: description };

    // const adapter = await Adapters.findOne(id);

    // adapter.name = name;
    // adapter.url = url;
    // adapter.code = code;
    // adapter.description = description; 

    adaptersRef.child(id).set(adapter);
    return adapter;
  }

  /**
   * Delete a Adapter
   * @param {string} id - id of Adapter to delete
   * @return {Adapter | undefined} - deleted Adapter
   */
  static async deleteOne(id) {
    // const adapter = Adapters.findOne(id);
    // data = data.filter(u => u.id !== id);
    // return adapter;
    adaptersRef.child(id).remove();
  }

}

module.exports = Adapters;
