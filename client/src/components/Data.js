export default class Data {
  // A function to fetch data passing "url, method, body, requiresAuth, credentials".
  fetchData(url, method, body = null, requiresAuth = false, credentials = null) {
    const configs = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      }
    }

    // If body isn't null convert it to JSON format.
    if (body !== null) {
      configs.body = JSON.stringify(body);
    }

    // If requiresAuth isn't null, encode credentials in base64 and set Authorization Header to encoded credentials.
    if (requiresAuth) {
      const encodedCredentials = btoa(`${credentials.username}:${credentials.password}`);

      configs.headers['Authorization'] = `Basic ${encodedCredentials}`;
    }

    // Return fetch with options.
    return fetch(url, configs)
  }

  // A function to update course.
  async updateCourse(course, username, password, id) {
    const response = await this.fetchData(`http://localhost:5000/api/courses/${id}`, 'PUT', course, true, { username, password });

    if (response.status === 204) {
    } else if (response.status === 400 || response.status === 401) {
      return response.json().then(data => data);
    }  else {
      return response.json().then(data => data);
    }
  }

  // A function to delete course.
  async deleteCourse(username, password, id) {
    const response = await this.fetchData(`http://localhost:5000/api/courses/${id}`, 'DELETE', null, true, { username, password });

    if (response.status === 204) {
    } else if (response.status === 400 || response.status === 401) {
      return response.json().then(data => data);
    }  else {
      return response.json().then(data => data);
    }
  }

  // A function to create course.
  async createCourse(course, username, password) {
    const response = await this.fetchData('http://localhost:5000/api/courses', 'POST', course, true, { username, password });

    if (response.status === 201) {
    } else if (response.status === 400 || response.status === 401) {
      return response.json().then(data => data);
    }  else {
      return response.json().then(data => data);
    }
  }

  // A function to get user.
  async getUser(username, password) {
    const response = await this.fetchData('http://localhost:5000/api/users/', 'GET', null, true, { username, password });

    if (response.status === 200) {
      return response.json().then(data => data);
    }
    else if (response.status === 401) {
      return null;
    }
    else {
      return response.json().then(data => data);
    }
  }

  // A function to create user.
  async createUser(user) {
    const response = await this.fetchData('http://localhost:5000/api/users/', 'POST', user);

    if (response.status === 201) {
    } else if (response.status === 400) {
      return response.json().then(data => data.error);
    } else {
      return response.json().then(data => data);
    }
  }
}
