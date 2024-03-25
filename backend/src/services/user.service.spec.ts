import * as userService from "../services/user.service";

jest.mock('../services/user.service', () => ({
  login: jest.fn().mockImplementation((email: string, password: string) => {
    if(email === 'invalid@mail.com' || !email && password === 'wrongpassword' || !password){
        return false
    } else {
        return 'mocked-token';
    }
  }),
  signup: jest.fn().mockImplementation((email: string, password: string) => {
    if( !email || !password){
      return false
  } else {
      return 'mocked-user';
  }
  })
}));

describe("User service", () => {

  it("should log the user and return a token", async () => {
    const email = 'test@mail.com';
    const password = 'test';

    const result = await userService.login(email, password);    
        
    expect(result).toBeDefined();
  })

  it("should return an error with incorrect login infos", async () => {
    const email = '';
    const password = '';

    const result = await userService.login(email, password);    
    expect(result).toBe(false);
  })

  it("should return a new user", async () => {
    const email = 'test02@mail.com';
    const password = '1234';

    const result = await userService.signup(email, password);
    expect(result).toBe('mocked-user');
  })

  it("should return an error if an info is wrong", async () => {
    const email = '';
    const password = '1234';

    const result = await userService.signup(email, password);
    expect(result).toBe(false);
  })
});