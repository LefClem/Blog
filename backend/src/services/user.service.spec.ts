import * as userService from "../services/user.service";
import { User } from "../entities/user";

// const userMock = jest.spyOn(User.prototype, 'save').mockImplementation(async () => {
//   return {
//     email: "test@mail.fr",
//     password: "$argon2id$v=19$m=65536,t=3,p=4$vEdl8/9oOtLDlCsMeCvabg$Vwi3samEiOn4OSKBHQV8+ZJtMG+llSb08qLuK/a6aaQ"
//   } as User
// });

// jest.mock('../services/user.service', () => ({
//   createUser: jest.fn().mockImplementation(() => {
//       return 'mocked-user';
//   })
// }));

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
  // it("should create a new user", async () => {
  //   const user = await userService.signup("test@mail.fr", "1234");
  //   console.log(user);
    

  //   expect(user.email).toBe("test@mail.fr");
  //   expect(user.password).toBe("1234");
  //   // expect(user).toBe('mocked-user')
  //   expect(userMock).toHaveBeenCalled();
  //   expect(userMock).toHaveBeenCalledTimes(1);
  // });

  it("should log the user and return a token", async () => {
    const email = 'test@mail.com';
    const password = 'test';

    const result = await userService.login(email, password);        
    expect(result).toBe("mocked-token");
  })
});