---
title: Pruebas
layout: page
author: hali
permalink: /test/
style:
  title: "has-text-warning"
---

{% capture tam %}{{ site.posts | size | minus: 1 }}{% endcapture %}

{% for post in site.posts limit: tam %}
 {{ post.title }}
{% endfor %}