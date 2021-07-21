---
layout: home
image: "/assets/img/halivert-card.jpg"
---

{% assign author = site.data.authors[layout.author] %}

<main>
  <p class="mb-2">
    <a href="https://jw.org">JW</a>,
    studying a
    <a href="https://www.escom.ipn.mx/"
      >computer systems engineering</a
    >.
  </p>

  <p>
    I work as web designer and I love algorithms and math.
  </p>

  <p>
    You'll find more about me in my
    <a href="{{ '/blog/' | locale_url }}">blog</a>.
  </p>

  <p class="mt-1">
    I'll also be happy to help you to solve some programming problems.
    You can view some of my
    <a href="{{ '/projects/' | locale_url }}">projects</a>.
  </p>

  <p>
    You can contact me
    {% if author.kofi %}
      and also
      <a href="{{ author.kofi }}">buy me a coffee</a>
      if you want to.
    {%- endif -%}
  </p>
</main>
