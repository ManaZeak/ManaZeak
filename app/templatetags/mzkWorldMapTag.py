from django import template
from django.utils.html import format_html

register = template.Library()

@register.simple_tag(name='mzkWorldMapIncludeCss')
def mzkWorldMapPluginIncludeCss():
    return format_html('<link rel="stylesheet" type="text/css" href="/static/dist/css/mzkworldmap.bundle.css"/>')

@register.simple_tag(name='mzkWorldMapIncludeJs')
def mzkWorldMapPluginIncludeJs():
    return format_html('<link rel="stylesheet" type="text/css" href="/static/dist/css/mzkworldmap.bundle.css" defer/>')
