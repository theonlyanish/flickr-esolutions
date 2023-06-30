
const config = {
    url: 
}

export const getApi = (url, query) => {
    return fetch(`${config.url}${url}?${query}`);
} 

export const postApi = (url, data) => {
    let formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    return fetch(`${config.url}${url}`,  {
      method: 'POST',
      body: formData,
    });
}

export const putApi = (url, data) => {
    let formData = new FormData();
    formData.append('email', data.email);
    formData.append('password', data.password);
    return fetch(`${config.url}${url}`,  {
      method: 'PUT',
      body: formData,
    });
} 

export default config;