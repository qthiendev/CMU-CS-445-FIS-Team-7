$(document).ready(function() {
    $('#userForm').submit(function(event) {
      event.preventDefault();
      var email = $('#inputEmail4').val();
      var password = $('#inputPassword4').val();
      if (!email || !password) {
        $('#myModal').modal('show');
      } else {
        this.submit();
      }
    });

    $('#btn').click(function() {
      $('#myModal').modal('hide');
    });
  });