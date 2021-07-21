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

      return string
    end

    def locale_url(input)
      pageRegister = @context.registers[:page]
      siteRegister = @context.registers[:site]

      if pageRegister["lang"]
        if pageRegister["lang"] != siteRegister.config["lang"]
          return absolute_url("#{pageRegister["lang"]}#{input}")
        end
      end

      return absolute_url(input);
    end
  end
end

Liquid::Template.register_filter(Jekyll::TranslateFilter)
