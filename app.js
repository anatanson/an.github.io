var $searchInput = $('.search');
var $resultWrapper = $('.result');
var $button = $('.submit');

$(document).ready(function(){
  SC.initialize({
    client_id: 'b67ae3e0a89f0afc33278a1f858d8525'
  });

  var search = {
    giphyData() {
      return `https://api.giphy.com/v1/gifs/search?q=${this.text}&limit=1&offset=${this.offset}&api_key=dc6zaTOxFJmzC`;
    },
    fetch(gif) {
      $.getJSON(this.giphyData())
      .success(data => {
        var results = data.data;
        var url = results[0].images.downsized.url;
        console.log(results[0]);
        gif(url);
      });
    }
  }

  function makeGif(src = '//giphy.com/embed/') {
    return `<img src="${src}" />`;
  }

  $button.on('click', e => {
    search.text = $searchInput.val();
    $.get(
      'https://api.soundcloud.com/tracks?&tags=' + $searchInput.val() + '&client_id=b67ae3e0a89f0afc33278a1f858d8525',
      function (result) {
        var track = result[0];
        console.log(track);
        if (track === undefined) {
          alert('Whoops, please try another search term!');
        }
        SC.stream("tracks/" + track.id).then(function(player){
          player.play()
        });
      }
    );
    search.fetch(url => {
      $resultWrapper.html(makeGif(url));
    });
  });

  //replicate click function if user presses 'enter'
  $('#search').keypress(function(e){
    if(e.which == 13){
      $('#submit').click();
    }
  });

});
