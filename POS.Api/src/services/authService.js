import bcrypt from 'bcrypt'
import UserRepository from '../repositories/userRepository';
import config from '../config';
import Promise from 'bluebird'

let userRepository = new UserRepository();
let jwt = Promise.promisifyAll(require('jsonwebtoken'));

export default class AuthService {
  authenticate({ username, password }) {
    return userRepository.getByUsername(username).then(user => {
      if (!!user) {
        return bcrypt.compare(password, user.password).then(valid => {
          if (!valid) return { valid: false };

          return jwt.signAsync({
            user: { id: user.id, name: user.name },
            permissions: user.permissions.map(x => x.permission.code) },
            config.jwt.privateKey,
            {
              expiresIn: '24h',
              issuer: config.jwt.issuer,
              audience: config.jwt.audience
            }).then(token => {
              return {
                valid: true, token,
                user: {
                  id: user.id,
                  name: user.name,                  
                },
                permissions: user.permissions.map(x => x.permission.code)
              };
            });
        });
      }

      return false;
    });
  }

  authenticateByToken(token) {
    return jwt.verifyAsync(token, config.jwt.privateKey, {
      issuer: config.jwt.issuer,
      audience: config.jwt.audience
    }).then(result => Object.assign(result, { valid: true }))
      .catch(err => { valid: false });
  }
}
