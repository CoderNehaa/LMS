"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseController = void 0;
class BaseController {
    // This method can be used for both cases - success and error
    sendResponse(res, message, statusCode, success, data) {
        return res.status(statusCode).json({
            success,
            message,
            data,
        });
    }
    sendNotFoundResponse(res, message = "Request Resource not found!", statusCode = 404, data = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            data,
        });
    }
    sendBadRequestResponse(res, message = "Bad Request!", statusCode = 400, data = null) {
        return res.status(statusCode).json({
            success: false,
            message,
            data,
        });
    }
    handleError(res, error, fnName, fileName = "") {
        this.printError(error, fnName, fileName);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
    printError(error, fnName, fileName) {
        console.log(`Error in fn ${fnName} in file ${fileName}: ${JSON.stringify(error)}`);
    }
}
exports.BaseController = BaseController;
