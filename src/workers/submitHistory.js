const { putItemV3 } = require('../services/db');
const sendResponse = require('../utils/helpers')
const mylogger = require('../configuration/winston');

const submitHistory = async (event) => {
  const { dataTableName } = process.env;
  const { useremail, emailVerified } = JSON.parse(event.body);
  mylogger.debug(` props: %j`, {
    event,
    dataTableName,
    useremail,
    emailVerified
  });
  try {
    const command = {
        TableName: `${dataTableName}`,
        Item: {
          Email: `${useremail.toLowerCase()}`,
          EmailVerified: `${emailVerified}`,
        },
    };
    await putItemV3(command);
    return sendResponse(200, { message: "successfully submitted data" });
  } catch (error) {
    mylogger.debug(`error submitting data: ${error}`);
    return sendResponse(422);
  }
};
module.exports.handler = submitHistory;