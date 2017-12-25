---
layout: construccion
sitemap: false
class: content
construccion: 0
permalink: /authors/
---

{% include nav.html %}
<section class="section">
  {% assign publ = site.emptyArray %}
  {% for post in site.posts %}
    {% assign publ[post.author] = publ[post.author] | push: post %}
  {% endfor %}
  {{ publ }}
</section>
