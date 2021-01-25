#!/bin/bash
vers="1.0.1"


# Method to check if given command is installed on the system
isInstalled() {
  command -v "$1" >/dev/null 2>&1
  if [[ $? -ne 0 ]]; then
    echo -e "\e[31mERROR\e[39m $1 is not installed on the system"
    echo -e "      Ensure docker, docker-compose and npm are installed"
    echo -e "      On a production environment, nginx must be installed as well"
    echo -e "      -> https://github.com/ManaZeak/ManaZeak/wiki"
    exit 0
  fi
}


# Script header
echo # Line break
echo -e "  ## ---------------------------------- ##"
echo -e "  ##              \e[92mManaZeak\e[39m              ##"
echo -e "  ##        2017/2021 -- GPL-3.0        ##"
echo -e "  ##               v$vers               ##"
echo -e "  ## ---------------------------------- ##"
echo # Line break


# First of all, test if user has send an argument
if [ $# -eq 0 ]; then
  echo -e "mzk.sh : Missing argument\n"
  echo -e "\e[31mERROR\e[39m Command executed without any arguments"
  echo -e "      Check command help for available arguments: ./mzk.sh --help"
  exit 0
fi


# Initialization sequence, fill .env file to fit user inputs and build docker images
if [ "$1" = "-i" ] || [ "$1" = "--install" ]; then
  echo -e "mzk.sh $1 : ManaZeak installation\n"
  # Check if all dependencies are installed
  for COMMAND in "docker" "docker-compose" "npm"; do
    isInstalled "${COMMAND}"
  done
  basedir=$(dirname "$0")
  # Check for previous existing .env file
  if [ -f "$basedir"/.env ]; then
    echo -e "\e[93mWARNING\e[39m ManaZeak is already configured"
    replaceconf="mzk" # Can't init to blank to get in while read loop
    # Wait for user to send yY/nN or blank
    while [[ "$replaceconf" != "" && "$replaceconf" != "y" && "$replaceconf" != "Y" && "$replaceconf" != "n" && "$replaceconf" != "N" ]]; do
      read -rp "        Do you want to override this configuration? [y/N] " replaceconf
    done
    # Exit if user didn't enter anything, or entered n/N
    if [ "$replaceconf" = "" ] || [ "$replaceconf" = "n" ] || [ "$replaceconf" = "N" ]; then
      exit 0
    else
      rm -rf "$basedir"/.env # Clear previous .env file as it is recreated later
      echo # Line break
    fi
  fi
  echo -e "Welcome to the ManaZeak installation wizard!"
  echo -e "Ensure you've read the installation entry of the wiki before going any further"
  echo -e "-> https://github.com/ManaZeak/ManaZeak/wiki\n"
  echo -e "Please fill the following information to properly configure ManaZeak :\n"
  # Database path (not empty and an existing directory on system)
  unset dbpath
  while [[ $dbpath = "" || ! -d $dbpath ]]; do
     read -rp "  1/4. The path to store the database in : " dbpath
  done
  # Database password (not empty and >4 characters)
  unset dbpassword
  while [[ $dbpassword = "" || ${#dbpassword} -lt 4 ]]; do
     read -rp "  2/4. The database password (> 4 characters) : " dbpassword
  done
  # Library path (not empty and an existing directory on system)
  unset libpath
  while [[ $libpath = "" || ! -d $libpath ]]; do
     read -rp "  3/4. The path where all your audio files are : " libpath
  done
  # Resources path (not empty and an existing directory on system)
  unset respath
  while [[ $respath = "" || ! -d $respath ]]; do
     read -rp "  4/4. The path to the library resources : " respath
  done
  # Create .env file
  touch "$basedir"/.env
  # Fill .env file with user parameters
  { echo "DB_DATA=$dbpath"
    echo "DB_PASSWORD=$dbpassword"
    echo "LIBRARY_PATH=$libpath"
    echo "RESOURCES_PATH=$respath"
    echo "BACK_TARGET=app"
  } >> "$basedir"/.env
  echo # Line break
  echo -e "\e[32mSUCCESS\e[39m .env configuration file created. Now building the docker images\n"
  eval "docker-compose build"
  echo -e "\n\e[32mSUCCESS\e[39m ManaZeak was successfully configured and installed!"
  echo -e "        You can now run ./mzk.sh --build then ./mzk.sh --run to start ManaZeak"


# Building ManaZeak fully, or only for front/back environment with logs
elif [ "$1" = '-b' ] || [ "$1" = '--build' ]; then
  # No optional argument, full build
  if [ -z "$2" ]; then
    echo -e "mzk.sh $1 : ManaZeak development build\n"
    echo -e "Full ManaZeak build"
    eval "docker-compose build"
  # Selective build
  else
    echo -e "mzk.sh $1 $2 : ManaZeak development build\n"
    # Building only the back container with logs
    if [ "$2" = "mvn" ]; then
      echo -e "Selective build for $2 container with logs"
      eval "docker-compose build back"
      eval "docker-compose up -d back"
      eval "docker-compose logs -f back"
    # Selective build not supported
    else
      echo -e "\e[31mERROR\e[39m $2 is not supported as a selective build"
      echo -e "      Check command help for available arguments: ./mzk.sh --help"
      exit 0
    fi
  fi


# Start ManaZeak application in either dev or prod mode
elif [ "$1" = '-s' ] || [ "$1" = '--start' ]; then
  # No optional arguments provided, fallback to production mode
  if [ -z "$2" ]; then
    echo -e "mzk.sh $1 : Start ManaZeak application\n"
    echo -e "Starting ManaZeak in production mode by default. Specify [dev/prod] otherwise"
    eval "docker-compose up -d"
    eval "npm run prod"
  # Mode was specified by command caller
  else
    echo -e "mzk.sh $1 $2 : Start ManaZeak application\n"
    # Building only the back container with logs
    if [ "$2" = "dev" ]; then
      echo -e "Starting ManaZeak in development mode"
      eval "docker-compose up -d"
      eval "npm run dev"
    # Selective build not supported
    elif [ "$2" = "prod" ]; then
      echo -e "Starting ManaZeak in production mode"
      eval "docker-compose up -d"
      eval "npm run prod"
    else
      echo -e "\e[31mERROR\e[39m $2 is not supported as a runtime mode"
      echo -e "      Check command help for available arguments: ./mzk.sh --help"
      exit 0
    fi
  fi


# Reset ManaZeak, clear database files and docker images, then rebuild them
elif [ "$1" = "-r" ] || [ "$1" = "--reset" ]; then
  echo -e "mzk.sh $1 : Reset ManaZeak instance\n"
  # Warn user that the command will remove database and images
  echo -e "\e[93mWARNING\e[39m This command will erase any existing database and ManaZeak's docker images"
  resetMzk="mzk" # Can't init to blank to get in while read loop
  # Wait for user to send yY/nN or blank
  while [[ "$resetMzk" != "" && "$resetMzk" != "y" && "$resetMzk" != "Y" && "$resetMzk" != "n" && "$resetMzk" != "N" ]]; do
    read -rp "        Do you want to fully reset ManaZeak? [y/N] " resetMzk
  done
  # Exit if user didn't enter anything, or entered n/N
  if [ "$resetMzk" = "" ] || [ "$resetMzk" = "n" ] || [ "$resetMzk" = "N" ]; then
    exit 0
  fi
  # Ensure all docker are stopped
  echo # Line break
  echo -e "1/4. Stopping any ManaZeak containers"
  eval "docker-compose stop"
  echo # Line break
  # Remove db_data from disk, using DB_DATA path in .env file
  echo -e "2/4. Removing the database from disk (with rm -rf $(awk -F"=" '/DB_DATA/{print $NF}' .env))"
  sudo rm -rf "$(awk -F"=" '/DB_DATA/{print $NF}' .env)"
  echo # Line break
  # Remove ManaZeak's related dockers
  echo -e "3/4. Removing ManaZeak containers"
  eval "docker-compose down -v --rmi all --remove-orphans"
  echo # Line break
  # Finally rebuild the whole thing
  echo -e "4/4. Building ManaZeak containers"
  eval "docker-compose build"
  echo -e "\n\e[32mSUCCESS\e[39m ManaZeak was properly reset!"
  echo -e "        You can now run ./mzk.sh --start [dev/prod] to start ManaZeak"


# Gource version control visualization
elif [ "$1" = '-g' ] || [ "$1" = '--gource' ]; then
  echo -e "mzk.sh $1 : Gource visualization\n"
  # Check if gource is installed on the system
  isInstalled "gource"
  # Start gource with custom parameters
  gourceOptions="--fullscreen --multi-sampling --auto-skip-seconds 0.1 --seconds-per-day 0.15 --elasticity 0.02 \
           --camera-mode overview --font-size 18 --stop-at-end --bloom-intensity 0.5 --date-format '%d %B %Y' --hide mouse,progress \
           --title 'ManaZeak - version $vers' --logo ./static/img/logo/manazeak-logo.svg --user-image-dir ./static/img/about"
  ffmpegOptions="--output-ppm-stream - | ffmpeg -y -r 60 -f image2pipe -vcodec ppm -i - -vcodec libx264 -preset medium -crf 1 -threads 0 -bf 0 mzk-git-history.mp4"
  if [ -z "$2" ]; then
    eval "gource $gourceOptions"
  else
    if [ "$2" = 'save' ]; then
      echo -e "Exporting gource visualization as a mp4 file"
      eval "gource $gourceOptions $ffmpegOptions"
    else
      echo -e "\e[31mERROR\e[39m $2 is not supported as an option"
      echo -e "      Check command help for available arguments: ./mzk.sh --help"
      exit 0
    fi
  fi

# Command help and usage
elif [ "$1" = '-h' ] || [ "$1" = '--help' ]; then
  echo -e "mzk.sh $1 : Command help\n"
  echo -e "Usage : ./mzk.sh [command] [optional argument]\n"
  echo -e "  -h, --help         Display command usage\n\n"
  echo -e "  -i, --install      Configure and install ManaZeak on the system"
  echo -e "                     Create .env file with parameters and build docker images\n"
  echo -e "  -b, --build        Build the docker containers (mostly to be used on a development environment, use --start instead in production)"
  echo -e "                     Optional argument [mvn] for selective build, global build otherwise\n"
  echo -e "  -s, --start        Start ManaZeak application"
  echo -e "                     Optional argument [dev/prod] depending on the mode you're starting ManaZeak with, will use prod if none are provided\n"
  echo -e "  -r, --reset        Remove existing database and docker images and rebuild them"
  echo -e "                     It won't remove existing .env configuration file\n\n"
  echo -e "  -g, --gource       Review git history using gource package\n"
  echo -e "                     Optional argument [save] to save visualization as a mp4 file\n"


# Provided argument is not supported by this script
else
    echo -e "mzk.sh $1 : Invalid argument\n"
    echo -e "\e[31mERROR\e[39m Your argument is invalid"
    echo -e "      Check command help for available arguments: ./mzk.sh --help\n"
fi
