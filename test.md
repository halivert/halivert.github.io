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

{% highlight javascript linenos %}
let v = [1, 2, 3];
console.log(v);
{% endhighlight %}

{% highlight ruby %}
def show
  @widget = Widget(params[:id])
  respond_to do |format|
    format.html # show.html.erb
    format.json { render json: @widget }
  end
end
{% endhighlight %}