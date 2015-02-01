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

// Getting the data from services when the page loads
function start(){
    getGithubData();
    getDribbbleData();
    getInstagramData();
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

var desktop = window.matchMedia('all and (min-width: 700px)');
if(desktop.matches) {
  setInterval(particlesJS('particles', {
      particles: {
          color: '#fff',
          shape: 'circle', // "circle", "edge" or "triangle"
          opacity: 0.3,
          size: 0.1,
          size_random: true,
          nb: 100,
          line_linked: {
              enable_auto: true,
              distance: 290,
              color: '#fff',
              opacity: 0.4,
              width: 1,
              condensed_mode: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 600
                }
              },
              anim: {
                  enable: true,
                  speed: 0.5
                }
              },
              interactivity: {
                  enable: false,
                  mouse: {
                      distance: 150
                    },
                    detect_on: 'canvas', // "canvas" or "window"
                    mode: 'grab',
                    line_linked: {
                        opacity: 0.5
                      },
                      events: {
                          onclick: {
                              enable: true,
                              mode: 'push', // "push" or "remove" (particles)
                              nb: 4
                            }
                          }
                        },
                        /* Retina Display Support */
                        retina_detect: true
                      }), 1000);
}

// Set the name of the hidden property and the change event for visibility
var hidden, visibilityChange;
if (typeof document.hidden !== "undefined") { // Opera 12.10 and Firefox 18 and later support
  hidden = "hidden";
  visibilityChange = "visibilitychange";
} else if (typeof document.mozHidden !== "undefined") {
  hidden = "mozHidden";
  visibilityChange = "mozvisibilitychange";
} else if (typeof document.msHidden !== "undefined") {
  hidden = "msHidden";
  visibilityChange = "msvisibilitychange";
} else if (typeof document.webkitHidden !== "undefined") {
  hidden = "webkitHidden";
  visibilityChange = "webkitvisibilitychange";
}

var title = document.title;

// If the page is hidden, pause the video;
// if the page is shown, play the video
function handleVisibilityChange() {
  if (document[hidden]) {
    document.title = 'To read: ' + title;
  } else {
    document.title = title;
  }
}
