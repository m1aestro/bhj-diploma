/**
 * Класс Account наследуется от Entity.
 * Управляет счетами пользователя.
 * Имеет свойство URL со значением '/account'
 * */
class Account extends Entity {
  /**
   * Получает информацию о счёте
   * */
  static URL = "/account";

  static get(id = '', data, callback = f => f) {
    const change = (id !== '') ? this.URL + '/' + id : this.URL;
    const options = {
      url: change,
      method: 'GET', 
      data: data,
      responseType: 'json',
      callback: callback
    };
    return createRequest(options);
  }
}
