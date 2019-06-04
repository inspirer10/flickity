'use script';

(function () {

    var object = document.getElementById('pictures').innerHTML;
    var carousel = document.querySelector('.main-carousel');
    var copyHere = '';

    var data = [{
            image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=70',
            id: 'carousel-cell1',
            coords: {
                lat: 51.505,
                lng: -0.077
            },
            title: 'Picture 1',
            description: '<p class="container description">London</p>',
        },
        {
            image: 'https://images.unsplash.com/photo-1544366981-2150548c9c1c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=70',
            id: 'carousel-cell2',
            coords: {
                lat: 41.379,
                lng: 2.117
            },
            title: 'Picture 2',
            description: '<p class="container description">Barcelona</p>',
        },
        {
            image: 'https://images.unsplash.com/photo-1533676802871-eca1ae998cd5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1491&q=80',
            id: 'carousel-cell3',
            coords: {
                lat: 45.431,
                lng: 12.335
            },
            title: 'Picture 3',
            description: '<p class="container description">Venice</p>',
        },
        {
            image: 'https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=50',
            id: 'carousel-cell4',
            coords: {
                lat: 51.103,
                lng: 17.075
            },
            title: 'Picture 4',
            description: '<p class="container description">Wroclaw</p>',
        },
        {
            image: 'https://images.unsplash.com/photo-1470219556762-1771e7f9427d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1489&q=70',
            id: 'carousel-cell5',
            coords: {
                lat: 40.756,
                lng: -73.979
            },
            title: 'Picture 5',
            description: '<p class="container description">New York</p>',
        }
    ];


    // SECTION MAPKA GOOGLE
    window.initMap = function () {

        // mapa, scentrowana na coords5
        var map = new google.maps.Map(
            document.getElementById('map'), {
                zoom: 3,
                center: data[4].coords
            })

        var markers = [];

        for (let i = 0; i < data.length; i++) {

            markers[i] = new google.maps.Marker({
                position: data[i].coords,
                map: map
            });

            markers[i].addListener('click', function () {
                flkty.select(i);
            })


            flkty.on('change', function (i) {

                //  wykorzystujemy metodę panTo w obiekcie map do przesunięcia współrzędnych mapy
                map.panTo(data[i].coords);

                //  następnie zmieniamy powiększenie mapy
                map.setZoom(6);
            });
        };
    };


    // SECTION  CAROUSEL

    Mustache.parse(object);

    for (let i = 0; i < data.length; i++) {
        //console.log(data);  opcjonalnie - pomocne
        copyHere += Mustache.render(object, data[i]);
    }

    carousel.insertAdjacentHTML('beforeend', copyHere);

})();


var flkty = new Flickity('.main-carousel', {
    cellAlign: "center",
    contain: true,
    pageDots: false,
    hash: true,
    wrapAround: true
});

var progressBar = document.querySelector('.progress-bar')


flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});

var buttonGroup = document.querySelector('.button-group');
var buttons = buttonGroup.querySelectorAll('.button');
buttons = fizzyUIUtils.makeArray(buttons);

buttonGroup.addEventListener('click', function (event) {
    // filter for button clicks
    if (!matchesSelector(event.target, '.button')) {
        return;
    }
    var index = buttons.indexOf(event.target);
    flkty.select(index);
});