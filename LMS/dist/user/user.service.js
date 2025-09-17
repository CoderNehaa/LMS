"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const base_service_1 = require("../utils/base.service");
const user_model_1 = __importDefault(require("./user.model"));
class UserService extends base_service_1.BaseService {
    constructor() {
        super(user_model_1.default);
    }
}
exports.UserService = UserService;
