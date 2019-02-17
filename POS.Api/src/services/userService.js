import UserRepository from "../repositories/userRepository";
import PermissionRepository from "../repositories/permissionRepository";
import bcrypt from 'bcrypt'
import Transaction from "../transaction";

let userRepository = new UserRepository();
let permissionRepository = new PermissionRepository();

export default class UserService {
  all() {
    return userRepository.all().then(users => users.map(x => Object.assign(x, { password: undefined })));
  }

  get(id) {
    return userRepository.getFull(id).then(user => Object.assign(user, { password: undefined }));
  }

  save(user) {
    return userRepository.getByUsername(user.username).then(existingUser => {
      if (!!existingUser && existingUser.id != user.id) {
        return Promise.reject('Tên đăng nhập đã được sử dụng bởi người dùng khác');        
      }

      return Transaction.begin().then(t => {
        let promise = Promise.resolve();
        if (!!user.password) {
          promise = bcrypt.hash(user.password, 10).then(hash => {
            user.password = hash;
          });
        }
        else {
          delete user.password;
        }

        return promise.then(() => {
          if (user.id > 0) {
            return userRepository.update(user, { transaction: t.value }).then(user => {
              return t.commit().then(() => user);
            });
          }
          else {
            return userRepository.create(user, { transaction: t.value }).then(user => {
              return t.commit().then(() => user);
            });
          }
        }).then(user => Object.assign(user, { password: undefined })).catch(err => {
          console.log(err);
          t.rollback();
          throw err;
        });
      });
    });
  }

  delete(id) {
    return userRepository.delete(id);
  }

  allPermissions() {
    return permissionRepository.all();
  }
}
