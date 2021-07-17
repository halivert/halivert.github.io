---
layout: container
title: "Proyectos"
permalink: "/projects/"
---

<section class="projects">
  {% for project in site.data.projects %}
    <article>
      <figure>
        <label for="{{ project.id }}">
          <img
            src="{{ project.image }}"
            alt="{{ project.image_alt | default: 'Imagen de proyecto' }}" />
        </label>

        <figcaption>{{ project.title }}</figcaption>
      </figure>

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
            <a class="button is-primary" href="{{ project.live }}">Sitio</a>
          {% endif %}
          {% if project.repo %}
            <a class="button is-primary" href="{{ project.repo }}">Código</a>
          {% endif %}
        </p>
      </div>
    </article>
  {% endfor %}
</section>
