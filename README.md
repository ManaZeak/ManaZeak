<div style="text-align:center; margin-bottom: 25px;">
    <img src ="http://manazeak.org/static/img/manazeak.svg" style="width: 50%" />
</div>

# ManaZeak

ManaZeak is a free software that gives you the ability to listen to and edit your musical library and to share it with friends, from anywhere that has a connection and a true web browser (i.e. Chromium, Firefox). It is also linked with [SyncThing](https://syncthing.net/), to automatically sync your online library with all the devices that share it.

## Get Started

#### Dependencies

To install, refer to your distribution package manager.

- ```docker```
- ```docker-compose```
- ```npm```

#### Installation


In order to make an instance work, run the following commands :
- ```$ git clone https://github.com/Squadella/ManaZeak```
- ```$ cd ManaZeak; cp docker-compose.yml.example docker-compose.yml```

Open the newly created  ```docker-compose.yml``` and replace all ```/PATH/TO/LIBRARY``` inside it with the path of your musical collection root directory (absolute path). Also, replace ``/PATH/TO/DB_DATA`` with the path you want ManaZeak to save its database in (absolute path, please don't ``./db_data``). Then keep going with :

- ```$ docker-compose build``` (This may take a while, go grab some coffee...)
- ```$ docker-compose up -d```

You can now check that all containers have been launched correctly by using :
- ```$ docker ps -a```

Then, you must build the assets with [Webpack](https://github.com/webpack/webpack) :
- ```npm install```
- ```npm run prod``` (If you want to watch any changes on the files, use ``npm run dev``)

Finally, if everything is OK with [Docker](https://github.com/docker) and with [Webpack](https://github.com/webpack/webpack), grab a browser and go to [127.0.0.1/](127.0.0.1/) (or a production address, but keep in mind that this is an experimental  software).

#### Setup
- You can now create an user : it will be an admin acount.
- You have to declare your libraries from this admin acount.
- It's cooked, go check the admin panel to tune the app!

**NB**: *When declaring your libraries in ManaZeak, don't forget to prefix your path with ```/library/```. Those declared libraries will be declared for every user (already registered or new ones) in the app.*

## Features

#### Already in

- Basic player (Play/Pause/Stop/Volume/Repeat/Random/Shuffle/Queue)
- Drag & Drop (to suggest new file on the instance)
- File support : MPEG3, OGG, FLAC
- Link with [SyncThing](https://github.com/syncthing/syncthing) (to allow remote synchronisation)
- Metadata edition (because tagging is life)
- [MoodBar](https://en.wikipedia.org/wiki/Moodbar) (a way to have a unique visual of an audio file)
- Playlist management (create/rename/delete)
- Track(s) downloading (if you want a sweet local array of musical genius)
- Track suggestion (based on internal statistic)
- User account system (optional sponsoring setting)
- User stats (to know better you musical habits)
- Views :
    - list (standard list view with tracks metadata);
    - party (more minimalist view).

#### Scheduled

- Milestone
- File support : WAV
- ManaCoin intern system
- ManaGotIt (Automatic player that suggests tracks according to some criteria)
- Views :
    - album (more visual for discographies);
    - genre (a Top 100 for each genre, with a short description)).

## Technologies
- [d3.js](https://github.com/d3/d3)
- [Django](https://github.com/django/django)
- [Docker](https://github.com/docker)
- [Postgresql](https://github.com/postgres/postgres)
- [SyncThing](https://github.com/syncthing/syncthing)
- [Webpack](https://github.com/webpack/webpack)

## Contributors
- [Arthur Beaulieu](https://github.com/ArthurBeaulieu) (front)
- [Pierre Bouniol](https://github.com/Squadella) (back)
- [Valentin Peiro](https://github.com/Oxydiz) (front)
- [Pierre-Balthazar Donadieu de Lavit](https://github.com/Belash) (docker)
- [Armand Vignat](https://github.com/avignat) (docker)
- [Guilhem Piat](https://github.com/Syncrossus) (translation)
- [Laetitia Genin](http://lmgtfy.com/?q=Laetitia+Genin) (logo)
