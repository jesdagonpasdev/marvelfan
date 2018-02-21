var resultsPersonajes = [];
var resultsComics = [];
var currentPage = 1;
var paginacion = 10;
var i = 1;
var k = 1;
var cardDeck;
var divLista = $('.row').first();
var esPersonaje = true;
var esComic = false;

//my key
var KEY = "ea74f59c532132c0fe2a1c5cfd6c7296";

function getComicsData() {
    var urlComic = "https://gateway.marvel.com:443/v1/public/comics?ts=9&limit=100&apikey=" + KEY + "&hash=f74983bd2097f8e5f5a65b21d5fc79df";
    return urlComic;
}

function getHeroesData() {
    var urlHeroe = "https://gateway.marvel.com:443/v1/public/characters?ts=9&limit=100&apikey=" + KEY + "&hash=f74983bd2097f8e5f5a65b21d5fc79df";
    return urlHeroe;
}

function error() {
    console.log("No se ha podido realizar la sentencia.");
}

$(document).ready(function () {
    cardDeck = $(".row").first();

    $.ajax({
        url: getHeroesData(),
        type: 'GET',
        dataType: 'json',
        success: function (myJson) {
            resultsPersonajes = myJson.data.results;
            cargaPersonajes();
        },
        error: error()
    });

    $.ajax({
        url: getComicsData(),
        type: 'GET',
        dataType: 'json',
        success: function (myJson) {
            resultsComics = myJson.data.results;
        },
        error: error()
    });

    $('.modal').modal();

    
});

$('.votar').click(function () {
    $('.loading').show();
    var nombreItemVotado = $(this).parent().parent().children().first().children().first().text();
    var votos, idVotos;
    if(esPersonaje){
        idVotos = "votosPersonajes";
    }else{
        if(esComic){
            idVotos = "votosComics";
        }
    }    
    votos = JSON.parse(localStorage.getItem(idVotos));

    if (votos != null) {
        votos.forEach(element => {
            if (element.nombre == nombreItemVotado) {
                var valorNuevo = (element.votosTotal) + 1;
                findAndReplace(votos, element.nombre, valorNuevo);
            } else {
                let nuevoVoto = { "nombre": nombreItemVotado, "votosTotal": 1 };
                votos.push(nuevoVoto);
            }
        });
    } else {
        let nuevoVoto = { "nombre": nombreItemVotado, "votosTotal": 1 };
        votos = [];
        votos.push(nuevoVoto);
    }
    localStorage.setItem(idVotos, JSON.stringify(votos));
    $('.loading').hide();
    Materialize.toast('Voto registrado. Gracias', 3000);
});

$('.votarypar').click(function () {
    $('.loading').show();
    var nombreItemParticipado = $(this).parent().parent().children().first().children().first().text();
    var votos, idVotos;
    if(esPersonaje){
        idVotos = "votosPersonajes";
    }else{
        if(esComic){
            idVotos = "votosComics";
        }
    }    
    votos = JSON.parse(localStorage.getItem(idVotos));

    if (votos != null) {
        votos.forEach(element => {
            if (element.nombre == nombreItemParticipado) {
                var valorNuevo = (element.votosTotal) + 1;
                findAndReplace(votos, element.nombre, valorNuevo);
            } else {
                let nuevoVoto = { "nombre": nombreItemParticipado, "votosTotal": 1 };
                votos.push(nuevoVoto);
            }
        });
    } else {
        let nuevoVoto = { "nombre": nombreItemParticipado, "votosTotal": 1 };
        votos = [];
        votos.push(nuevoVoto);
    }
    localStorage.setItem(idVotos, JSON.stringify(votos));

    //Parti
    var nameVotante = $('#icon_prefix').val();
    var phoneVotante = $('#icon_telephone').val();
    var emailVotante = $('#email').val();
    var participaciones = JSON.parse(localStorage.getItem("participaciones"));

    if (participaciones != null) {
        participaciones.forEach(element2 => {
            if (element2.nombre == nameVotante || element2.phone == phoneVotante || element2.email == emailVotante) {
                $('.loading').hide();
                Materialize.toast("Usted ya ha votado y participado. Lo sentimos.", 3000);
            } else {
                let nuevaParticipacion = { "nombre": nameVotante, "phone": phoneVotante, "email": emailVotante };
                participaciones.push(nuevaParticipacion);
                $('.loading').hide();
                Materialize.toast('Participacion y voto completados.', 3000);
            }
        });
    } else {
        let nuevaParticipacion = { "nombre": nameVotante, "phone": phoneVotante, "email": emailVotante };
        participaciones = [];
        participaciones.push(nuevaParticipacion);
        $('.loading').hide();
        Materialize.toast('Participacion y voto completados.', 3000);
    }
    localStorage.setItem("participaciones", JSON.stringify(participaciones));
});

function findAndReplace(object, value, replacevalue) {
    for (var x in object) {
        if (object.hasOwnProperty(x)) {
            if (typeof object[x] == typeof {}) {
                findAndReplace(object[x], value, replacevalue);
            }
            if (object[x] == value) {
                object["votosTotal"] = replacevalue;
                break; // uncomment to stop after first replacement
            }
        }
    }
}

