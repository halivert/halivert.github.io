<script setup lang="ts">
const props = defineProps<{
  post: {
    url: string
    data: {
      title: string
    },
    body: string
    rendered: {
      html: string
    }
  }
}>()

const excerpt = props.post.rendered.html.split('<!-- Seguir leyendo -->')[0]
</script>

<template>
  <section class="p-4 pb-0">
    <h2 class="mb-6 text-4xl font-semibold">
      <a class="text-contrast-600" :href="post.url">
        {{ post.data.title }}
      </a>
    </h2>
    <hr />
    <div class="flex gap-3">
      <div class="flex-1" v-html="excerpt"></div>
      <!-- {% if post.image %} -->
      <!-- {%- capture postImage -%}{%- -->
      <!-- include remove_ext.html file=post.image -->
      <!-- -%}{%- endcapture -%} -->
      <!--  -->
      <!-- {%- assign path = postImage | absolute_url -%} -->
      <!-- {% -->
      <!-- include picture.html -->
      <!-- class="column is-3-desktop" -->
      <!-- path=path -->
      <!-- alt=post.image_alt -->
      <!-- types=post.image_types -->
      <!-- nowrap=true -->
      <!-- %} -->
      <!-- {% endif %} -->
    </div>
    <!-- {% include post-info-show.html %} -->
    <br />
  </section>
</template>
