"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseService = void 0;
class BaseService {
    constructor(model) {
        this.model = model;
    }
    async create(data) {
        const newItem = new this.model(data);
        await newItem.save();
        return newItem;
    }
    async getOne(property) {
        return await this.model.findOne(property);
    }
}
exports.BaseService = BaseService;
