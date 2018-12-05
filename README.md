<p align="center" style="margin-bottom: 25px">
    <img src="/static/img/logo/manazeak-bg.png" width="740" height="419" />
</p>

[![Build Status](https://travis-ci.org/ManaZeak/ManaZeak.svg?branch=master)](https://travis-ci.org/ManaZeak/ManaZeak)
[![FOSSA Status](https://app.fossa.io/api/projects/git%2Bgithub.com%2FManaZeak%2FManaZeak.svg?type=shield)](https://app.fossa.io/projects/git%2Bgithub.com%2FManaZeak%2FManaZeak?ref=badge_shield)
[![License](https://img.shields.io/github/license/ManaZeak/ManaZeak.svg)](https://github.com/ManaZeak/ManaZeak/blob/master/LICENSE.md)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=ManaZeak&metric=alert_status)](https://sonarcloud.io/dashboard?id=ManaZeak)

Are you fed up getting commercials while listening to your music online ? We are too. This is ManaZeak, a self-hostable web application that is based on your musical library. Share it with friends, with no restrictions and enjoy together your exquisite array of musical genius!

## Get Started

ManaZeak shall be installed on a Linux distribution with the following packages installed (refer to your distribution package manager for installation):

``docker``
``docker-compose``
``npm``

Once dependencies requirements are met, clone the project to your machine and init the ManaZeak app:

``git clone https://github.com/Squadella/ManaZeak``

``cd ManaZeak``

`` ./mzk.sh init``

This will prompt you a wizard, to fill the database path and the library root path. Then you can run the app:

``./mzk.sh dev`` or ``./mkz.sh prod``

Finally, if everything is OK with [Docker](https://github.com/docker) and with [Webpack](https://github.com/webpack/webpack), grab a browser and go to [127.0.0.1/](127.0.0.1/)

The first user that will sign in into the app will be the app administrator. When the first user log in ManaZeak, he will be ask to create a library. 

When declaring your libraries, prefix your path with ```/library/``` since ``/library/`` is equal to the path you gave in the ``./mzk.sh init`` wizard. Those declared libraries will be declared for every user in the app.

However, if not everything went as expected, you might check the [Troubleshooting](https://github.com/Squadella/ManaZeak/wiki/Troubleshooting) entry to get some help.

## Technologies
[d3.js](https://github.com/d3/d3) |
[Django](https://github.com/django/django) |
[Docker](https://github.com/docker) |
[Postgresql](https://github.com/postgres/postgres) |
[SyncThing](https://github.com/syncthing/syncthing) |
[Webpack](https://github.com/webpack/webpack)

## Contributors
[Arthur Beaulieu](https://github.com/ArthurBeaulieu) (Maintainer) |
[Pierre Bouniol](https://github.com/Squadella) (Maintainer)

[Valentin Peiro](https://github.com/Oxydiz) |
[Pierre-Balthazar Donadieu de Lavit](https://github.com/Belash) |
[Armand Vignat](https://github.com/avignat) |
[Guilhem Piat](https://github.com/Syncrossus) |
[Laetitia Genin](http://lmgtfy.com/?q=Laetitia+Genin)
