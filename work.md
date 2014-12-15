---
layout: page
title: Work
permalink: /work/
---


<div class="home work">

<ul class="ff-items">
{% for post in site.posts %}
{% if post.category == 'work' %}
<li class="{{ post.tags }}">
<a class="post-link" href="{{ post.url | prepend: site.baseurl }}"><h1><p>{{ post.tags }}</p>{{ post.title }}</h1><span></span><img src="/resources/work{{ post.img_dir }}/thumb.png"></a>
</li>
{% endif %}
{% endfor %}
</ul>

</div>
