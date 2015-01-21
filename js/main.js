---
---

function requestJSON(url, callback) {
  $.ajax({
    url: url,
    complete: function(xhr) {
      callback.call(null, xhr.responseJSON);
    }
  });
}

$(function() {
  var reqURI = 'https://api.github.com/users/' + '{{ site.github_username }}',
    repoURI = 'https://api.github.com/users/' + '{{ site.github_username }}' + '/repos';

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
          output += '<li><a href="' + repositories[index].html_url + '" target="_blank">';
          output += '<h3>' + repositories[index].name + '</h3>';
          if (repositories[index].description) { output += '<p>' + repositories[index].description + '</p>'; }
          if (repositories[index].language) { output += '<p style="color: ' + repo_colors[repositories[index].language] + '">' + repositories[index].language + '</p>'; }
          output += '<time class="timeago" datetime="' + repositories[index].updated_at + '">' + repositories[index].updated_at + '</time>';
          output += '</a></li>';
        });
        $('#githubData').html(output);
      }
  });
});

$(document).ajaxComplete(function() {
  $('.timeago').timeago();
});
