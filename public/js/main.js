//calling delete function
$(document).ready(() => {
    $(".deleteParticipant").on('click', deleteUser);
    $(".filter").on('click', empty);
});

//defining delete function

function deleteUser() {
    $.ajax({
        type: 'DELETE',
        url: '/delete/part/' + $(this).data('id')
    }).done(function (response) {
        window.location.replace('/manage');
    })
    window.location.replace('/manage');
}

//empty fields set to empty
/*function empty(){
var input = [document.getElementsByName('searchbyname').val(),document.getElementsByName('searchByFathersName').val(),document.getElementsByName('searchByDob').val(),document.getElementsByName('searchByCamp').val()] 
input.forEach(function(search){
    search.length==0;
search.value = "empty";
})*/

function empty() {
    
    var input0 = document.getElementById('name');

    if (!input0.value)
        input0.value = "empty";
    
    var input1 = document.getElementById('fName');

    if (!input1.value)
        input1.value = "empty";
    
    var input2 = document.getElementById('dob');

    if (!input2.value)
        input2.value = "1111-11-11";
    
    var input3 = document.getElementById('camp');

    if (!input3.value)
        input3.value = "empty";
}
