import { ObjectId } from "mongodb";

export interface BaseEntity {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
