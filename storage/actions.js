const data_store = require("./service").collection;
const assert = require("assert");

/**
 * Write data to database
 * @param {Array | *} data - data or datum to be added to the data store
 */
const write_data = async data => {
  let result;

  try {
    // Use appropraite insert depending on data type
    result = Array.isArray(data)
      ? await data_store.insertMany(data)
      : await data_store.insert(data);
  } catch (error) {
    console.error(`Failed inserting data ${data}`);
    throw error;
  }

  // assert insertion was successful
  try {
    if (Array.isArray(data)) {
      assert.equal(data.length, await result.result.n);
      assert.equal(data.length, await result.ops.length);
    } else {
      assert.equal(1, await result.result.n);
      assert.equal(1, await result.ops.length);
    }
  } catch (error) {
    console.error(`Failed assertion: ${error}`);
    throw error;
  }

  // Notify user insertion sucessful
  console.log(`Inserted ${result.result.n} documents into the collection`);
  return result;
};

module.exports = {
  write_data
};

const test_insert_docs = async () => {
  write_data([{ a: 1 }, { a: 2 }, { a: 3 }]);
};

setTimeout(() => test_insert_docs(), 2000);
