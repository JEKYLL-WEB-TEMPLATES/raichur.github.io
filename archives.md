---
layout: page
title: Archives
permalink: /archives/
---

<div class="home">

<ul class="post-list">
{% for post in site.categories.article %}
<li>
{% assign words = post.content | number_of_words %}
{% if words <= 90 %}
{% assign reading-time = "1m" %}
{% elsif words < 270 %}
{% assign reading-time = "1m" %}
{% elsif words < 450 %}
{% assign reading-time = "2m" %}
{% elsif words < 630 %}
{% assign reading-time = "3m" %}
{% elsif words < 810 %}
{% assign reading-time = "4m" %}
{% elsif words < 990 %}
{% assign reading-time = "5m" %}
{% else %}
{% assign reading-time = words | divided_by:180 | append:"m" %}
{% endif %}
<h1><a class="post-link" href="{{ post.url | prepend: site.baseurl }}">{{ post.title }}</a></h1>
<p class="post-meta"><span title="{{ reading-time }} average reading time">{{ reading-time }}</span> ● <span title="{{ post.date | date: '%A, %-d %B %Y' }}">{{ post.date | date: "%b %Y" }}</span></p>

</li>
{% endfor %}
</ul>

</div>
