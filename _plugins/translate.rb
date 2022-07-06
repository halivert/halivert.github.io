module Jekyll
  module TranslateFilter
    def __(string)
      pageRegister = @context.registers[:page]
      siteRegister = @context.registers[:site]
      locale = pageRegister["lang"] || siteRegister.config["lang"]

      data = siteRegister.data
      if data["i18n"]
        if data["i18n"][locale]
          translations = data["i18n"][locale]
          if translations[string]
            return translations[string]
          end
        end
      end

      string
    end

    def locale_url(input)
      pageRegister = @context.registers[:page]
      siteRegister = @context.registers[:site]

      if pageRegister["lang"]
        if pageRegister["lang"] != siteRegister.config["lang"]
          return absolute_url("#{pageRegister["lang"]}#{input}")
        end
      end

      absolute_url(input)
    end

    def locale_date(date)
      pageRegister = @context.registers[:page]
      siteRegister = @context.registers[:site]
      locale = pageRegister["lang"] || siteRegister.config["lang"]

      months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre",
        "Diciembre"
      ]

      data = siteRegister.data
      if data["i18n"]
        if data["i18n"][locale]
          translations = data["i18n"][locale]
          if translations["months"]
            months = translations["months"]
          end
        end
      end

      if date.respond_to?(:strftime)
        "#{months[date.month - 1]} #{date.strftime('%d, %Y')}"
      elsif date.is_a? String
        newDate = Time.parse(date)
        "#{months[newDate.month - 1]} #{newDate.strftime('%d, %Y')}"
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::TranslateFilter)
