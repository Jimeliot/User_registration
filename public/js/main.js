//calling delete function
$(document).ready(() => {
    $(".deleteParticipant").on('click', deleteUser);
    $('.filter').on('click', filter);
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

function filter() {
    if(!$("#name").val()){
        $("#name").val("nil")
    }
    if(!$('#fName').val()){
        $('#fName').val('nil')
    }
    if(!$('#dob').val()){
        $('#dob').val('0001-01-01')
    }
    if(!$('#camp').val()){
        $('#camp').val('nil')
    }
    
    
    $.ajax({
        type: 'GET',
        url: '/manage/filter/' +$('#name').val()+ '/' + $('#fName').val() + '/' + $('#dob').val() + '/' + $('#camp').val()
    }).done(function (response) {
        window.location.replace('/manage');
    })
    window.location.replace('/manage');
}

