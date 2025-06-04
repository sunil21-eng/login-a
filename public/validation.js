$(document).ready(function(){
$('#login').validate({
rules:{
    username:{
        required:true,
        minlength: 8,
    },
    password:{
        required:true,
        minlength: 8,
    }

}
})

});