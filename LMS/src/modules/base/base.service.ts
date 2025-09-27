import { Document, Model } from "mongoose";

export abstract class BaseService<T extends Document> {
  protected model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(data: Partial<T>): Promise<T> {
    const newItem = new this.model(data);
    await newItem.save();
    return newItem;
  }

  async getOne(property: Object): Promise<T | null> {
    return await this.model.findOne(property);
  }

  async getAll(): Promise<Array<T>> {
    return await this.model.find();
  }
}
