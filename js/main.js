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
          if (repositories[index].description) { output += '<p class="description">' + repositories[index].description + '</p>'; }
          if (repositories[index].homepage) { output += '<a href="' + repositories[index].homepage + '">Live</a>'; }
          if (repositories[index].language) { output += '<p class="language" style="color: ' + repo_colors[repositories[index].language] + '">' + repositories[index].language + '</p>'; }
          output += '<time class="date" datetime="' + repositories[index].updated_at + '">' + repositories[index].updated_at + '</time>';
          output += '</li>';
        });
        $('#codelist').html(output);
      }
  });
}

if($('body').hasClass('code')){
  getGithubData();
  $(document).ajaxComplete(function() {
      var codelistoptions = {
        valueNames: ['name', 'language', 'date', 'description'],
        plugins: [ ListFuzzySearch() ]
      };
      var codelist = new List('code', codelistoptions);
      codelist.sort('date', { order: "desc"});
      $('time').timeago();
  });
}

if($('body').hasClass('pixels')){
  $.jribbble.getShotsByPlayerId('geek', function (playerShots) {
    var html = [], date;
    $.each(playerShots.shots, function (i, shot) {
      date = new Date(shot.created_at).toISOString();
      html.push('<li><h3 class="name">' + shot.title + '</h3>');
      html.push('<img src="' + shot.image_teaser_url + '" ');
      html.push('alt="' + shot.title + '">');
      html.push('<time class="date" datetime="' + date + '">' + date + '</time></a></li>');
    });

    $('#pixelslist').html(html.join(''));
  }, {page: 1, per_page: 20});
  $(document).ajaxComplete(function() {
    var pixelslistoptions = {
      valueNames: ['name', 'date']
    };
    var pixelslist = new List('pixels', pixelslistoptions);
    pixelslist.sort('date', { order: "desc"});
    $('time').timeago();
  });
}
