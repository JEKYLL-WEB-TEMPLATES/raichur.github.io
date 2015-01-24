// Get Data functions
function getDribbbleData(){
  $.jribbble.getShotsByPlayerId('geek', function (playerShots) {
    var html = [], date;
    $.each(playerShots.shots, function (i, shot) {
      date = new Date(shot.created_at).toISOString();
      html.push('<li><h3 class="name">' + shot.title + '</h3>');
      html.push('<img src="' + shot.image_teaser_url + '" ');
      html.push('alt="' + shot.title + '">');
      html.push('<time datetime="' + date + '">' + date + '</time></a></li>');
    });

    $('#pixelslist').html(html.join(''));
  }, {page: 1, per_page: 20});
}

function getInstagramData(){
  $('#lightlist').append('<div id="load-more">Load More</div>');
  var loadButton = document.getElementById('load-more');
  var feed = new Instafeed({
    get: 'user',
    target: 'lightlist',
    resolution: 'low_resolution',
    userId: 1508254017,
    limit: 20,
    accessToken: '1508254017.467ede5.4d8570b3606645bfa2859e1d1c54f8f1',
    template: '<li><a href="{{link}}"><img src="{{image}}" /></a><p class="name">{{caption}}</p><p><3 {{likes}}</p></li>',
    after: function() {
      if (!this.hasNext()) {
        loadButton.setAttribute('disabled', 'disabled');
      }
    },
  });
  loadButton.addEventListener('click', function() {
    feed.next();
  });
  feed.run();
}

function getGithubData(){
  var reqURI = 'https://api.github.com/users/raichur',
  repoURI = 'https://api.github.com/users/raichur/repos';
  function requestJSON(url, callback) {
    $.ajax({
      url: url,
      complete: function(xhr) {
        callback.call(null, xhr.responseJSON);
      }
    });
  }
  requestJSON(reqURI, function(github_JSON) {
    var repositories, output = '', repo_colors = {};
    requestJSON('https://cdn.rawgit.com/raichur/github-language-colors/master/colors.json', function(data){
      repo_colors = data;
    });

    $.getJSON(repoURI, function(github_JSON) {
      repositories = github_JSON;
      outputPageContent();
    });

    function outputPageContent() {
      $.each(repositories, function(index) {
        output += '<li>';
        output += '<a href="' + repositories[index].html_url + '" target="_blank"><h3 class="name">' + repositories[index].name + '</h3></a>';
        if (repositories[index].description) { output += '<p>' + repositories[index].description + '</p>'; }
        if (repositories[index].homepage) { output += '<a href="' + repositories[index].homepage + '">Live</a>'; }
        if (repositories[index].language) { output += '<p style="color: ' + repo_colors[repositories[index].language] + '">' + repositories[index].language + '</p>'; }
        output += '<time datetime="' + repositories[index].updated_at + '">' + repositories[index].updated_at + '</time>';
        output += '</li>';
      });
      $('#codelist').html(output);
    }
  });
}

function filterList(filter){
  filter.forEach(function(filter){
    $('.' + filter + 'filter').click(function(){
      $('#' + filter + 'list').fadeIn();
      $('ul[id!=' + filter + 'list]').fadeOut();
    });
  });
}

// Getting the data from services when the page loads
$(function(){
  getGithubData();
  getInstagramData();
  getDribbbleData();
  $('abbr').timeago();
  $('time').timeago();
  $(".social").switcher();
  filterList(['code', 'light', 'words', 'pixels']);
});

$(document).ajaxComplete(function() {
  $('time').timeago();
});
