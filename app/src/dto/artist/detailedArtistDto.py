from app.src.dto.abstractDto import AbstractDto

## Represents a detailed artist.
class DetailedArtistDto(AbstractDto):

    def __init__(self):
        ## The artist id
        self.id = None
        ## The artist name
        self.name = None
        ## The albums of the artist.
        self.albums = []
        ## The countries of the artist.
        self.countries = set()
        ## The genres of the tracks of the artist
        self.genres = set()
        ## The artist picture
        self.picture = None
        ## The number of tracks
        self.numberOfTracks = 0
        ## The total duration
        self.totalDuration = 0

    ## Generate the JSON object from the artist.
    def generateJson(self):
        return {
            'ARTISTS_ID': self.id,
            'ARTIST_NAME': self.name,
            'ARTIST_PP': self.picture,
            'NUMBER_TRACKS': self.numberOfTracks,
            'TOTAL_DURATION': self.totalDuration,
            'ARTIST_ALBUMS': [album.generateJson() for album in self.albums],
            'ARTIST_GENRES': [genre.generateJson() for genre in self.genres],
            'ARTIST_COUNTRIES': [country.generateJson() for country in self.countries]
        }
