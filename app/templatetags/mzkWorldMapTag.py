import os
from django import template
from django.utils.html import format_html

register = template.Library()

@register.simple_tag(name='mzkWorldMapIncludeCss')
def mzkWorldMapPluginIncludeCss():
    if os.path.isfile('/static/dist/css/mzkworldmap.bundle.css'):
        return format_html(
            '<link rel="stylesheet" type="text/css" href="/static/dist/css/mzkworldmap.bundle.css"/>')
    return ''

@register.simple_tag(name='mzkWorldMapIncludeJs')
def mzkWorldMapPluginIncludeJs():
    if os.path.isfile('/static/dist/js/mzkworldmap.bundle.js'):
        return format_html(
            '<script type="text/javascript" src="/static/dist/js/mzkworldmap.bundle.js" defer/></script>')
    return ''
