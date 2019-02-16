import UserRepository from "../repositories/userRepository";

let userRepository = new UserRepository();

export default class UserService {
  get(id) {
    return userRepository.get(id);
  }

  save(user) {
    if (user.id > 0) {
      return userRepository.update(user, { id: user.id });
    }
    else {      
      return userRepository.create(user);
    }
  }

  delete(id) {
    return userRepository.delete(id);
  }
}
