---
title: "Vere"
layout: container
class: "content"
sitemap: false
author: halivert
permalink: /vere/
---

{% capture she %}verenaiss{% endcapture %}
{% assign vere = site.data.authors[she] %}

<div class="is-size-5">
  <section class="has-text-centered">
    <p class="title">
      {{ vere.first_name }}
    </p>
  </section>
  <hr />

  <div class="container">
    {{ vere.description }}
    <br>
    Pero más que eso... es mi mejor amiga y mi novia...
    <i class="has-text-danger fas fa-heart"></i>
  </div>
</div>
