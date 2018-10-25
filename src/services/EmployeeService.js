import axios from 'axios';

import { siteConfig } from '../config';

export default class EmployeeService {
  constructor (token) {
    this.accessToken = token;
  }

  getBasicHeaders () {
    return { Authorization: `Bearer ${this.accessToken}` };
  }

  async requestWithBody (url, method, data) {
    const response = await axios({
      method,
      url: `${siteConfig.apiBaseUrl}/${url}`,
      headers: this.getBasicHeaders(),
      data
    });
    return response.data;
  }

  async createNewEmployee (employee) {
    const result = await axios(
      {
        method: 'post',
        url: `${siteConfig.apiBaseUrl}/api/employee`,
        headers: this.getBasicHeaders(),
        data: employee
      });
    return result;
  }
  async getEmployees () {
    const response = await axios(
      {
        method: 'get',
        url: `${siteConfig.apiBaseUrl}/api/employee`,
        headers: this.getBasicHeaders()
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
  async updateEmployee (employee) {
    var response = await this.requestWithBody('api/employee', 'put', employee);
    return response;
  }
};
