## This class is used to store all the constant of the app.
class Constants(object):
    ## Number of params in a single SQL batch
    PARAMS_PER_REQUEST = 1000
    ## Artist picture root location
    ARTIST_PICTURE_LOCATION = 'static/pictures/ArtistsProfile/'
    ## Album cover root location
    ALBUM_COVER_LOCATION = 'static/covers/'
    ## Genre cover root location
    GENRE_COVER_LOCATION = 'static/pictures/GenresLogo/'
    ## Labels cover root location
    LABELS_COVER_LOCATION = 'static/pictures/LabelsLogo/'
    ## Country image location.
    COUNTRY_COVER_LOCATION = 'static/img/flag/'
    ## Thumb root location
    ROOT_THUMB_LOCATION = 'static/thumb/'
    ## Forbidden chars
    FORBIDDEN_CHARS = ['*', '/', '\\', ':', ';', '?', '<', '>', '|']
    ## JPG extension
    JPG = '.jpg'
    ## SVG extension
    SVG = '.svg'
    ## Message when a function is called from an abstract.
    NOT_IMPLEMENTED = 'This function needs an override.'
