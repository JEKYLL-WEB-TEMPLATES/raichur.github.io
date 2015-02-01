function getInstagramData(){
  var feed = new Instafeed({
    get: 'user',
    target: 'list',
    resolution: 'low_resolution',
    userId: 1508254017,
    limit: 5,
    accessToken: '1508254017.467ede5.4d8570b3606645bfa2859e1d1c54f8f1',
    template: '<li><a href="{{link}}"><img src="{{image}}" /></a><p class="name">{{caption}}</p><time class="instafeed time" datetime="{{model.created_at}}">{{model.created_time}}</time></li>',
    after: function() {
      $('.instafeed.time').each(function(){
        this.setAttribute('datetime', (new Date(this.innerHTML*1000)).toISOString());
      });
        $('time').timeago();
    },
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
    requestJSON('/js/colors.json', function(data){
      repo_colors = data;
    });

    $.getJSON(repoURI, function(github_JSON) {
      repositories = github_JSON;
      outputPageContent();
    });

    function outputPageContent() {
      var html = [], date, title, url, language = false, description = false;
      $.each(repositories, function(index) {
        date = repositories[index].updated_at;
        title = repositories[index].name;
        url = repositories[index].html_url;
        language = repositories[index].language;
        description = repositories[index].description;

        html.push('<li><a href="' + url + '"><h2 class="name">' + title + '</h2></a>');
        if(description) { html.push('<p class="description">' + description + '</p>'); }
        if(language) { html.push('<p class="language" style="color: ' + repo_colors[language] + '">' + language + '</p>'); }
        html.push('<time class="date" datetime="' + date + '">' + date + '</time></li>');
      });
      $('#list').append(html.join(''));
    }
  });
}

// Getting the data from services when the page loads
function start(){
    if('.home'){
      getGithubData();
      getInstagramData();
      $(document).ajaxComplete(function() {
        $('time').timeago();
      });
    }
}

$(function(){
  if('.home'){
    start();
  }
});

var siteUrl = 'http://'+(document.location.hostname||document.location.host);
$(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
  e.preventDefault();
  History.pushState({}, "", this.pathname);
});
History.Adapter.bind(window, 'statechange', function(){
  var State = History.getState();
  $.get(State.url, function(data){
    document.title = $(data).find("title").text();
    $('#content').html($(data).find('#content'));
    //_gaq.push(['_trackPageview', State.url]);
    start();
  });
});
