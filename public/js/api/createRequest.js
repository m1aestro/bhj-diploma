/**
 * Основная функция для совершения запросов
 * на сервер.
 * */
const createRequest = (options = {}) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = options.responseType;
  let formData;
  const url =  new URL(location.origin + options.url);

  if (options.method === 'GET') {
    for (let key in options.data) {
      url.searchParams.set(key, options.data[key]);
    }
  } else {
    formData = new FormData;
    for (let key in options.data) {
        formData.append(key, options.data[key]);
    }
  }

  if (options.headers) {
    for(let key in options.headers) {
        xhr.setRequestHeader(key, options.headers[key]);
    }
  }

  xhr.addEventListener('readystatechange', function () {
    if (this.readyState === xhr.DONE && this.status === 200) {
        if(this.response.error) {
          options.callback(err = this.response.error);
        } else { 
          options.callback(err = null, this.response);
        }
    }
  });
  xhr.withCredentials = true;

  xhr.open(options.method, url);
  try {
    if (options.method === "GET") {
      xhr.send();
    } else {
      xhr.send(formData);
    }

    return xhr;
  } catch (error) {
    options.callback(err = error);   
  }
};
