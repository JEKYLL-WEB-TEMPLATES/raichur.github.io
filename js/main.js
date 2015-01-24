// Get Data functions
function getDribbbleData(){
  $.jribbble.getShotsByPlayerId('geek', function (playerShots) {
    var html = [], date, title, image;
    $.each(playerShots.shots, function (i, shot) {
      date = new Date(shot.created_at).toISOString();
      title = shot.title;
      image = shot.image_teaser_url;

      html.push('<li class="col col-1-3"><h2 class="name">' + title + '</h2>');
      html.push('<img src="' + image + '" alt="' + title + '"/>');
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
    template: '<li class="col col-1-3"><a href="{{link}}"><img src="{{image}}" /></a><p class="name">{{caption}}</p><time class="instafeed time" datetime="{{model.created_at}}">{{model.created_time}}</time></li>',
    after: function() {
      $('.instafeed.time').each(function(){
        this.setAttribute('datetime', (new Date(this.innerHTML*1000)).toISOString());
      });

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
      var html = [], date, title, url, language = false, description = false, homepage = false;
      $.each(repositories, function(index) {

        date = repositories[index].updated_at;
        title = repositories[index].name;
        url = repositories[index].html_url;
        language = repositories[index].language;
        description = repositories[index].description;
        homepage = repositories[index].homepage;

        html.push('<li class="col col-1-3"><a href="' + url + '"><h2 class="name">' + title + '</h2></a>');
        if(description) { html.push('<p>' + description + '</p>'); }
        if(homepage) { html.push('<a href="' + homepage + '">Live</a>'); }
        if(language) { html.push('<p style="color: ' + repo_colors[language] + '">' + language + '</p>'); }
        html.push('<time datetime="' + date + '">' + date + '</time></li>');
      });
      $('#codelist').html(html.join(''));
    }
  });
}

// Getting the data from services when the page loads
function start(){
  if($('section').hasClass('code')) { getGithubData(); }
  if($('section').hasClass('pixels')) { getDribbbleData(); }
  if($('section').hasClass('light')) { getInstagramData(); }
  $('abbr').timeago();
  $('time').timeago();
  $(".social").switcher();
  $(document).ajaxComplete(function() {
    $('time').timeago();
  });
}

$(function(){
  start();
  $('.navigation').velocity('transition.slideDownIn', {stagger: 200});
  $('.header .large, .header .head-para h2, .header .head-para h3').velocity('transition.slideDownIn', {duration: 380, stagger: 100});
});

jQuery(document).ready(function($) {
  var siteUrl = 'http://'+(document.location.hostname||document.location.host);
  $(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
    e.preventDefault();
    History.pushState({}, "", this.pathname);
  });
  History.Adapter.bind(window, 'statechange', function(){
    var State = History.getState();
    $.get(State.url, function(data){
      document.title = $(data).find("title").text();
      $('.content').html($(data).find('.content'));
      //_gaq.push(['_trackPageview', State.url]);
      start();
    });
  });
});
