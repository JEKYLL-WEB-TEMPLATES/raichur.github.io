// I should refactor this mess

function getGithubData(){
  var reqURI = 'https://api.github.com/users/raichur',
  repoURI = 'https://api.github.com/users/raichur/repos?per_page=200';
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
    requestJSON('http://cdn.rawgit.com/raichur/github-language-colors/master/colors.json', function(data){
      repo_colors = data;
    });

    $.getJSON(repoURI, function(github_JSON) {
      repositories = github_JSON;
      outputPageContent();
    });

    function outputPageContent() {
      var html = [], date, title, url, language = '', description = false, website = false, lang_text = '';
      $('.loader').fadeOut(300);
      $.each(repositories, function(index) {

        date = repositories[index].updated_at;
        title = repositories[index].name;
        url = repositories[index].html_url;
        if(repositories[index].language) {
          language = repositories[index].language;
          lang_text = '<span data-color="' + language + '" style="color: ' + repo_colors[language] + '">' + language + '</span> ';
        } else {
          language = '';
          lang_text = '';
        }
        description = repositories[index].description;
        website = repositories[index].homepage;
        html.push('<li><p class="post-meta"><time class="date" datetime="' + date +'">' + date + '</time></p>');
        if(website) { html.push('<a class="codeweb" target="_blank" href="' + website + '"><svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" viewBox="0 0 48.749 48.748" style="enable-background:new 0 0 48.749 48.748;"xml:space="preserve"><g><path d="M44.268,10.32c-0.371-0.524-0.758-1.035-1.17-1.527C38.624,3.424,31.891,0,24.374,0c-0.014,0-0.025,0.001-0.037,0.001C24.329,0.001,24.323,0,24.315,0c-0.027,0-0.055,0.003-0.084,0.003C16.771,0.046,10.097,3.46,5.649,8.793c-0.41,0.493-0.799,1.003-1.17,1.527C1.663,14.295,0,19.142,0,24.374c0,5.231,1.662,10.08,4.479,14.054c0.371,0.524,0.76,1.035,1.17,1.527c4.447,5.333,11.121,8.747,18.582,8.79c0.029,0,0.057,0.003,0.084,0.003c0.008,0,0.014-0.001,0.021-0.001c0.012,0,0.023,0.001,0.037,0.001c7.518,0,14.25-3.423,18.725-8.792c0.41-0.492,0.799-1.004,1.17-1.528c2.816-3.975,4.479-8.822,4.479-14.055C48.747,19.143,47.084,14.295,44.268,10.32z M17.249,3.17c-2.24,2.161-4.102,5.32-5.385,9.111c-1.719-0.642-3.266-1.415-4.6-2.289C9.879,6.886,13.318,4.494,17.249,3.17z M6.09,11.521c1.516,1.012,3.268,1.897,5.205,2.626c-0.836,3.054-1.316,6.444-1.334,10.021H2.004C2.047,19.463,3.562,15.109,6.09,11.521zM2.079,26.168H10c0.129,2.994,0.584,5.835,1.293,8.434c-1.938,0.729-3.689,1.614-5.203,2.627C3.849,34.048,2.404,30.266,2.079,26.168z M7.27,38.752c1.334-0.872,2.877-1.643,4.592-2.285c1.283,3.792,3.146,6.949,5.387,9.11C13.318,44.254,9.886,41.857,7.27,38.752z M23.374,46.676c-4.104-0.562-7.646-4.771-9.654-10.833c2.895-0.868,6.172-1.394,9.654-1.479V46.676z M23.374,32.366c-3.672,0.088-7.133,0.655-10.215,1.601c-0.631-2.396-1.035-5.025-1.156-7.798h11.371V32.366z M23.374,24.168H11.961c0.018-3.359,0.455-6.532,1.207-9.384c3.078,0.943,6.537,1.511,10.205,1.598V24.168z M23.374,14.384c-3.48-0.085-6.756-0.609-9.648-1.477c2.007-6.059,5.546-10.272,9.648-10.835V14.384z M46.741,24.168h-8.072c-0.018-3.562-0.492-6.938-1.322-9.981c1.98-0.736,3.769-1.635,5.31-2.665C45.184,15.11,46.698,19.463,46.741,24.168z M41.481,9.994c-1.361,0.891-2.943,1.676-4.703,2.325c-1.295-3.843-3.184-7.04-5.459-9.209C35.323,4.421,38.825,6.84,41.481,9.994z M25.374,2.087c4.059,0.627,7.555,4.832,9.541,10.85c-2.865,0.849-6.104,1.363-9.541,1.447V2.087z M25.374,16.383c3.625-0.086,7.045-0.642,10.096-1.565c0.748,2.844,1.182,6.005,1.199,9.351H25.374V16.383z M25.374,26.168h11.254c-0.121,2.76-0.523,5.377-1.148,7.766c-3.055-0.926-6.479-1.481-10.104-1.568L25.374,26.168L25.374,26.168z M25.374,46.661V34.365c3.439,0.084,6.678,0.598,9.547,1.447C32.932,41.832,29.432,46.034,25.374,46.661z M31.319,45.639c2.275-2.168,4.168-5.363,5.463-9.207c1.756,0.648,3.336,1.432,4.695,2.321C38.821,41.906,35.323,44.327,31.319,45.639zM42.657,37.229c-1.541-1.03-3.33-1.931-5.311-2.666c0.702-2.588,1.153-5.416,1.28-8.394h8.041C46.342,30.266,44.901,34.049,42.657,37.229z"/></g></svg></a>'); }
        html.push('<a href="' + url + '"><h2 class="name">' + title + '</h2></a>');
        if(description) { html.push('<p><span class="language">' + lang_text + '</span><span class="description">' + description + ' </span></p>'); }
      });
      $('.code').append(html.join('')).delay(500).fadeTo(500, 1);
    }
  });
}

