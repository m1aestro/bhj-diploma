/**
 * Класс CreateAccountForm управляет формой
 * создания нового счёта
 * */
class CreateAccountForm extends AsyncForm {
  /**
   * Создаёт счёт с помощью Account.create и закрывает
   * окно в случае успеха, а также вызывает App.update()
   * и сбрасывает форму
   * */
  onSubmit(data) {
    const form = this;
    function checkCreateAccount(err, response) {
      if (response.success) {
        form.element.reset();
        const modal = App.getModal('createAccount');
        modal.close();
        App.update();
      }
    }
    Account.create(data, checkCreateAccount);
  }
}