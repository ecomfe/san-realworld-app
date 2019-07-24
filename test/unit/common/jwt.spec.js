import jwt from '../../../src/common/jwt';

describe('JWT', () => {
  it('get token after set', () => {
    let token = 'abcde';
    jwt.setToken(token);
    expect(jwt.getToken()).toBe(token);
  });

  it('get token after clear, should be undefined', () => {
    let token = 'abcde';
    jwt.setToken(token);
    jwt.clearToken();

    expect(jwt.getToken() == null).toBeTruthy();
  });
});