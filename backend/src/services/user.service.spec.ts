import * as userService from "../services/user.service";
import { User } from "../entities/user";

jest.mock('../services/user.service', () => ({
  login: jest.fn().mockImplementation((email: string, password: string) => {
    if(email === 'invalid@mail.com' && password === 'wrongpassword'){
        return false
    } else {
        return 'mocked-token';
    }
  })
}));

describe("User service", () => {

  it("should log the user and return a token", async () => {
    const email = 'test@mail.com';
    const password = 'test';

    const result = await userService.login(email, password);        
    expect(result).toBe("mocked-token");
  })
});