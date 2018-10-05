import axios from 'axios';
import { siteConfig } from '../config';

export default class HealthCheckService {
  constructor (token) {
    this.accessToken = token;
  }

  async getHealthCheckInfo () {
    const result = await axios.get(
      `${siteConfig.apiBaseUrl}/api/health`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        }
      });
    return result.data;
  }
};
