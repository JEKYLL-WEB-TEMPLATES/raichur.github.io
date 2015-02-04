function getDribbbleData(){
  $.jribbble.getShotsByPlayerId('geek', function (playerShots) {
    var html = [], date, title, image;
    $.each(playerShots.shots, function (i, shot) {
      date = new Date(shot.created_at).toISOString();
      title = shot.title;
      image = shot.image_url;
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
    resolution: 'standard_resolution',
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
    requestJSON('/resources/js/colors.json', function(data){
      repo_colors = data;
    });

    $.getJSON(repoURI, function(github_JSON) {
      repositories = github_JSON;
      outputPageContent();
    });

    function outputPageContent() {
      var html = [], date, title, url, language = '', description = false, lang_text = '';
      $.each(repositories, function(index) {

        date = repositories[index].updated_at;
        title = repositories[index].name;
        url = repositories[index].html_url;
         if(repositories[index].language) {
           language = repositories[index].language;
           lang_text = '<span style="color: ' + repo_colors[language] + '">' + language + '</span> ';
         } else {
           language = '';
           lang_text = '';
         }
        description = repositories[index].description;

        html.push('<li><p class="post-meta"><time datetime="' + date +'">' + date + '</time></p>');
        html.push('<a href="' + url + '"><h2 class="name">' + title + '</h2></a>');
        if(description) { html.push('<p>' + lang_text + description + '</p>'); }
      });
      $('.code').append(html.join(''));
    }
  });
}

// Getting the data from services when the page loads
function start(){
    if($('.code').length) {getGithubData();}
    // getDribbbleData();
    // getInstagramData();
}


$(function(){
  start();
  $('time').timeago();
  $(document).ajaxComplete(function() {
    $("img").lazyload({effect : "fadeIn"});
    $('time').timeago();
    jQuery(document).ready(function() {
  var siteUrl = 'http://'+(document.location.hostname||document.location.host);

  //	Catch all internally-focused links and push a new state.
  //	Note: External links will not be affected by this behavior.
  $(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
    e.preventDefault();
    History.pushState({}, "", this.pathname);
  });

  History.Adapter.bind(window, 'statechange', function(){
    var State = History.getState();
    $.get(State.url, function(data){	// Use AJAX to get the new content.
      document.title = data.match(/<title>(.*?)<\/title>/)[1];
      $('.content').html($(data).find('.content'));
      $('nav').html($(data).find('nav'));
      //_gaq.push(['_trackPageview', State.url]);	// This updates Google Analytics with a visit to the new page.
                            // If you don't use Google Analytics, you can safety comment or
                            // remove that line.
    });
  });
});


});
});

var desktop = window.matchMedia('all and (min-width: 700px)');
if(desktop.matches) {
  setInterval(particlesJS('particles', {
      particles: {
          color: '#c6c6c6',
          shape: 'circle', // "circle", "edge" or "triangle"
          opacity: 0.3,
          size: 0.1,
          size_random: true,
          nb: 70,
          line_linked: {
              enable_auto: true,
              distance: 320,
              color: '#c6c6c6',
              opacity: 0.52,
              width: 1,
              condensed_mode: {
                  enable: false,
                  rotateX: 600,
                  rotateY: 600
                }
              },
              anim: {
                  enable: true,
                  speed: 0.4
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
                              nb: 1
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

if(document.getElementById("next_link")) {
  shortcut.add("Left",function() {
    window.open(document.getElementById("next_link").getAttribute('href'),'_self',false);
  });
}
if(document.getElementById("prev_link")) {
  shortcut.add("Right",function() {
    window.open(document.getElementById("prev_link").getAttribute('href'),'_self',false);
  });
}
shortcut.add("Shift+Up", function() {
  window.open('/','_self',false);
});
