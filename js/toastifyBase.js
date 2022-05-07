function toastError(text){
    Toastify({
       text: text,
       duration: "2500",
       gravity: 'bottom',
       style: {
          background: "red",
          boxShadow: 'none',
          maxWidth: '70%'
       },
    }).showToast();
}

function toastOK(text,duration,destination){
   Toastify({
      text: text,
      duration: duration,
      gravity: 'bottom',
      close: true,
      destination: destination,
      style: {
         background: "#00a753",
         boxShadow: 'none',
         maxWidth: '70%'
      },
      onClick: ()=>{

      }
   }).showToast();
}

