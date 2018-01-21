import { install } from "source-map-support";
import { LOG } from "../../config";

install();

export function asyncHandler (handler) {
  return async (event, context, callback) => {
    const result = handler(event, context);
    // handle Lambda
    if (callback) {
      result.then((res) => {
        callback(null, res);
      }).catch((err) => {
        LOG.error(err);
        callback(err);
      });
    }
    return result;
  };
}

export function apiProxyHandler (handler) {
  return async (event, context, callback) => {
    const result = handler(event, context);
    // handle Lambda
    if (callback) {
      result.then((res) => {
        callback(null, formatProxyResponse(200, res));
      }).catch((err) => {
        LOG.error(err);
        callback(formatProxyResponse(500, {"errorMsg": "Server Error."}));
      });
    }
    return result;
  };
}

function formatProxyResponse (status, body) {
  return {
    "statusCode": status,
    "headers": {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Content-Type": "application/json"
    },
    "body": JSON.stringify(body)
  };
}
