export const languages = ["es-419", "en"] as const

export const displayLanguages: Record<(typeof languages)[number], string> = {
  "es-419": "es",
  en: "en",
}

export const defaultLang = "es-419"
export const showDefaultLang = false

export const ui = {
  "es-419": {
    "lang.label": "es",
    "Leer en español": "Read in english",
    "months.april": "Abril",
    "months.august": "Agosto",
    "months.december": "Diciembre",
    "months.february": "Febrero",
    "months.january": "Enero",
    "months.july": "Julio",
    "months.june": "Junio",
    "months.march": "Marzo",
    "months.may": "Mayo",
    "months.november": "Noviembre",
    "months.october": "Octubre",
    "months.september": "Septiembre",
    "profile.image.alt": "Imagen de perfil de :0",
    Inglés: "English",
  },
  en: {
    "lang.label": "en",
    "Aprendiendo:": "Learning:",
    "Cambiar tema": "Change theme",
    "Contáctame por": "Contact me on",
    "Desarrollador web, con conocimiento en diversas tecnologías":
      "Web developer, with knowledge in several technologies",
    "Experimentado en:": "With experience in:",
    "Fecha original": "Original date",
    "Ir a página": "Go to page",
    "Ir al contenido": "Go to content",
    "Leer en español": "Leer en español",
    "Logo de Halivert": "Halivert's logo",
    "Los artículos escritos en este blog están bajo la licencia":
      "Articles written in this blog are under licence",
    "Más sobre mí": "More about me",
    "Nuevo sitio": "New site",
    "Primer post": "First post",
    "Puedes ponerte en contacto conmigo.": "Contact me.",
    "Página no encontrada": "Page not found",
    "Seguir leyendo": "Keep reading",
    "Sobre mí": "About me",
    "Ya me pasó": "I were there",
    "months.april": "April",
    "months.august": "August",
    "months.december": "December",
    "months.february": "February",
    "months.january": "January",
    "months.july": "July",
    "months.june": "June",
    "months.march": "March",
    "months.may": "May",
    "months.november": "November",
    "months.october": "October",
    "months.september": "September",
    "profile.image.alt": ":0's Profile image",
    "¡Código!": "Code!",
    "¡Ups! No encontré nada, pero puedes leer esto":
      "Oops! I didn't find anything, but you can read this",
    "última modificación": "last modified on",
    Anterior: "Previous",
    Buscar: "Search",
    Categorías: "Categories",
    Código: "Code",
    Divagando: "Rambling",
    Idiomas: "Languages",
    Inglés: "Inglés",
    Inicio: "Home",
    Matemáticas: "Math",
    Novedades: "News",
    Productividad: "Productivity",
    Proyectos: "Projects",
    Siguiente: "Next",
    Sitio: "Site",
    por: "by",
    publicado: "posted",
    compartir: "share",
  },
} as const
