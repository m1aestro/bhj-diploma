/**
 * Класс RegisterForm управляет формой
 * регистрации
 * */
class RegisterForm extends AsyncForm {
  /**
   * Производит регистрацию с помощью User.register
   * После успешной регистрации устанавливает
   * состояние App.setState( 'user-logged' )
   * и закрывает окно, в котором находится форма
   * */
  onSubmit(data) {
    const form = this;
    function checkRegistration(err, response) {
      if (response.success) {
        form.element.reset();
        App.setState('user-logged');
        const modal = App.getModal('register');
        modal.close();
      }
    }
    User.register(data, checkRegistration);
  }
}