function ValidarInputs() {
    const nombre = document.getElementById('fname');
    const apellido = document.getElementById('lname');
    const email = document.getElementById('email');
    const txtconsulta = document.getElementById('message');
    const validChar = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
    email.value.match(validChar) ? "" : setTimeout(function(){ toastError("Recuerde que el eMail debe tener el siguiente formato: xxxxxxx@xxxxx.xxx ")}, 500);  
    nombre.value !== "" && apellido.value !== "" && email.value !== "" && txtconsulta.value !== "" && email.value.match(validChar) ? 
      InputsOK(nombre,apellido,email,txtconsulta) : toastError("Complete los campos correctamente");
  }

function InputsOK(nombre,apellido,email,txtconsulta) {
  toastOK(`Gracias! 👍 Nos contactaremos a la brevedad al correo: ${email.value}`,'3000')
  nombre.value = apellido.value = email.value = txtconsulta.value = null;
}