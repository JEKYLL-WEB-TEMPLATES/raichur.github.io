// I should refactor this mess

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

        html.push('<li><p class="post-meta"><time class="date" datetime="' + date +'">' + date + '</time></p>');
        html.push('<a href="' + url + '"><h2 class="name">' + title + '</h2></a>');
        if(description) { html.push('<p><span class="language">' + lang_text + '</span><span class="description">' + description + '</span></p>'); }
      });
      $('.code').append(html.join(''));
    }
  });
}

// Getting the data from services when the page loads
function start(){
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

// Animated title
//set animation timing
  var animationDelay = 2000,
    //loading bar effect
    barAnimationDelay = 3800,
    barWaiting = barAnimationDelay - 3000, //3000 is the duration of the transition on the loading bar - set in the scss/css file
    //letters effect
    lettersDelay = 50,
    //type effect
    typeLettersDelay = 100,
    selectionDuration = 300,
    typeAnimationDelay = selectionDuration + 800,
    //clip effect
    revealDuration = 600,
    revealAnimationDelay = 1000;

  initHeadline();


  function initHeadline() {
    //insert <i> element for each letter of a changing word
    singleLetters($('.cd-headline.letters').find('b'));
    //initialise headline animation
    animateHeadline($('.cd-headline'));
  }

  function singleLetters($words) {
    $words.each(function(){
      var word = $(this),
        letters = word.text().split(''),
        selected = word.hasClass('is-visible');
      for (i in letters) {
        if(word.parents('.rotate-2').length > 0) letters[i] = '<em>' + letters[i] + '</em>';
        letters[i] = (selected) ? '<i class="in">' + letters[i] + '</i>': '<i>' + letters[i] + '</i>';
      }
        var newLetters = letters.join('');
        word.html(newLetters).css('opacity', 1);
    });
  }

  function animateHeadline($headlines) {
    var duration = animationDelay;
    $headlines.each(function(){
      var headline = $(this);

      if(headline.hasClass('loading-bar')) {
        duration = barAnimationDelay;
        setTimeout(function(){ headline.find('.cd-words-wrapper').addClass('is-loading') }, barWaiting);
      } else if (headline.hasClass('clip')){
        var spanWrapper = headline.find('.cd-words-wrapper'),
          newWidth = spanWrapper.width() + 10
        spanWrapper.css('width', newWidth);
      } else if (!headline.hasClass('type') ) {
        //assign to .cd-words-wrapper the width of its longest word
        var words = headline.find('.cd-words-wrapper b'),
          width = 0;
        words.each(function(){
          var wordWidth = $(this).width();
            if (wordWidth > width) width = wordWidth;
        });
        headline.find('.cd-words-wrapper').css('width', width);
      };

      //trigger animation
      setTimeout(function(){ hideWord( headline.find('.is-visible').eq(0) ) }, duration);
    });
  }

  function hideWord($word) {
    var nextWord = takeNext($word);

    if($word.parents('.cd-headline').hasClass('type')) {
      var parentSpan = $word.parent('.cd-words-wrapper');
      parentSpan.addClass('selected').removeClass('waiting');
      setTimeout(function(){
        parentSpan.removeClass('selected');
        $word.removeClass('is-visible').addClass('is-hidden').children('i').removeClass('in').addClass('out');
      }, selectionDuration);
      setTimeout(function(){ showWord(nextWord, typeLettersDelay) }, typeAnimationDelay);

    } else if($word.parents('.cd-headline').hasClass('letters')) {
      var bool = ($word.children('i').length >= nextWord.children('i').length) ? true : false;
      hideLetter($word.find('i').eq(0), $word, bool, lettersDelay);
      showLetter(nextWord.find('i').eq(0), nextWord, bool, lettersDelay);

    }  else if($word.parents('.cd-headline').hasClass('clip')) {
      $word.parents('.cd-words-wrapper').animate({ width : '2px' }, revealDuration, function(){
        switchWord($word, nextWord);
        showWord(nextWord);
      });

    } else if ($word.parents('.cd-headline').hasClass('loading-bar')){
      $word.parents('.cd-words-wrapper').removeClass('is-loading');
      switchWord($word, nextWord);
      setTimeout(function(){ hideWord(nextWord) }, barAnimationDelay);
      setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('is-loading') }, barWaiting);

    } else {
      switchWord($word, nextWord);
      setTimeout(function(){ hideWord(nextWord) }, animationDelay);
    }
  }

  function showWord($word, $duration) {
    if($word.parents('.cd-headline').hasClass('type')) {
      showLetter($word.find('i').eq(0), $word, false, $duration);
      $word.addClass('is-visible').removeClass('is-hidden');

    }  else if($word.parents('.cd-headline').hasClass('clip')) {
      $word.parents('.cd-words-wrapper').animate({ 'width' : $word.width() + 10 }, revealDuration, function(){
        setTimeout(function(){ hideWord($word) }, revealAnimationDelay);
      });
    }
  }

  function hideLetter($letter, $word, $bool, $duration) {
    $letter.removeClass('in').addClass('out');

    if(!$letter.is(':last-child')) {
       setTimeout(function(){ hideLetter($letter.next(), $word, $bool, $duration); }, $duration);
    } else if($bool) {
       setTimeout(function(){ hideWord(takeNext($word)) }, animationDelay);
    }

    if($letter.is(':last-child') && $('html').hasClass('no-csstransitions')) {
      var nextWord = takeNext($word);
      switchWord($word, nextWord);
    }
  }

  function showLetter($letter, $word, $bool, $duration) {
    $letter.addClass('in').removeClass('out');

    if(!$letter.is(':last-child')) {
      setTimeout(function(){ showLetter($letter.next(), $word, $bool, $duration); }, $duration);
    } else {
      if($word.parents('.cd-headline').hasClass('type')) { setTimeout(function(){ $word.parents('.cd-words-wrapper').addClass('waiting'); }, 200);}
      if(!$bool) { setTimeout(function(){ hideWord($word) }, animationDelay) }
    }
  }

  function takeNext($word) {
    return (!$word.is(':last-child')) ? $word.next() : $word.parent().children().eq(0);
  }

  function takePrev($word) {
    return (!$word.is(':first-child')) ? $word.prev() : $word.parent().children().last();
  }

  function switchWord($oldWord, $newWord) {
    $oldWord.removeClass('is-visible').addClass('is-hidden');
    $newWord.removeClass('is-hidden').addClass('is-visible');
  }


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
