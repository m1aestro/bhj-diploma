/**
 * Класс Entity - базовый для взаимодействия с сервером.
 * Имеет свойство URL, равно пустой строке.
 * */
class Entity {
  /**
   * Запрашивает с сервера список данных.
   * Это могут быть счета или доходы/расходы
   * (в зависимости от того, что наследуется от Entity)
   * */
  static URL = "";
  static list(data, callback = f => f) {
    const options = {
      url: this.URL,
      method: 'GET',
      data: data,
      responseType: 'json',
      callback: callback
    };
    return createRequest(options);
  }

  /**
   * Создаёт счёт или доход/расход с помощью запроса
   * на сервер. (в зависимости от того,
   * что наследуется от Entity)
   * */
  static create(data, callback = f => f) {
    const modifiedData = Object.assign({ _method: 'PUT' }, data );
    const options = {
      url: this.URL,
      data: modifiedData,
      method: 'PUT',
      responseType: 'json',
      callback: callback,
    };
    return createRequest(options);
  }

  /**
   * Удаляет информацию о счёте или доходе/расходе
   * (в зависимости от того, что наследуется от Entity)
   * */
  static remove(id = '', data, callback = f => f) {
    const modifiedData = Object.assign({id, _method: 'DELETE'}, data);
    const options = {
      url: this.URL,
      data: modifiedData,
      method: 'DELETE',
      responseType: 'json',
      callback: callback,
    };
    return createRequest(options);
  }
}
