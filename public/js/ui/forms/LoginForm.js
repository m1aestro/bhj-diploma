/**
 * Класс LoginForm управляет формой
 * входа в портал
 * */
class LoginForm extends AsyncForm {
  /**
   * Производит авторизацию с помощью User.login
   * После успешной авторизации, сбрасывает форму,
   * устанавливает состояние App.setState( 'user-logged' ) и
   * закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    const form = this;
    function login(err, response) {
      if (response && response.success) {
        form.element.reset();
        App.setState('user-logged');
        const modal = App.getModal('login');
        modal.close();
      }
    }
    User.login(data, login);
  }
}