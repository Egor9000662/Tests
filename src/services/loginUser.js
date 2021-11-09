import axios from "axios";

export const HttpConfigLogin = {
  baseURL: "https://petstore.swagger.io/v2",
  responseType: "json",
  headers: { accept: "application/json" },
};


class HttpProvider {
  static api = axios.create(HttpConfigLogin);
  static getBaseURL() {
    return HttpConfigLogin.baseURL;
  }


  static get(url, headers) {
    return HttpProvider.api.get(url, { headers: headers }).catch(function (e) {
      if (e.response) {
        console.log(e);
      } else if (e.request) {
        console.log(e);
      } else {
        console.log(e);
      }
    });
  }

  
}

export default HttpProvider;


export class LoginUsers{
  
        static LoginUser = async (login,password) => {
            const url = `/user/login?username=${login}&password=${password} `
           
          try {
            const result = await HttpProvider.get(url);
            return { status: result?.status, data: result?.data };
          } catch (error) {
            return {
              status: error?.response?.status,
              message: error?.response?.data?.message,
              error: error.message,
            };
          }
        };
}