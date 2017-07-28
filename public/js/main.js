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
$ajax({
    type:'GET',
    url: '/manage/filter/:name/:fname/:dob/:camp'
})
}

