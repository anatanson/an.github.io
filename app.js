

//for trying soundcloud :) -->
window.onload = function() {
SC.initialize({
  client_id: 'b67ae3e0a89f0afc33278a1f858d8525'
});
};
// SC.stream("/tracks/293", function(sound){
//     $("audio-test").attr("src", sound.uri);
// });

// var getTracks = function () {
//   return SC.get('/me/tracks', { limit: 1 });
// };
//
// SC.get('/tracks', {
//   q: 'buskers', license: 'cc-by-sa'
// }).then(function(tracks) {
//   console.log(tracks);
// });
//
// //stream track id 293
// //find all sounds of buskers licensed under 'creative commons share alike'
// SC.get('/tracks', {
//   q: 'buskers',
// }).then(function(tracks) {
//   console.log(tracks);

  // SC.stream(tracks(0)).then(function(player){
  //   player.play().then(function(){
  //     console.log('Playback started!');
  //   }).catch(function(e){
  //     console.error('Playback rejected. Try calling play() from a user interaction.', e);
  //   });
  // });
// });




var $searchInput = $('.search');
var $resultWrapper = $('.result');
var $button = $('.submit');

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
      })
  }
}






function makeGif(src = '//giphy.com/embed/') {
  return `<img src="${src}" />`;
}

$button.on('click', e => {
  search.text = $searchInput.val();
  search.fetch(url => {
      $resultWrapper.html(makeGif(url));
});



$.get(
  'https://api.soundcloud.com/tracks?&tags=' + $searchInput.val() + '&client_id=b67ae3e0a89f0afc33278a1f858d8525',
  function (result) {
  //  console.log(result[0]);
    var track = result[0];
    console.log(track);
    SC.stream("tracks/" + track.id).then(function(player){
      player.play()
    });
  }
);




}); //closes button click
