function getDribbbleData(){
  $.jribbble.getShotsByPlayerId('geek', function (playerShots) {
    var html = [], date, title, image;
    $.each(playerShots.shots, function (i, shot) {
      date = new Date(shot.created_at).toISOString();
      title = shot.title;
      image = shot.image_teaser_url;
      html.push('<li><time datetime="' + date + '">' + date + '</time></a>');
      html.push('<h2 class="name">' + title + '</h2>');
      html.push('<img src="' + image + '" alt="' + title + '"/></li>');
    });

    $('#list').append(html.join(''));
  }, {page: 1, per_page: 10});
}

function getInstagramData(){
  var feed = new Instafeed({
    get: 'user',
    target: 'list',
    resolution: 'low_resolution',
    userId: 1508254017,
    limit: 10,
    accessToken: '1508254017.467ede5.4d8570b3606645bfa2859e1d1c54f8f1',
    template: '<li><time class="instafeed time" datetime="{{model.created_at}}">{{model.created_time}}</time><a href="{{link}}"><img src="{{image}}" /></a><p class="name">{{caption}}</p></li>',
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

        html.push('<li><time datetime="' + date + '">' + date + '</time>');
        html.push('<a href="' + url + '"><h2 class="name">' + title + '</h2></a>');
        if(description) { html.push('<p>' + description + '</p>'); }
        if(language) { html.push('<p class="language" style="color: ' + repo_colors[language] + '">' + language + '</p></li>'); }
      });
      $('#list').append(html.join(''));
    }
  });
}

function aboutToggle(){
  $('.about').click(function(e){
    e.preventDefault();
    $('.about-text').fadeToggle();
  });
}

// Getting the data from services when the page loads
function start(){
    getGithubData();
    getDribbbleData();
    getInstagramData();
    aboutToggle();
}

$(function(){
  start();
  $(document).ajaxComplete(function() {
    $("img").lazyload({effect : "fadeIn"});
    $('time').timeago();
    var size_li = $("#list li").size(), list_num = 5;
    $('#list li').hide();
    $('#list li:lt('+list_num+')').show();
    $('#load-more').click(function (e) {
      e.preventDefault();
         list_num = (list_num + list_num <= size_li) ? list_num + list_num : size_li;
        $('#list li:lt('+list_num+')').show();
    });
});
});
