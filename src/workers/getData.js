const { scanTable } = require('../services/db');
const sendResponse = require('../utils/helpers')
const mylogger = require('../configuration/winston');

const getData = async (event) => {
  const { dataTableName } = process.env;
  mylogger.debug(`props: %j`, {
    event,
    dataTableName
  });
  try {
    const params = {
        TableName: `${dataTableName}`
    };
    const data = await scanTable(params);
    mylogger.debug(`data returned: ${data}`);
    return sendResponse(200, { message: data?.Count ?? -1 });
  } catch (error) {
    mylogger.debug(`error getting data: ${error}`);
    return sendResponse(422);
  }
};
module.exports.handler = getData;