# ManaZeak
ManaZeak is a free software that gives you the ability to listen to and edit your musical library from anywhere that has a connection and a true web browser (i.e. Chromium, Firefox). It is also linked to [SyncThing](https://syncthing.net/), to automatically sync your online library with all the devices that share it.

The main goal of this application is to share your musical library with a selection of chosen friends, that can edit tracks afterwards and more. It is collaboration oriented since an inside coin system is about to get in, with reward and scoreboard!

# Get Started
In order to make an instance work, run the following commands :
- ```$ git clone https://github.com/Squadella/ManaZeak```
- ```$ cp docker-compose.yml.example docker-compose.yml```

Replace all ```/PATH/TO/LIBRARY``` in ```docker-compose.yml``` by the path of your music files, then keep going with :

- ```$ docker-compose build``` (This may take a while, go grab some coffee...)
- ```$ docker-compose up -d```

You can now check that all containers have been launched correctly by using :
- ```$ docker ps -a```

Finally, if everything is OK with Docker, grab a browser and go to [127.0.0.1/app](127.0.0.1/app). When declaring your libraries in ManaZeak, don't forget to prefix your path with ```/library/```

# Features
- Basic player (Play/Pause/Stop/Volume/Repeat/Random/Shuffle/Queue)
- Drag & Drop (to suggest new file on the instance)
- Link with SyncThing (to allow remote synchronisation)
- Metadata edition (because tagging is life)
- [MoodBar](https://en.wikipedia.org/wiki/Moodbar) (a way to have a unique visual of an audio file)
- Playlist management (create/rename/delete)
- Track(s) downloading (if you want a sweet local array of musical genius)
- Track suggestion (based on internal statistic)
- User account system (optionnal sponsoring setting)
- User stats (to know better you musical habits)
- Views (list/party)

# Scheduled
- Specific AlbumView
- Specific GenreView (Like a Top 100 for each genre)
- ManaCoin intern system

# Technologies
- Django
- Postgresql
- SyncThing
- Docker
- d3.js (for [MoodBars](https://en.wikipedia.org/wiki/Moodbar))

# Contributors
- [Arthur Beaulieu](https://github.com/ArthurBeaulieu)
- [Pierre Bouniol](https://github.com/Squadella)
- [Valentin Peiro](https://github.com/Oxydiz)
- [Pierre-Balthazar Donadieu de Lavit](https://github.com/Belash)
- [Armand Vignat](https://github.com/avignat)
- [Guilhem Piat](https://github.com/Syncrossus)
- [Laetitia Genin](http://lmgtfy.com/?q=Laetitia+Genin)
