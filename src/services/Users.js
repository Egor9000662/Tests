import axios from "axios";
export class Users {
  static CreateUser = async (name, job) => {
    try {
      const result = await axios.post("https://reqres.in/api/users", {
        data: {
          name: name,
          job: job,
        },
      });
      return { status: result?.status, data: result?.data };
    } catch (error) {
      return {
        status: error?.response?.status,
        message: error?.response?.data?.message,
        error: error.message,
      };
    }
  };
  static getUsersList = async () => {
    try {
      const result = await axios.get("https://reqres.in/api/users?page=1");
      return { status: result?.status, data: result?.data };
    } catch (error) {
      return {
        status: error?.response?.status,
        message: error?.response?.data?.message,
        error: error.message,
      };
    }
  };
  static UsersCard = async (id) => {
    console.log(id);
    try {
      const result = await axios.get(`https://reqres.in/api/users/${id}`);
      return { status: result?.status, data: result?.data };
    } catch (error) {
      return {
        status: error?.response?.status,
        message: error?.response?.data?.message,
        error: error.message,
      };
    }
  };
  static RandomUser = async (numbers) => {
  
    try {
      const result = await axios.get(`https://randomuser.me/api/?results=${numbers}`);
      return { status: result?.status, data: result?.data };
    } catch (error) {
      return {
        status: error?.response?.status,
        message: error?.response?.data?.message,
        error: error.message,
      };
    }
  };
  static RandomUsers = async () => {
  
    try {
      const result = await axios.get(`https://randomuser.me/api/`);
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
