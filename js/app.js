
  //Traer elementos del HTML
  var $nameInput = $("#name-input");
  var $phoneInput = $("#phone-input");
  var contactArray = [];



  var loadPage = function () {
    $(".modal").modal();
    $("#form").submit(addContact);
    $nameInput.keyup(validateContact);
    $phoneInput.keyup(validateContact);
    $("#searcher").keyup(filterContacts);
    };

  var validateContact = function () {
    //En esta funcion tenemos que validar que el usuario ingrese datos y no valores vacios
    var $containerAddContact = $("#add-contact");
    if($(this).val().trim().length > 0){
      $containerAddContact.removeAttr("disabled");
    }  else{
      $containerAddContact.attr("disabled", true);
    }
  };


  var paintContactsInHTML = function(contact) {

    /* Crear elementos con DOM html al publicar contacto */
    var $newContact = $('<article/>',{'class':'card-panel hoverable'});
    var $nameContact = $('<h4/>');
    var $btnDeleteContact = $('<button type="button"/>');
    var $btnIcon = $('<i/>', {'class':'material-icons'});
    var $phoneContact = $('<p/>');

    //Asignando atributos y/o eventos
    $btnDeleteContact.addClass("btn right");
    $btnIcon.text("delete");
    $btnDeleteContact.click(removeContact);

    /* Asignando valores a los elementos*/
     $nameContact.text(contact.name);
     $phoneContact.text(contact.phone);

    //Agregamos lo que creamos con el DOM a un elemento existente del HTML
    $btnDeleteContact.append($btnIcon);
    $newContact.append($nameContact);
    $newContact.append($btnDeleteContact);
    $newContact.append($phoneContact);

    $("#publish-contacts").prepend($newContact);

  };

  var addContact = function (e) {
    e.preventDefault();
    //Las siguientes lineas toman el valor que el usuario agrega en los inputs y los guardan en variables
    var nameVal = $nameInput.val();
    var phoneVal = $phoneInput.val();
    //Con las variables separadas que obtuvimos creamos una estructura de datos unica, un objeto por cada contacto

    var contact = {
      "name" : nameVal,
      "phone" : phoneVal
    };
    /*Agregamos el contacto a nuestra data (arreglo declarado) para poderla filtrar y eliminar posteriormente*/
    contactArray.push(contact);

    //La siguiente funcion se encarga de pintar los contactos en el html
    paintContactsInHTML(contact);

    /* Limpiando valores de formulario*/
    $nameInput.val(" ");
    $phoneInput.val(" ");
    $(".modal").modal("close");
  };

  var filterContacts = function() {
    //Esta funcion debe de filtrar la data segun el valor que el usuario ingrese en el input de busqueda
    var searchContact = $("#searcher").val().toLowerCase();
    if($("#searcher").val().trim().length > 0){
      var filteredContacts = contactArray.filter(function(contact) {
        return contact.name.toLowerCase().indexOf(searchContact) >= 0;
      });
      $("#publish-contacts").empty();
      filteredContacts.forEach(function(contact) {
        paintContactsInHTML(contact);
      });
    } else {
      $("#publish-contacts").empty();
      contactArray.forEach(function(contact) {
        paintContactsInHTML(contact);
      });
    }
  };

  var removeContact = function () {
    //esta funcion como primer alcance debe de poer borrar la tarjeta que se crea desde el DOM
    //como segundo alcance borrar el elemento de la data
  };




  $(document).ready(loadPage);
