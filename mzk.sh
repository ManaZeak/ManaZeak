#!/bin/bash

vmzk="0.1.0"
mzkdir=$(dirname $0)

create_necessary_files()
{
    echo -en "Setting up necessary files ... "
    if [ ! -d "log" ]; then
      mkdir log
    fi
    if [ ! -f "log/debug.log" ]; then
      touch log/debug.log
    fi
    echo -e "OK\n"
}

if [ $# -eq 0 ]; then
    echo -e "\e[31mERROR\e[39m No arguments supplied"
    echo -e "Script usage: ./mzk.sh --help"

elif [ $1 = "init" ]; then
    echo -e "\nWelcome to the init wizard for ManaZeak. This will help you setup your ManaZeak environment."

    create_necessary_files

    read -p "Please enter a path for your music library: " musicpath
    if [ -z $musicpath ]; then
	musicpath="$HOME/Music"
    elif [ ${musicpath:0:1} != "/" -a ${musicpath:0:1} != "~" -a ${musicpath:0:2} != "./" -a ${musicpath:0:3} != "../" -a ! -d $musicpath ]; then
	musicpath="$HOME/$musicpath"
    fi
    echo -en "Setting music library path to $musicpath ... "
    dockerconf=$(sed "s/\/PATH\/TO\/MUSIC/$(echo $musicpath | sed 's / \\/ g')/g" $mzkdir/docker-compose.yml.example)
    echo -e "Done"
    read -p "Please enter the path under which to store your ManaZeak database: " dbpath
    if [ -z $dbpath ]; then
	dbpath="$mzkdir/dbdata"
    elif [ ${dbpath:0:1} != "/" -a ${dbpath:0:1} != "~" -a ${dbpath:0:2} != "./" -a ${dbpath:0:3} != "../" ]; then
        dbpath="$mzkdir/$dbpath"
    fi
    echo -en "Setting database data folder to $dbpath ... "
    dockerconf=$(echo "$dockerconf" | sed "s/\/PATH\/TO\/DB_DATA/$(echo $dbpath | sed 's / \\/ g')"/g)
    echo -e "Done"
    echo "$dockerconf" > $mzkdir/docker-compose.yml
    echo -e "\nManaZeak wizard setup complete ! You can now run the next mzk.sh commands to build your containers.\n"

elif [ $1 = "build" ]; then
    eval "docker-compose build"
    eval "npm install"

elif [ $1 = "dev" ]; then
    create_necessary_files
    eval "docker-compose up -d"
    eval "npm run dev"

elif [ $1 = "prod" ]; then
    create_necessary_files
    eval "docker-compose up -d"
    eval "npm run prod"

elif [ $1 = "stop" ]; then
    eval "docker-compose stop"
    eval "docker ps"

elif [ $1 = "clean" ]; then
    eval "docker-compose rm -sf"
    eval "sudo rm -r db_data"
    echo -e "\e[93mWARNING\e[39m Images haven't been removed"
    printf "Use docker rmi \$(docker images -q) to remove every image on the system\n"

elif [ $1 = "repy" ]; then
    eval "docker kill manazeak_app 2>/dev/null"
    eval "docker start -i manazeak_app"

elif [ $1 = "--help" ] || [ $1 = "-h" ]; then
    printf -- "\nUsage: ./mzk.sh <command>\n"
    printf -- "Where <command> is one of:\n\n"
    printf -- "init          Run the initialisation wizard\n"
    printf -- "build         Build ManaZeak\n\n"
    printf -- "dev           Run a dev environment\n"
    printf -- "prod          Run a production environment\n"
    printf -- "stop          Stop ManaZeak application\n\n"
    printf -- "clean         Remove ManaZeak containers\n"
    printf -- "repy          Run the application docker in interactive mode\n\n"
    printf -- "--help        Display the command usage  (or -h)\n"
    printf -- "--version     Display the version number (or -v)\n\n"

elif [ $1 = "--version" ] || [ $1 = "-v" ]; then
    printf "ManaZeak $vmzk\n"

else
    echo -e "\e[31mERROR\e[39m Your argument is invalid"
    echo -e "Script usage: ./mzk.sh --help"

fi
