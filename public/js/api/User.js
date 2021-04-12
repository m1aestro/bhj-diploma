/**
 * Класс User управляет авторизацией, выходом и
 * регистрацией пользователя из приложения
 * Имеет свойство URL, равное '/user'.
 * */
class User {
  /**
   * Устанавливает текущего пользователя в
   * локальном хранилище.
   * */
  static URL = '/user';
  
  static setCurrent(user) {
    localStorage.user = JSON.stringify(user);
  }

  /**
   * Удаляет информацию об авторизованном
   * пользователе из локального хранилища.
   * */
  static unsetCurrent() {
    delete localStorage.user;
  }

  /**
   * Возвращает текущего авторизованного пользователя
   * из локального хранилища
   * */
  static current() {
    if (localStorage.user) {
      return JSON.parse(localStorage.user);
    } else {
      return null;
    }

    //return null;
  }

  /**
   * Получает информацию о текущем
   * авторизованном пользователе.
   * */
  static fetch(callback) {
    const url = User.URL + '/current';
    const fetchCallback = (err, response) => {
      if (err == null && response.success) {
        User.setCurrent(response.user);
      } else {
        User.unsetCurrent();
      }
      callback(err, response);
    }
    const options = {
      url: url,
      method: 'GET', 
      responseType: 'json', 
      callback: fetchCallback,
    };
    return createRequest(options);
  }

  /**
   * Производит попытку авторизации.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
   static login( data, callback = f => f ) {
    const url = User.URL + '/login';
    const loginCallback = (err, response) => {
      if (response && response.user) {
        User.setCurrent(response.user);
      };
      callback(err, response);
    }
    const options = {
      url: url, 
      method: 'POST',
      data: data,
      responseType: 'json',
      callback: loginCallback,
    };
    return createRequest(options);
  }

  /**
   * Производит попытку регистрации пользователя.
   * После успешной авторизации необходимо
   * сохранить пользователя через метод
   * User.setCurrent.
   * */
  static register(data, callback) {
    const url = User.URL + '/register';
    const registerCallback  = (err, response) => {
      if (response && response.user) {
        User.setCurrent(response.user);
      }
      callback(err, response);
    }
    const options = {
      url: url,
      method: 'POST',
      data: data,
      responseType: 'json',
      callback: registerCallback ,
    };
    return createRequest(options);
  }

  /**
   * Производит выход из приложения. После успешного
   * выхода необходимо вызвать метод User.unsetCurrent
   * */
  static logout(data, callback) {
    const url = User.URL + '/logout';
    const logoutCallback  = (err, response) => {
      if (response && response.success === true) {
        User.unsetCurrent();
      }
      callback(err, response);
    }
    const options = {
      url: url,
      method: 'POST',
      data: data,
      responseType: 'json',
      callback: logoutCallback ,
    };
    return createRequest(options);
  }
}