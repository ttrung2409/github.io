import RepositoryBase from "./repositoryBase";
import { Permission } from "../models";

export default class PermissionRepository extends RepositoryBase {
  constructor() {
    super(Permission);
  }
}
