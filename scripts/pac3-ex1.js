'use strict'
/* Codi JavaScript PAC 3 Exercici 1 de Marc Segura */

// Funció auxiliar que rep segons com a paràmetre i els retorna en format minuts:segons.
function secondsToString(seconds) {
    // Transforma cada 60 segons en 1 minut i la resta com a segons; retorna el resultat amb el format corresponent
    var minute = Math.floor((seconds / 60) % 60);
    minute = (minute < 10)? '0' + minute : minute;
    var second = seconds % 60;
    second = (second < 10)? '0' + second : second;
    return minute + ':' + second;
  }

  

  function loadSongs(id){
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
            setTimeout(showContent(), 1000); // la funció setTimeout ens permet guanyar una mica de temps a l'hora de fer les transicions per mostrar el contingut descarregat. No és estrictament necessària per al correcte desenvolupament de la tasca en aquest cas però pot ser molt útil en altres situacions similars.
        });

        request.fail(function( jqXHR, textStatus ) {
            $("#loading-img").hide();
            $("#loading-msg").append('<span> Error: ' + jqXHR.status + ", " + textStatus + '</span>');
            $("#loading-msg").show();
        });
        function showContent(){
            $("#loading-icon").hide().fadeOut( 'slow' );  // Icona de càrrega desapareix lentament
            $('#load-content').show().slideDown( 1000 );  // Apareix el contingut del document de dalt a baix amb efecte desplegable en aprox. 1 segon
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
                <a onclick="loadSongs(${llista.id})">
                <article>
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
        $("#loading-icon").hide().fadeOut( 'slow' );  // Icona de càrrega desapareix lentament
        $('#load-content').show().slideDown( 1000 );  // Apareix el contingut del document de dalt a baix amb efecte desplegable en aprox. 1 segon
    }
      

    // PAC 3 Exercici 1.4: Com ja s'ha esmentat unes linies més amunt, podem controlar els errors o les accions un cop hem rebut les dades emprant aquestes funcions similars a error i complete
    // Si la petició ha finalitzat amb èxit, procedeix a mostrar el contingut
    request.done(function() {
        setTimeout(showContent(), 1000); // la funció setTimeout ens permet guanyar una mica de temps a l'hora de fer les transicions per mostrar el contingut descarregat. No és estrictament necessària per al correcte desenvolupament de la tasca en aquest cas però pot ser molt útil en altres situacions similars.
    });
    
    // Si hi ha algun problema durant la petició: mostra els errors al centre de la pantalla
    request.fail(function( jqXHR, textStatus ) {
        $("#loading-img").hide();
        $("#loading-msg").append('<span> Error: ' + jqXHR.status + ", " + textStatus + '</span>');
        $("#loading-msg").show();
    });
}
            

// PAC3 Exercici 1.1: Popover de finestra d'usuari emprant jQuery
$(document).ready(function ( ) {
    
    // PAC 3 Exercici 1.1: Popover d'usuari
    // Activar popover mitjançant la tecla enter (exercici addicional)
    // Anula outline de tabindex via clic...
    $('[tabindex]').on('focus', '.user', function( ) {
        $(".user").css('outline', 'none');
    });
    // pero es mostra si emprem el teclat per facilitar l'accessibilitat
    $('[tabindex]').on('keyup', function ( e ) {
        if(e.keyCode == 9){
            $(".user").css('outline', '');
        }
    });

    // Si l'usuari prem la tecla enter amb el focus als elements .usuari, activa/desactiva popover 
    $(document).on('keypress', function (e) {
        if(e.which == 13){
            $('.user').popover( 'toggle' ).fadeIn( 'slow' );
        }
    });

    // PAC 3 Exercici 1.1: Activar popover via clic sobre els elements .usuari (nom i icona d'usuari)
    $(document).on('click', function (e) {
        // Mostra popover. Si en tinguèssim més d'un, seria més òptim emprar la classe o l'id de cadascun d'ells. Com que en tenim només 1 he aprofitat per procedir d'aquesta manera i aprofitar algunes
        // característiques interessants dels atributs HTML (veure div de classe .usuari per a més informació)
        $('[data-toggle=popover]').popover();

        // Si es fa clic al document fora del rang d'.usuari, amaga el popover
        $('[data-toggle=popover]').each(function () {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.user').has(e.target).length === 0) {
                $(this).popover('hide');
            }
        });
    });

    loadHome();
});


function getTracks(query){
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
            console.log(tracks[i].title)
            document.getElementById("container-llistes").style.display="none";

        }
        request.done(function() {
            setTimeout(showContent(), 1000); // la funció setTimeout ens permet guanyar una mica de temps a l'hora de fer les transicions per mostrar el contingut descarregat. No és estrictament necessària per al correcte desenvolupament de la tasca en aquest cas però pot ser molt útil en altres situacions similars.
        });
    
        request.fail(function( jqXHR, textStatus ) {
            $("#loading-img").hide();
            $("#loading-msg").append('<span> Error: ' + jqXHR.status + ", " + textStatus + '</span>');
            $("#loading-msg").show();
        });
        function showContent(){
            $("#loading-icon").hide().fadeOut( 'slow' );  // Icona de càrrega desapareix lentament
            $('#load-content').show().slideDown( 1000 );  // Apareix el contingut del document de dalt a baix amb efecte desplegable en aprox. 1 segon
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
        setTimeout(showContent(), 1000); // la funció setTimeout ens permet guanyar una mica de temps a l'hora de fer les transicions per mostrar el contingut descarregat. No és estrictament necessària per al correcte desenvolupament de la tasca en aquest cas però pot ser molt útil en altres situacions similars.
    });

    request.fail(function( jqXHR, textStatus ) {
        $("#loading-img").hide();
        $("#loading-msg").append('<span> Error: ' + jqXHR.status + ", " + textStatus + '</span>');
        $("#loading-msg").show();
    });
    function showContent(){
        $("#loading-icon").hide().fadeOut( 'slow' );  // Icona de càrrega desapareix lentament
        $('#load-content').show().slideDown( 1000 );  // Apareix el contingut del document de dalt a baix amb efecte desplegable en aprox. 1 segon
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
                setTimeout(showContent(), 1000); // la funció setTimeout ens permet guanyar una mica de temps a l'hora de fer les transicions per mostrar el contingut descarregat. No és estrictament necessària per al correcte desenvolupament de la tasca en aquest cas però pot ser molt útil en altres situacions similars.
            });
        
            request.fail(function( jqXHR, textStatus ) {
                $("#loading-img").hide();
                $("#loading-msg").append('<span> Error: ' + jqXHR.status + ", " + textStatus + '</span>');
                $("#loading-msg").show();
            });
            function showContent(){
                $("#loading-icon").hide().fadeOut( 'slow' );  // Icona de càrrega desapareix lentament
                $('#load-content').show().slideDown( 1000 );  // Apareix el contingut del document de dalt a baix amb efecte desplegable en aprox. 1 segon
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


// Afegim un event listener que espera a que es carregui el contingut del document i, en cas d'existir l'element indicat, procedeix a inserir els nous paràmetres rebuts via url i gestionats per la funció getParameters ()
document.addEventListener('DOMContentLoaded', function(){
    // Cerquem per id l'span contingut a la capçalera h1 ".main-title" del document i inserim els paràmetres de la cerca per a mostrar-los en pantallal. El condicional és perquè això només volem que passi en la pàgina de cerca 'search' però en la resta no
    if(document.getElementById('main-search') !== null){
        document.getElementById('main-search').innerHTML = getParameters("search-field");

        // search-field és el nom del input el qual passa els mots de cerca a la url
    }
});