function getFlickrPhotos(){
  $.getJSON("https://api.flickr.com/services/rest/?&method=flickr.photosets.getPhotos&api_key=70fdb0af0340abd95eaf4f0c3ab89e1c&photoset_id=72157656042910469&user_id=97085003@N08&format=json&&per_page=2000&jsoncallback=?",
  null,
  function(data) {
    $.each(data.photoset.photo, function(i,item){
      $('<li><a class="lightbox" href="https://farm' + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + '_b.jpg">' + '<img src="https://farm' + item.farm + ".staticflickr.com/" + item.server + "/" + item.id + "_" + item.secret + '_q.jpg"></a></li>').appendTo("#photos");
    });
  });
  $(document).ajaxComplete(function(){
    $('.lightbox').fluidbox();
  });
}


// Getting the data from services when the page loads
function start(){
  if($('#post_list').length) {
    var postOptions = {
      valueNames: [ 'post_sub', 'post_title', 'tags', 'post_read_time']
    };

    var postList = new List('post_list', postOptions);
  }
  if($('.code').length) {
    getGithubData();
    $(document).ajaxComplete(function(){
      var options = {
        valueNames: [ 'date', 'name', 'description', 'language']
      };

      var userList = new List('code', options);
      userList.sort('date', { order: "desc" });
    });
  }
  if($('#photos').length) {
    getFlickrPhotos();
  }
}


$(function(){
  start();
  greeting();
  $('time').timeago();
  $('.lightbox').fluidbox();
  $(document).ajaxComplete(function() {
    $("img").lazyload({effect : "fadeIn"});
    $('time').timeago();
    jQuery(document).ready(function() {
      var siteUrl = 'http://'+(document.location.hostname||document.location.host);
      $(document).delegate('a[href^="/"],a[href^="'+siteUrl+'"]', "click", function(e) {
        if(!e.hasClass('codeweb')){
          e.preventDefault();
          if(e.hasClass('nav_item')){
            openCloseNav();
            History.pushState({}, "", this.pathname);
          } else {
            History.pushState({}, "", this.pathname);
          }

        }
      });

      History.Adapter.bind(window, 'statechange', function(){
        var State = History.getState();
        $.get(State.url, function(data){	// Use AJAX to get the new content
          document.title = data.match(/<title>(.*?)<\/title>/)[1];
          $('.content').html($(data).find('.content'));
          $('nav').html($(data).find('nav'));
          _gaq.push(['_trackPageview', State.url]);
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
      opacity: 0,
      size: 0.1,
      size_random: true,
      nb: 70,
      line_linked: {
        enable_auto: true,
        distance: 300,
        color: '#c6c6c6',
        opacity: 0.65,
        width: 1,
        condensed_mode: {
          enable: false,
          rotateX: 600,
          rotateY: 600
        }
      },
      anim: {
        enable: true,
        speed: 0.6
      }
    },
    interactivity: {
      enable: true,
      mouse: {
        distance: 150
      },
      detect_on: 'window', // "canvas" or "window"
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


// Morning evening header
function greeting(){
  var myDate = new Date();
  if ( myDate.getHours() < 12 ) 
  { $('#greeting').text("Good Morning"); }
  else if ( myDate.getHours() >= 12 && myDate.getHours() <= 17 )
  { $('#greeting').text("Good Afternoon"); }
  else if ( myDate.getHours() > 17 && myDate.getHours() <= 24 )
  { $('#greeting').text("Good Evening"); }
}

// Navigation

function openCloseNav(){
  $(".navToggle").toggleClass("open");
  $("nav").toggleClass("open");
  $('#bg-blur').fadeToggle();
  $('body').toggleClass('fixed');
}
$(".navToggle").click(openCloseNav);

$('#bg-blur').click(function(event) {
  openCloseNav();
});

shortcut.add("Esc",function() {
  openCloseNav();
});


// Text switcher

var me_count = 1;

setInterval(function() {
  var me = ["a developer", "a reader", "a designer", "a thinker", "a maker"];
  $('#me').text(me[me_count]);
  me_count++;
  if(me_count == me.length) {
    me_count = 0;
  }
}, 1000);
