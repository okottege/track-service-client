import axios from 'axios';

import { siteConfig } from '../config';

export default class EmployeeService {
  constructor (token) {
    this.accessToken = token;
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
};
