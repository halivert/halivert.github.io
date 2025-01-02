---
author: halivert
categories: ["Ya me pasó"]
date: "2019-07-23 08:49"
tags: ["Vim", "Productividad"]
title: "Vim macros for Bulma"
translations:
  - short: es-419
    post: 2019-07-23-vim-macro-for-bulma
---

When you use a CSS framework as flexible as [Bulma][1], you want to have only
the necessary components and no more. When you create your own "theme" you can
import only the components and elements that you want to use.

Now, what happens when you're not sure which files contain which rules?
**Import everything** and then comment on those that are not necessary in that
moment.

But... How do we import all the components and elements of Bulma, easily?

<!-- Keep reading -->

I've found these macros that can be very useful:
```viml
let @q='02t/"cyt"o^[;r ^Rc^Mdd.2kI// ^[2j0'
let @j='0f"a../.^["cpF/l3dfsA;^[j0'
let @k='02f"i.sass^[j0'
```

Now, if you copy and paste these commands, they won't work because they contain
control characters (and others), you should replace the following:

| Original |      Replace       |
|:--------:|:------------------:|
|   `^[`   |    Ctrl + v, Esc   |
|   `^R`   | Ctrl + v, Ctrl + r |
|   `^M`   |   Ctrl + v, Enter  |
|    `;`   |         `:`        |

<small>Note: I have these mappings in normal mode: `noremap ; :` and `noremap :
;`.</small>

To make this easier, you can type `:%s/\V^[/[Ctrl + v, Esc]/g` and so on with
the other two control characters.

<div class="has-text-centered">
  <video autoplay loop muted playsinline>
    <source
      src="/img/2019-07-vim-macro-for-bulma/vim-macro.mp4"
      type="video/mp4">
  </video>
</div>

When you are in the same directory as the `node_modules` folder, you can use
those macros and do the following:

<div class="has-text-centered">
  <video autoplay loop muted playsinline>
    <source
      src="/img/2019-07-vim-macro-for-bulma/vim-macro-used.mp4"
      type="video/mp4">
  </video>
</div>
<br>
See you in the next vim-tip 👋🏽

#### Extra
¿How do these macros work?
```viml
let @q='02t/"cyt"o^[;r ^Rc^Mdd.2kI// ^[2j0'
```
- First things first, go to beginning of line with `0`.
- Next, search forward 1 character before second `/` with `2t/`.
- Then, paste in the `c` register the rest of the line until the quotes with `"cyt"`.
- Insert a line below and exit the insert mode with `o^[`.
- Add to the file the content of the `c` register with `;r ^Rc^M`.
- Delete the comment line and then the `charset` line with `dd.`.
- Go up two lines with `2k`.
- Comment on the line in which we are with `I// `.
- Exit the insert mode, go down two lines and go back to beginning of line with `^[2j0`.

```viml
let @j='0f"a../.^["cpF/l3dfsA;^[j0'
```
- Go to beginning of line with `0`.
- Search the first quotes with `f"`.
- Agregamos un `../.` with `a../.`.
- Exit the insert mode with `^[`.
- Paste the content of the `c` register with `"cp`.
- Search backwards the first `/` and move one character forward with `F/l`.
- Delete until the third `s` with `3dfs`.
- Add the semicolon at the end of the line `A;`.
- Exit the insert mode, go down one line and go to the beginning of the line with `^[j0`.

```viml
let @k='02f"i.sass^[j0'
```
- Look for the second quotes from the beginning of the line with `02f"`.
- Insert the string `.sass` with `i.sass`.
- Finally, exit the insert mode, go down one line and go to the beginning of the line with `^[j0`.

[1]: https://bulma.io
