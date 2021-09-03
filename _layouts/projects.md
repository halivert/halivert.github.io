---
layout: container
---

{% assign locale = page.lang | default: site.lang %}
{% assign projects = site.data[locale].projects | default: site.data.projects %}

<section class="projects">
  {% for project in projects %}
    <article>
      <label for="{{ project.id }}">
        <figure>
            <img
              loading="lazy"
              src="{{ project.image }}"
              alt="{{ project.image_alt | default: 'Imagen de proyecto' }}" />

          <figcaption>{{ project.title }}</figcaption>
        </figure>
      </label>

      <input
        class="hidden"
        name="projects"
        type="radio"
        id="{{ project.id }}">

      <div
        class="description"
        onClick="document.getElementById('{{ project.id }}').checked = false">
        <strong>{{ project.title }}</strong>
        <span>{{ project.description }}</span>
        <p>
          {% if project.live %}
            <a
              data-turbo="false"
              class="button is-primary"
              href="{{ project.live }}"
              >{{ 'Sitio' | __ }}</a
            >
          {% endif %}
          {% if project.repo %}
            <a
              data-turbo="false"
              class="button is-primary"
              href="{{ project.repo }}"
              >{{ 'Código' | __ }}</a
            >
          {% endif %}
        </p>
      </div>
    </article>
  {% endfor %}
</section>
