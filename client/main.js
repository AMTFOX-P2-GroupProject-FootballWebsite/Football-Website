const baseUrl = 'http://localhost:3000'

$(document).ready(function() {
    authetication()
});

function authetication() {
    if(localStorage.token){
        $('#home-page').show()
        $('#navbar').show()
        $('#login-form').hide()
        $('#register-form').hide()
        $('.message').empty();
        fetchList()
    } else {
        $('#login-form').show()
        $('#home-page').hide()
        $('#register-form').hide()
        $('#navbar').hide()
        $('.message').empty();
    }
}

function registerBtn() {
    $('.message').empty()
    $('#register-form').show()
    $('#home-page').hide()
    $('#login-form').hide()
}


function homeBtn (){
    $('#home-page').show()
}

function logout() {
    localStorage.clear()
    authetication()
    signOut()
}

function login() {
    event.preventDefault()
    let email = $('#email-login').val()
    let password = $('#password-login').val()
    $.ajax({
        url: `${baseUrl}/login`,
        method: `POST`,
        data: {
            email,
            password
        }
    })
        .done(data => {
            //console.log(data.token)
            localStorage.setItem('token', data.token);
            authetication()
        })
        .fail(err => {
            $('.message').empty();
            $('.message').append(`
                <p>${err.responseJSON.msg}</p>
            `)
        })
        .always(() => {
            email = $('#email-login').val()
            password = $('#password-login').val()
        })
}

function register (){
    event.preventDefault();
    let name = $('#fullname').val()
    let email = $('#email-register').val()
    let password = $('#password-register').val()

    $.ajax({
        url: `${baseUrl}/register`,
        method: "POST",
        data: {
            name,
            email,
            password
        }
    })
        .done(data => {
            authetication()
        })
        .fail(err => {
            $('.message').empty();
            $('.message').append(`
                <p class="alert alert-warning">${err.responseJSON.msg}</p>
            `)
        })
        .always(() => {
            name = $('#fullname').val()
            email = $('#email-login').val()
            password = $('#password-login').val()
        })
}

function onSignIn(googleUser) {
    var id_token = googleUser.getAuthResponse().id_token;
    // console.log(id_token)
    $.ajax({
        url: `${baseUrl}/google`,
        method: 'POST',
        data: {
            id_token
        }
    })
    .done(data =>{
        localStorage.setItem('token', data.token)
        authetication()
    })
    .fail(err => {
        // console.log(err)
        $('.message').empty();
        $('.message').append(`
                <p class="alert alert-warning">${err}</p>
        `)
    })
  }

function signOut() {
    let auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}