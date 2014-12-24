---
layout: page
title: Work
permalink: /work/
---
<div id="users">
  <input class="search" placeholder="Search" autofocus/>

<ul class="list work">
  {% for post in site.posts %}
  {% if post.category == 'work' %}
  <li>
    <a class="post-link" href="{{ post.url | prepend: site.baseurl }}">

      <h1 class="name"><p class="category">{{ post.tags }}</p>{{ post.title }}</h1>
      <span></span>
      <img src="/resources/work{{ post.img_dir }}/thumb.png">
    </a>
  </li>
  {% endif %}
  {% endfor %}
</ul>

</div>
