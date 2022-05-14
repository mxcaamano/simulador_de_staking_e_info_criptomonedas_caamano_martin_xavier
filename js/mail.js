function ValidarInputs() {
    const nombre = document.getElementById('fname').value;
    const apellido = document.getElementById('lname').value;
    const email = document.getElementById('email').value;
    const txtconsulta = document.getElementById('message').value;
    const validChar = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    nombre !== "" && apellido !== "" && email !== "" && txtconsulta !== "" && email.match(validChar) ? 
      toastOK(`Gracias! 👍 Nos contactaremos a la brevedad al correo: ${email}`,'3000') : toastError("Complete los campos vacíos");
    email.match(validChar) ? "" : setTimeout(function(){ toastError("Recuerde que el eMail debe tener el siguiente formato: xxxxxxx@xxxxx.xxx ")}, 500);  
  }