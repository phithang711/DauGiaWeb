
(function ($) {
  "use strict";


  /*==================================================================
  [ Focus input ]*/
  $('.input100').each(function(){
      $(this).on('blur', function(){
          if($(this).val().trim() != "") {
              $(this).addClass('has-val');
          }
          else {
              $(this).removeClass('has-val');
          }
      })    
  })


  /*==================================================================
  [ Validate ]*/
  var input = $('.validate-input .input100');
  $(document).ready(function() {
      $('.input100').val('');
  });
  $('#signupForm').submit(function (event) {
      event.preventDefault();
      validate();
    });

    function validate() {   
      var check = true;
      for(var i=0; i<input.length; i++) {
          if(validateText(input[i]) == false){
              showValidate(input[i]);
              check=false;
          }
      }
      if (check === true) {
          const username = $('#username').val();
          $('#signupForm').off('submit').submit();
      }
    }


  $('.validate-form .input100').each(function(){
      $(this).focus(function(){
         hideValidate(this);
      });
  });

  function validateText (input) {
      const val = $(input).val()
      if($(input).attr('type') === 'email' || $(input).attr('name') == 'email') {
          if (!validateEmail(val)) {
              return false;
          }
      } else if($(input).attr('name') === 'password') {
          if(!validatePassword(val)) {
              return false
          }
      } else if($(input).attr('name') === 're-password') {
        console.log($('#password').val());
        return val === $('#password').val();
      }
      else {
          if(val.trim() == '' ){
              return false;
          }
      }
  }

  function validatePassword(password) {
      var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      return re.test(password);
  }

  function validateEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    }
    

  function showValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).addClass('alert-validate');
  }

  function hideValidate(input) {
      var thisAlert = $(input).parent();

      $(thisAlert).removeClass('alert-validate');
  }
  
  /*==================================================================
  [ Show pass ]*/
  var showPass = 0;
  $('.btn-show-pass').on('click', function(){
      if(showPass == 0) {
          $(this).next('input').attr('type','text');
          $(this).find('i').removeClass('zmdi-eye');
          $(this).find('i').addClass('zmdi-eye-off');
          showPass = 1;
      }
      else {
          $(this).next('input').attr('type','password');
          $(this).find('i').addClass('zmdi-eye');
          $(this).find('i').removeClass('zmdi-eye-off');
          showPass = 0;
      }
      
  });


})(jQuery);



