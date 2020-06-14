import os
from django import template
from django.utils.html import format_html

register = template.Library()

@register.simple_tag(name='mzkVisualizerIncludeCss')
def mzkVisualizerPluginIncludeCss():
    if os.path.isfile('/static/dist/css/mzkvisualizer.bundle.css'):
        return format_html(
            '<link rel="stylesheet" type="text/css" href="/static/dist/css/mzkvisualizer.bundle.css"/>')
    return ''

@register.simple_tag(name='mzkVisualizerIncludeJs')
def mzkVisualizerPluginIncludeJs():
    if os.path.isfile('/static/dist/js/mzkvisualizer.bundle.js'):
        return format_html(
            '<script type="text/javascript" src="/static/dist/js/mzkvisualizer.bundle.js" defer/></script>')
    return ''
