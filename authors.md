---
layout: construccion
sitemap: false
class: content
construccion: 1
permalink: /authors/
---

{% assign publ = site.emptyArray %}
{% for post in site.posts %}
{% assign publ[post.author] = publ[post.author] | push: post %}
{% endfor %}
{{ publ }}