function cargaPersonajes() {
    $('.loading').show();
    divLista.empty();
    var divGrande = '<div id="page' + i + '" class="col s6 m2 serepite">';
    var divGeneral = '<div class="card">';
    resultsPersonajes.forEach(element => {
        var imgPath = element.thumbnail.path;
        if (imgPath.indexOf("image_not_available") == -1) {
            cardDeck.append(divGrande);
            cardDeck.children().last().addClass('espacioAlrededor');
            cardDeck.children().last().append(divGeneral);
            var rutaImagen = imgPath + "." + element.thumbnail.extension;
            var divImage = '<div class="card-image">';
            var imagen = '<img src="' + rutaImagen + '" alt="' + element.name + '">';
            var abrir = '<a class="btn-floating halfway-fab waves-effect waves-light red">';
            var boton = '<i class="material-icons muestran">add</i>';
            var divDos = '<div class="card-content">';
            var titulo = '<h5 value="' + element.name + '" class="tituloPersonajes">' + element.name + '</h5>';
            var ultimoElemento = cardDeck.children().last().children().last();
            ultimoElemento.append(divImage);
            ultimoElemento.find('div').first().append(imagen);
            ultimoElemento.find('div').first().append(abrir);
            ultimoElemento.find('div').first().find('a').append(boton);
            ultimoElemento.append(divDos);
            ultimoElemento.find('div').last().append(titulo);
        }
        i++;
    });
    paginate({
        itemSelector: '.serepite',
        paginationSelector: '#pagination-1',
        itemsPerPage: 6
    });
    $('.muestran').click(function (e) {
        var nombreEspecifico = $(this).parent().parent().next().children().first().attr("value");
        var imagenEspecifica = $(this).parent().parent().find('img').attr("src");
        $('#nombre').text(nombreEspecifico);
        $('#imagenModal').attr("src", imagenEspecifica);
        $('.modal').modal('open');
    });
    $('.loading').hide();
}

function cargaComics() {
    $('.loading').show();
    divLista.empty();
    var divGrande = '<div id="page' + k + '" class="col s6 m2 serepite">';
    var divGeneral = '<div class="card">';
    
    resultsComics.forEach(element => {
        var imgPath = element.thumbnail.path;
        if (imgPath.indexOf("image_not_available") == -1) {
            cardDeck.append(divGrande);
            cardDeck.children().last().addClass('espacioAlrededor');
            cardDeck.children().last().append(divGeneral);
            var rutaImagen = imgPath + "." + element.thumbnail.extension;
            var divImage = '<div class="card-image">';
            var imagen = '<img src="' + rutaImagen + '" alt="' + element.title + '">';
            var abrir = '<a class="btn-floating halfway-fab waves-effect waves-light red">';
            var boton = '<i class="material-icons muestran">add</i>';
            var divDos = '<div class="card-content scrollable">';
            var titulo = '<h5 value="' + element.title + '" class="tituloComics">' + element.title + '</h5>';
            let descripcin = element.description == null ? "Descripcion no disponible." : element.description;
            var descrip = '<div class="more descripcionComics">' + descripcin + '</p>';
            var ultimoElemento = cardDeck.children().last().children().last();
            ultimoElemento.append(divImage);
            ultimoElemento.find('div').first().append(imagen);
            ultimoElemento.find('div').first().append(abrir);
            ultimoElemento.find('div').first().find('a').append(boton);
            ultimoElemento.append(divDos);
            ultimoElemento.find('div').last().append(titulo);
            ultimoElemento.find('div').last().append(descrip);
        }
        k++;
    });
    paginate({
        itemSelector: '.serepite',
        paginationSelector: '#pagination-1',
        itemsPerPage: 6
    });
    $('.muestran').click(function (e) {
        var nombreEspecifico = $(this).parent().parent().next().children().first().attr("value");
        var imagenEspecifica = $(this).parent().parent().find('img').attr("src");
        $('#nombre').text(nombreEspecifico);
        $('#imagenModal').attr("src", imagenEspecifica);
        $('.modal').modal('open');
    });
     // Configure/customize these variables.
     var showChar = 26;  // How many characters are shown by default
     var ellipsestext = "...";
     var moretext = "Show more >";
     var lesstext = "Show less";
     
 
     $('.more').each(function() {
         var content = $(this).text();
  
         if(content.length > showChar) {
  
             var c = content.substr(0, showChar);
             var h = content.substr(showChar, content.length - showChar);
  
             var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
  
             $(this).html(html);
         }
  
     });
  
     $(".morelink").click(function(){
         if($(this).hasClass("less")) {
             $(this).removeClass("less");
             $(this).html(moretext);
         } else {
             $(this).addClass("less");
             $(this).html(lesstext);
         }
         $(this).parent().prev().toggle();
         $(this).prev().toggle();
         return false;
     });
    $('.loading').hide();

}

function paginate(options) {
    var items = $(options.itemSelector);
    var numItems = items.length;
    var perPage = options.itemsPerPage;
    items.slice(perPage).hide();
    $(options.paginationSelector).pagination({
        items: numItems,
        itemsOnPage: perPage,
        cssStyle: "dark-theme",
        onPageClick: function (pageNumber) {
            var showFrom = perPage * (pageNumber - 1);
            var showTo = showFrom + perPage;
            items.hide()
                .slice(showFrom, showTo).show();
            return false;
        }
    });
}

$('.personajesButton').click(function () {
    cargaPersonajes();
    esPersonaje = true;
    esComic = false;
})

$('.comicsButton').click(function () {
    cargaComics();
    esPersonaje = false;
    esComic = true;
})
