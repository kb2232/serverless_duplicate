const mylogger = require('../configuration/winston');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { DynamoDBDocumentClient, ScanCommand, PutCommand } = require("@aws-sdk/lib-dynamodb");
const client = new DynamoDBClient({});
const docClient = DynamoDBDocumentClient.from(client);

const scanTable = async (getparams) => {
  try {
    const command = new ScanCommand(getparams);
    const response = await docClient.send(command);
    mylogger.debug('DB - scanTable response: %j', response);
    return response;
  } catch (error) {
    mylogger.error('Failed to scanTable: %j', error);
  }
};
const putItemV3 = async (putparams) => {
  try {
    const command = new PutCommand(putparams);
    const response = await docClient.send(command);
    mylogger.info("SUCCESSFUL - ADED");
    return response;
  } catch (error) {
    mylogger.error('Failed to put itemV3: %j', error);
  }
};

module.exports = {
    scanTable,
    putItemV3
}