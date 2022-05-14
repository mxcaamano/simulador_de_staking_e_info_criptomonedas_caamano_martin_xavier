function ValidarInputs() {

    var validChar = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  
    if (document.getElementById('email').value.match(validChar)) {
  
      toastOK("Gracias! 👍 A la brevedad nos contactaremos!",'3000');
  
      return true;
  
    } else {
  
      toastError("Ingrese correctamente el mail");
  
      document.getElementById('email').focus();
  
      return false;
  
    }
  
  }