import RepositoryBase from "./repositoryBase";
import { CustomerType } from "../models";

export default class CustomerTypeRepository extends RepositoryBase {
  constructor() {
    super(CustomerType);
  }
}
