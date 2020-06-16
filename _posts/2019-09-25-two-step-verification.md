---
author: "halivert"
title: "Verificación en dos pasos"
date: "2019-09-25 12:02"
category: "Divagando"
---

Muchos sistemas son realmente seguros. Hablando de redes sociales y sitios en
donde tienes que escribir un usuario y contraseña para iniciar sesión podemos
decir que la tecnología ha avanzado bien, en la mayoría de los casos (en los
que no se guarda la contraseña como texto plano) es prácticamente imposible
descifrarla (hasta ahora...).

<!-- Seguir leyendo -->

Pero aún así, siguen existiendo los [crackers][1], y más aún, siguen teniendo
éxito, ¿cómo es que hacen esto? Lo cierto es que no soy un experto en
seguridad web, pero seguramente también habrás escuchado hablar sobre el
phishing, veamos que es y cómo evitarlo.

<small>
**Nota:** La Wikipedia en inglés es algo confiable
</small>

#### [Phishing][2] 🎣

Como su nombre lo dice, se trata de una técnica que busca hacer que caigas en
un cebo, y esto lo intentan mediante mensajes que parecen provenir de fuentes
seguras, pero que en realidad son todo lo contrario.
Una vez que obtienen de ti preguntas y códigos de seguridad, pueden acceder a
tu cuenta simulando que eres tú, y que olvidaste tus credenciales.

##### ¿Cómo evitar el phishing?

Lo más importante es verificar las fuentes de donde proviene un mensaje o
email, para esto, muchas veces hace falta únicamente revisar el correo
electrónico o la cuenta que te envía el mensaje. Si ves correos como...

<div class="columns">
  <div class="column">
    <img
      alt="Ejemplo de phishing: Bank of America"
      src="{{ site.url }}/img/2019-09-25-two-step-verification/phishing1.png"
    />
  </div>
  <div class="column">
    <img
      alt="Ejemplo de phishing: iTunes"
      src="{{ site.url }}/img/2019-09-25-two-step-verification/phishing2.png"
    />
  </div>
</div>
<div class="columns">
  <div class="column">
    <img
      alt="Ejemplo de phishing: PayPal"
      src="{{ site.url }}/img/2019-09-25-two-step-verification/phishing3.jpeg"
    />
  </div>
  <div class="column">
    <img
      alt="Ejemplo de phishing: Microsoft"
      src="{{ site.url }}/img/2019-09-25-two-step-verification/phishing4.png"
    />
  </div>
</div>

Revisa el dominio y si, evidentemente no tienen que ver con la empresa a la
que dicen pertenecer, entonces bórralos, y no hagas click en ningún vínculo de
dicho correo.

Otra cosa que puede ayudarte es revisar los vínculos en los que haces click,
los vínculos acortados que llegan por correo, generalmente son un mal indicio.

Queda algo más que hacer para no ser víctima de alguno de estos robos de
cuentas o datos, puedes activar la **verificación en dos pasos**.

###### Verificación en dos pasos

Se trata de un método que hace necesario, además de introducir una contraseña,
(que quizá te hayan robado con ayuda del phishing) introducir un código de
seguridad que solo tú posees. (Es importante que no compartas dichos códigos
con nadie, porque la verificación en dos pasos perdería toda su utilidad).

Algunas redes sociales te permiten usar aplicaciones móviles que generan
códigos de un solo uso que se recargan automáticamente cada cierto tiempo (1
minuto, 30 segundos) y que sirven como método para afirmar que eres tú quien
está accediendo a tu cuenta, y no alguien que robó tu contraseña. Aplicaciones
como [Authy][3] o [Google Authenticator][4] sirven para estos fines. Otras
aplicaciones web te ofrecen enviar un código a tu celular por medio de SMS.

#### Conclusión

Mi recomendación personal es que actives la verificación en dos pasos de la
mayoría de cuentas que tengas en Internet.

Redes sociales como Snapchat, Twitter e Instagram, cuentan con verificación en
dos pasos, servicios de mensajería como Telegram y Whatsapp y otras
aplicaciones web como Github, Heroku, Google y Outlook también cuentan con
ella.

Es sencillo activar la verificación en dos pasos. Aquí muestro los nombres que
tiene en Telegram, Twitter y Snapchat.

<div class="columns">
  <div class="column">
    <img
      src="{{ site.url }}/img/2019-09-25-two-step-verification/telegram-2fa.jpg"
      alt="Configuración de privacidad y seguridad de Telegram"
    />
  </div>
  <div class="column">
    <img
      src="{{ site.url }}/img/2019-09-25-two-step-verification/twitter-2fa.jpg"
      alt="Configuración de verificación de inicio de sesión de Twitter"
    />
  </div>
  <div class="column">
    <img
      src="{{ site.url }}/img/2019-09-25-two-step-verification/snapchat-2fa.jpg"
      alt="Ajustes de Snapchat (Autenticación de dos factores)"
    />
  </div>
</div>

Hasta la próxima 👋🏽

[1]: https://dle.rae.es/?id=BBnPPfB
[2]: https://en.wikipedia.org/wiki/Phishing
[3]: https://authy.com
[4]: https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2
