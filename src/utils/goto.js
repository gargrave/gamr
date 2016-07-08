import {browserHistory} from 'react-router';


export default {
  /**
   * Attempts to navigate the browser to the 'list' view for the specified module.
   *
   * @param module - The name of the module to navigate to
   */
  list(module) {
    browserHistory.push(`/${module}s`);
  },

  /**
   * Attempts to navigate the browser to the 'detail' view for the specified module.
   *
   * @param module - The name of the module to navigate to
   * @param id - The id of the specific object to load
   */
  detail(module, id = '') {
    browserHistory.push(`/${module}/${id}`);
  },

  /**
   * Attempts to navigate the browser to the 'create' view for the specified module.
   *
   * @param module - The name of the module to navigate to
   */
  create(module) {
    this.detail(module);
  },

  route(route) {
    browserHistory.push(route);
  }
};
