module Jekyll
  module SpanishDateFilter
    def es_date(date)
      months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ]
      if date.respond_to?(:strftime)
        "#{months[date.month - 1]} #{date.strftime('%d, %Y')}"
      elsif date.is_a? String
        newDate = Time.parse(date)
        "#{months[newDate.month - 1]} #{newDate.strftime('%d, %Y')}"
      end
    end
  end
end

Liquid::Template.register_filter(Jekyll::SpanishDateFilter)
