module Jekyll
  module MD5SumFilter
    def md5sum(string)
      Digest::MD5.hexdigest string
    end
  end
end

Liquid::Template.register_filter(Jekyll::MD5SumFilter)
