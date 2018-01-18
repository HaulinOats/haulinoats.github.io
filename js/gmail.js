$('#contact-form').on('submit', (e)=>{
    e.preventDefault();
    console.log('send message attempting...');
    $.ajax({
        url:'/email',
        method:"POST",
        data:{
            name:$("#bdc-name").val(),
            email:$("#bdc-email").val(),
            message:$("#bdc-message").val()
        }
    })
    .done(function(resp){
        console.log('mail sent!');
        console.log(resp);
    })
    .fail(function(err){
        console.log('error on submit');
        console.log(err);
    });
});