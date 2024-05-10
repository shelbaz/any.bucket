import { ObjectId } from "mongodb";
import { BaseEntity } from "./base-entity";

export interface Integration extends BaseEntity {
  workspaceId: ObjectId;
  value: string;
  name: string;
}
