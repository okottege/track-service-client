import axios from 'axios';

import { siteConfig } from '../config';

export default class EmployeeService {
  constructor (token) {
    this.accessToken = token;
  }

  getBasicHeaders () {
    return { Authorization: `Bearer ${this.accessToken}` };
  }

  async createNewEmployee (employee) {
    const result = await axios(
      {
        method: 'post',
        url: `${siteConfig.apiBaseUrl}/api/employee`,
        headers: { Authorization: `Bearer ${this.accessToken}` },
        data: employee
      });
    return result;
  }
  async getEmployees () {
    const response = await axios(
      {
        method: 'get',
        url: `${siteConfig.apiBaseUrl}/api/employee`,
        headers: { Authorization: `Bearer ${this.accessToken}` }
      });
    return response.data;
  }
  async getEmployee (employeeId) {
    const response = await axios({
      method: 'get',
      url: `${siteConfig.apiBaseUrl}/api/employee/${employeeId}`,
      headers: this.getBasicHeaders()
    });
    return response.data;
  }
};
