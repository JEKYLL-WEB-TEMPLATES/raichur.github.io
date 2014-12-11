---
layout: page
title: Work
permalink: /work/
---


<div class="home work">

<input id="select-type-all" name="radio-set-1" type="radio" class="ff-selector-type-all" checked="checked" />
<label for="select-type-all" class="ff-label-type-all">All</label>

<input id="select-type-1" name="radio-set-1" type="radio" class="ff-selector-type-1" />
<label for="select-type-1" class="ff-label-type-1">Illustration</label>

<input id="select-type-2" name="radio-set-1" type="radio" class="ff-selector-type-2" />
<label for="select-type-2" class="ff-label-type-2">Poster</label>

<ul class="ff-items">
{% for post in site.posts %}
{% if post.category == 'work' %}
<li class="{{ post.tags }}">
<a class="post-link" href="{{ post.url | prepend: site.baseurl }}"><h1>{{ post.title }}</h1><span></span><img src="/resources/work{{ post.img_dir }}/thumb.png"></a>
</li>
{% endif %}
{% endfor %}
</ul>

</div>
