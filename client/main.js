const baseUrl = 'http://localhost:3000'

$(document).ready(function () {
    authetication()
});

function authetication() {
    if (localStorage.token) {
        $('#video-page').show()
        $('#navbar').show()
        $('#login-form').hide()
        $('#register-form').hide()
        $('.message').empty();
        $('#football-data').hide()
        videoSlide()
        
    } else {
        $('#login-form').show()
        $('#video-page').hide()
        $('#register-form').hide()
        $('#news-page').hide()
        $('#navbar').hide()
        $('.message').empty();
        $('#football-data').hide()
    }
}

function registerBtn() {
    $('.message').empty()
    $('#register-form').show()
    $('#video-page').hide()
    $('#login-form').hide()
    $('#news-page').hide()
    $('#football-data').hide()
}

function newsBtn() {
    fetchNews()
   // console.log('tes')
   $('#video-page').hide()
    $('#news-page').show()
    $('#football-data').hide()
    
}

function dataBtn() { 
    fetchStandings()
    $('#news-page').hide()
    $('#video-page').hide()
    $('#football-data').show()
}


function homeBtn() {
    $('#video-page').show()
    $('#news-page').hide()
    $('#football-data').hide()
}

function logout() {
    localStorage.clear()
    authetication()
    signOut()
}

function login(event) {

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

function register() {
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
        .done(data => {
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

function fetchNews() {
    console.log('tes')
    $.ajax({
        method: 'get',
        url: `${baseUrl}/news/premierleague`
    })
        .done(data => {
            $('.card-deck').empty()
            let selectedNews = []
            for (let i = 0; i < 20; i++) {
                selectedNews.push(data.data.articles[i])
            }

            selectedNews.forEach(news => {
                $('.card-deck').append(`
            <!-- News jumbotron -->
            <div class="jumbotron text-center hoverable p-4">
            
              <!-- Grid row -->
              <div class="row">
            
                <!-- Grid column -->
                <div class="col-md-4 offset-md-1 mx-3 my-3">
            
                  <!-- Featured image -->
                  <div class="view overlay">
                    <img src="${news.urlToImage}" class="img-fluid" alt="Sample image for first version of blog listing">
                    <a>
                      <div class="mask rgba-white-slight"></div>
                    </a>
                  </div>
            
                </div>
                <!-- Grid column -->
            
                <!-- Grid column -->
                <div class="col-md-7 text-md-left ml-3 mt-3">
            
                  <!-- Excerpt -->
                  <a href="#!" class="green-text">
                    <h6 class="h6 pb-1"><i class="fas fa-desktop pr-1"></i> Work</h6>
                  </a>
            
                  <h4 class="h4 mb-4">${news.title}</h4>
            
                  <p class="font-weight-normal">${news.description}</p>
                  <p class="font-weight-normal">by <a><strong>${news.source.name}</strong></a>, ${news.publishedAt.slice(0, 10)}</p>
            
                  <button type="button" class="btn btn-outline-light">Read More</button>
            
                </div>
                <!-- Grid column -->
            
              </div>
              <!-- Grid row -->
            
            </div>
            <!-- News jumbotron -->
            `)
            })
        })
        .fail(err => {
            console.log(err.responseJSON, `==========error============`)
        })
}



function fetchStandings() {
    $('.loading').show()
    $.ajax({
        method: 'get',
        url: `${baseUrl}/matchdata/standings`
    })
        .done(data => {
            $('.loadingdata').hide()
            $('.tablestanding tbody').empty()
            const table = data.data.data.table
            
            table.forEach(standing => {
                $('.tablestanding tbody').append(`
            <tr>
            <th scope="row">${standing.rank}</th>
            <td>${standing.name}</td>
            <td>${standing.matches}</td>
            <td>${standing.won}</td>
            <td>${standing.drawn}</td>
            <td>${standing.lost}</td>
            <td>${standing.goals_scored}</td>
            <td>${standing.goals_conceded}</td>
            <td>${standing.goal_diff}</td>
            <td>${standing.points}</td>
            </tr>
            `)
            })
        })
        .fail(err => {
            $('.loadingdata').hide()
            console.log(err.responseJSON, `==========error============`)
        })

    .fail(err => {
        console.log(err.responseJSON, `==========error============`)
    })
}

function videoSlide(){
    console.log('masuk bro')
    $.ajax({
        method: 'GET',
        url: `${baseUrl}/football-video`
    })
    .done(data=>{
        $('.card-img').empty()
        // console.log(data)
        for (let i = 0; i < 10; i++) {
            $('.card-img').append(`
            <div class="col mb-4">
            <div class="card">
              <img src="${data[i].thumbnail}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${data[i].title}</h5>
                <p class="card-text">Last updated ${data[i].date.slice(0,10)}.</p>
                <a href="${data[i].url}" class="btn btn-primary" target="_blank">Wasting your data</a>
              </div>
            </div>
          </div>
            `)
        }
    })
    .fail(err=>{
        console.log(err.responseJSON, `==========error============`)
    })
}


            
