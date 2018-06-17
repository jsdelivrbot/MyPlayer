$.get('https://raw.githubusercontent.com/GalactisIO/MyPlayer/master/status.json', function(data){
    $('#initPlayer').remove();
    var init = JSON.parse(data)
    console.warn(init[0])
    if(init[0]) {
          $('#initPlayer').remove();
    } else {
          console.error('Site not working! May be underway Technical work')
          $('#initPlayer').remove();
          $('player').remove();
    }
  }).fail(function() {
    console.error('Site not working! May be underway Technical work')
    $('#initPlayer').remove();
    $('player').remove();
});
