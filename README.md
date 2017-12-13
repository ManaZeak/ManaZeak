# ManaZeak
ManaZeak is a free software that gives you the ability to listen and edit your musical library from anywhere that has a connection and a true web browser (i.e. Chromium, Firefox). It is also linked to [SyncThing](https://syncthing.net/), to automatically sync your online library with all the devices that shares it. 

# Get Started
In order to make an instance work, run the following commands :
- $ ```git clone https://github.com/Squadella/ManaZeak```
- $ ```cp docker-compose.yml.example docker-compose.yml```

Replace all ```/PATH/TO/LIBRARY``` in ```docker-compose.yml``` by the path of your music files, then keep going with :

- $ ```docker-compose build``` (This may take a while, go grab some cofee...)
- $ ```docker-compose up -d```

You can now check that all container have been launched well by using :
- $ ```docker ps -a```

Finally, if everything is OK with Docker, grab a browser and go to [127.0.0.1/app](127.0.0.1/app)

# Features
- Basic player
    - Play/Pause/Stop
    - Volume
- Basic playlist
    - Repeat (off, one, album, artist)
    - Random, Shuffle
- Queue system
- ListView
- Track preview and track information
- Single track download
- [MoodBar](https://en.wikipedia.org/wiki/Moodbar)
- Statistic collection
- Track suggestion
- User system

# On schedule
- Specific AlbumView
- Specific GenreView
- SyncThing link
- Playlist creation
- Tracks/album download
- Track adding via Drag'n'Drop

# Techno
- Django
- Postgresql
- SyncThing
- Docker
- d3.js (for [MoodBars](https://en.wikipedia.org/wiki/Moodbar))

# Contributors
- Arthur Beaulieu
- Pierre Bouniol
- Valentin Peiro
- Pierre-Balthazar Donadieu de Lavit
- Armand Vignat
