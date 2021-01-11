'use strict'

function secondsToString(seconds) {
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10)? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10)? '0' + second : second;
    return minute + ':' + second;
  }

  

  function loadPlaylist(id){
    console.log(id);
    document.getElementById("container-llistes").style.display="none";
    document.getElementById("link-back").style.display="block";
    document.getElementById("llista-concreta").style.display="block";

    var request = $.ajax({
        type: 'GET',
        url: `https://api.deezer.com/playlist/${id}/tracks?output=jsonp`, 
        dataType: 'jsonp',      
        beforeSend: function() { $("#loading-icon").show(); $('#load-content').hide() }, 
        success: function(data) {


            let llistaConcreta = data.data;
                console.log(llistaConcreta);

            for ( let i=0 ; i<llistaConcreta.length; i++){
                $("#llista-concreta").append(`<div><img src="${llistaConcreta[i].album.cover_small}"><h4>${llistaConcreta[i].title}</h4><h5>${llistaConcreta[i].artist.name}</h5><p>${llistaConcreta[i].duration}</p><hr></div>`);
            }

        }
    });

        request.done(function() {
            setTimeout(showContent(), 1000); 
        });

        request.fail(function( jqXHR, textStatus ) {
            $("#loading-img").hide();
            $("#loading-msg").append('<span> Error: ' + jqXHR.status + ", " + textStatus + '</span>');
            $("#loading-msg").show();
        });
        function showContent(){
            $("#loading-icon").hide().fadeOut( 'slow' );  
            $('#load-content').show().slideDown( 1000 );  
        }
        }


function loadHome(){
    document.getElementById("search-page").style.display="none";
    var request = $.ajax({
        type: 'GET',
        url: 'https://api.deezer.com/chart/0/playlists?output=jsonp', 
        dataType: 'jsonp',      
        beforeSend: function() { $("#loading-icon").show(); $('#load-content').hide() }, 
        success: function(data) {
            document.getElementById("link-back").style.display="none";


            
            for (let i=0;i<data.data.length;i++){
                sessionStorage.setItem=(data)

                let llista = data.data[i];
                var titol =llista.title;
                console.log(titol)

                $("#llistes").append(`
                <a onclick="loadPlaylist(${llista.id})">
                <article class="llista-card">
                <img src="${llista.picture_medium}">
                <h4>${llista.title}</h4>
                </article>
                </a>`);
            }
            console.log(titol)
        }  
    });
    
    
    // PAC 3 Exercici 1.4: Icona de càrrega
    function showContent(){
        $("#loading-icon").hide().fadeOut( 'slow' );  
        $('#load-content').show().slideDown( 1000 );  
    }
      
    request.done(function() {
        setTimeout(showContent(), 1000); 
    });
    
    request.fail(function( jqXHR, textStatus ) {
        $("#loading-img").hide();
        $("#loading-msg").append('<span> Error: ' + jqXHR.status + ", " + textStatus + '</span>');
        $("#loading-msg").show();
    });
}
            

$(document).ready(function ( ) {
    
   
    $('[tabindex]').on('focus', '.user', function( ) {
        $(".user").css('outline', 'none');
    });
    $('[tabindex]').on('keyup', function ( e ) {
        if(e.keyCode == 9){
            $(".user").css('outline', '');
        }
    });

    $(document).on('keypress', function (e) {
        if(e.which == 13){
            $('.user').popover( 'toggle' ).fadeIn( 'slow' );
        }
    });

    $(document).on('click', function (e) {
        $('[data-toggle=popover]').popover();

        $('[data-toggle=popover]').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.user').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    loadHome();
});


function getTracks(query){
    $("#search-page").empty();
  



var request = $.ajax({
    type: 'GET',
    url: `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=track:"${query}"`, 
    beforeSend: function() { $("#loading-icon").show(); $('#load-content').hide() },
    success: function(data) {
        console.log("tracks")
        let tracks=data.data;
        console.log(tracks);

        for (let i=0 ; i<tracks.length; i++){
            $("#search-page").append(`
            <article>
            <h4>${tracks[i].title}</h4>
            </article>
            `);
            console.log(tracks[i].title);
            document.getElementById("container-llistes").style.display="none";

        }
        console.log(tracks)
        request.done(function() {
            setTimeout(showContent(), 1000); 
        });
    
        request.fail(function( jqXHR, textStatus ) {
            $("#loading-img").hide();
            $("#loading-msg").append('<span> Error: ' + jqXHR.status + ", " + textStatus + '</span>');
            $("#loading-msg").show();
        });
        function showContent(){
            $("#loading-icon").hide().fadeOut( 'slow' ); 
            $('#load-content').show().slideDown( 1000 );  
        }

    }
})
}

function getArtists(query){
    let request = $.ajax({
        type: 'GET',
        url: `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=artist:"${query}"`, 
        beforeSend: function() { $("#loading-icon").show(); $('#load-content').hide() }, 
        success: function(data) {
            console.log("artists")
            let artists = data.data;
            console.log(artists)


            for (let i=0 ; i<artists.length; i++){
                $("#search-page").append(`
                <article>
                <h4>${artists[i].title}</h4>
                </article>
                `);
                console.log(artists[i].title)
                document.getElementById("container-llistes").style.display="none";

            }

        }
    })

    request.done(function() {
        setTimeout(showContent(), 1000); 
    });

    request.fail(function( jqXHR, textStatus ) {
        $("#loading-img").hide();
        $("#loading-msg").append('<span> Error: ' + jqXHR.status + ", " + textStatus + '</span>');
        $("#loading-msg").show();
    });
    function showContent(){
        $("#loading-icon").hide().fadeOut( 'slow' );  
        $('#load-content').show().slideDown( 1000 );  
    }
}

function getAlbums(query){
    var request = $.ajax({
        type: 'GET',
        url: `https://cors-anywhere.herokuapp.com/https://api.deezer.com/search?q=album:"${query}"`, 
        beforeSend: function() { $("#loading-icon").show(); $('#load-content').hide() }, 
        success: function(data) {
            console.log("albums");
            let albums=data.data;
            console.log(albums);

            for (let i=0 ; i<albums.length; i++){
                $("#search-page").append(`
                <article>
                <h4>${albums[i].title}</h4>
                </article>
                `);
                console.log(albums[i].title)
                document.getElementById("container-llistes").style.display="none";

            }
            request.done(function() {
                setTimeout(showContent(), 1000); 
            });
        
            request.fail(function( jqXHR, textStatus ) {
                $("#loading-img").hide();
                $("#loading-msg").append('<span> Error: ' + jqXHR.status + ", " + textStatus + '</span>');
                $("#loading-msg").show();
            });
            function showContent(){
                $("#loading-icon").hide().fadeOut( 'slow' );  
                $('#load-content').show().slideDown( 1000 ); 
            }
           
        }
    })
}


function searchResults(query) {
    console.log(query);
    document.getElementById("search-page").style.display="block";
    document.getElementById("link-back").style.display="block";
    document.getElementById("llista-concreta").style.display="none";


    getTracks();
    getArtists();
    getAlbums();

}


$("#searchForm").on("submit", callback => {
    let query = $("#searchText").val();
    callback.preventDefault();
    if ($("#searchText").val()) {
        searchResults(query);


    }
  });


document.addEventListener('DOMContentLoaded', function(){
    if(document.getElementById('main-search') !== null){
        document.getElementById('main-search').innerHTML = getParameters("search-field");

    }
});



