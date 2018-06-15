/*
 Copyright © 2018 GalactisIO. Contacts: <iogalactis@gmail.com, planetorbitum@gmail.com>
*/

var settings = {
    "repeat": false,
    "menu": false,
    "stream": false,
    "volume": 0.1,
    "play": false
}

var Stations = []

function Setup() {
    if ($("player audio").prop('error') == null) {
        if ($("player audio").prop('duration') == Infinity) {
            $('player bar').attr('type', 'infinity')
            settings.stream = true;
        } else {
            $('player bar').attr('type', 'normal')
            settings.stream = false;
        }
    } else {
        $('player bar').attr('type', 'error')
        $('player play').html("ERROR")
        $("player switch").attr('class', 'fa fa-play');
    }
    Playing()
}

function Switch() {
    if ($("player audio").prop('paused')) {
        $("player audio").trigger('play');
        $("player switch").attr('class', 'fa fa-pause');
    }
    else {
        $("player audio").trigger('pause');
        $("player switch").attr('class', 'fa fa-play');
    }
}

function Menu() {
    settings.menu = !settings.menu
    if (settings.menu) {
        StationsList()
        $("player content").attr('display', 'show');
        $("player menu").attr('class', 'fa fa-times');
    }
    else {
        $("player content").attr('display', 'hide');
        $("player menu").attr('class', 'fa fa-bars');
    }
}

function Link() {
    if (!settings.menu) Menu();
    $("player content input").val($("player audio").attr('src'));
}

function Repeat() {
    settings.repeat = !settings.repeat
    if (settings.repeat) {
        $("player repeat").attr('class', 'fa fa-repeat fa-spin');
        $("player audio").prop('loop', true)
    }
    else {
        $("player repeat").attr('class', 'fa fa-repeat');
        $("player audio").prop('loop', false)
    }
}

function ChangeURL(url) {
    Pause();
    console.log("URL")
    if (/(\.json)/gm.exec(url)) {
        $.get(url, function (data) {
            console.log(data)
            try {
                Stations = JSON.parse(data);
                StationsList();
                console.warn("List stations load")
            } catch (error) {
                console.error("URL does not .JSON station script" + error)
            }
        }).fail(function () {
            console.log('Server request error')
        })
    }
    $("player audio").attr('src', url)
    Play();
}

function Pause() {
    if (!$("player audio").prop('paused')) {
        $("player audio").trigger('pause');
    }
    $("player switch").attr('class', 'fa fa-play');
}

function Play() {
    if ($("player audio").prop('paused')) {
        $("player audio").trigger('play');
    }
    $("player switch").attr('class', 'fa fa-pause');
}

function SetVolume(vol) {
    $("player audio").prop('volume', (vol / 100))
}

function Playing() {
    if (!settings.stream) {
        var procent = $("player audio").prop('currentTime') / $("player audio").prop('duration') * 100;
        if (!$("player audio").prop('paused')) {
            $('player bar').attr('style', `width: ${procent}%`)
            if (!settings.stream && $("player audio").prop('duration') > 0) $('player play').html(`${SecondsToTime($("player audio").prop('currentTime'), $("player audio").prop('duration'))}`)
        }
        if ($('player repeat').attr('display') != "show")
            $('player repeat').attr('display', "show")
        if ($('player time').attr('display') != "show")
            $('player time').attr('display', "show")
        if ($('player audio').prop('ended')) Pause();
    } else {
        if ($('player bar').attr('style') != "style")
            $('player bar').attr('style', '')
        if ($('player play').html() != `RADIO`)
            $('player play').html(`RADIO`)
        if ($('player repeat').attr('display') != "hide")
            $('player repeat').attr('display', "hide")
        if ($('player time').attr('display') != "hide")
            $('player time').attr('display', "hide")
    }
}

function SecondsToTime(one, two) {
    one = Number(one);
    two = Number(two);
    if (two != undefined && two != null && two != NaN) {
        one = two - one
    }
    var h = Math.floor(one / 3600);
    var m = Math.floor(one % 3600 / 60);
    var s = Math.floor(one % 3600 % 60);
    var hours = h > 0 ? `${h}` : "";
    var minutes = m > 0 ? (h > 0 ? `:${m}` : `${m}`) : "";
    var seconds = s > 0 ? (m > 0 ? (s > 10 ? `:${s}` : `:0${s}`) : `${s}`) : m > 0 ? `:00` : ``;
    return hours + minutes + seconds;
}

setInterval(function () {
    Setup();
}, 1000)

function StationsList() {
    $("player content list").html('')
    Stations.length > 0 ? $("player content list").attr('display', 'show') : $("player content list").attr('display', 'hide')
    for (var i = 0; i < Stations.length; i++) {
        $("player content list").append(`<media onclick="ChangeURL('${Stations[i]}');">${Stations[i]}</media>`);
    }
}

$.get("https://raw.githubusercontent.com/GalactisIO/MyPlayer/master/station.json", function (data) {
    Stations = JSON.parse(data);
    SetVolume(10);
});
