import { Response } from "express";

export abstract class BaseController {
  // This method can be used for both cases - success and error
  protected sendResponse(
    res: Response,
    message: string,
    statusCode: number,
    success: boolean,
    data: any
  ) {
    return res.status(statusCode).json({
      success,
      message,
      data,
    });
  }

  protected sendSuccessResponse(
    res: Response,
    data: any,
    message: string = "Operation Successful",
    statusCode: number = 200,
    success: boolean = true
  ) {
    return res.status(statusCode).json({
      success,
      message,
      data,
    });
  }

  protected sendNotFoundResponse(
    res: Response,
    message: string = "Request Resource not found!",
    statusCode: number = 404,
    data: any = null
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      data,
    });
  }

  protected sendServerErrorResponse(
    res: Response,
    message: string = "Internal Server Error!",
    statusCode: number = 500,
    data: any = null
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      data,
    });
  }

  protected sendBadRequestResponse(
    res: Response,
    message: string = "Bad Request!",
    statusCode: number = 400,
    data: any = null
  ) {
    return res.status(statusCode).json({
      success: false,
      message,
      data,
    });
  }

  protected handleError(
    res: Response,
    error: unknown,
    fnName: string,
    fileName: string = ""
  ) {
    this.printError(error, fnName, fileName);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }

  printError(error: unknown, fnName?: string, fileName?: string) {
    console.log(
      `Error in fn ${fnName} in file ${fileName}: ${JSON.stringify(error)}`
    );
  }
}
