---
layout: html
permalink: /authors
---

{% include nav.html %}
<section class="section">
  {% assign publ = site.emptyArray %}
  {% for post in site.posts %}
    {% assign publ[post.author] = publ[post.author] | push: post %}
  {% endfor %}
  {{ publ }}
</section>