#!/bin/bash
vers="1.0.1"


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


# Initialization sequence (fill .env file to fit user inputs)
if [ "$1" = "-i" ] || [ "$1" = "--init" ]; then
  echo -e "mzk.sh $1 : ManaZeak initialization\n"
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
  echo -e "\e[32mSUCCESS\e[39m ManaZeak was successfully configured!"
  echo -e "        You can now run ./mzk.sh --build then ./mzk.sh --run to start ManaZeak"


elif [ "$1" = "mvnbuild" ]; then
    echo -e "Rebuilding the java container"
    eval "docker-compose build back"
    echo "Launching the container"
    eval "docker-compose up -d back"
    eval "docker-compose logs -f back"


# Gource version control visualization
elif [ "$1" = '-g' ] || [ "$1" = '--gource' ]; then
  echo -e "mzk.sh $1 : Gource visualization\n"
  eval "gource -f -a 1 -s 0.5 -c 1.5 -e 0.1 --title 'ManaZeak - version $vers' --logo ./static/img/logo/manazeak-logo.svg --user-image-dir ./static/img/about -r 60"
  echo -e "If nothing happened, please ensure you have gource installed on your system (https://github.com/acaudwell/Gource)"


# Provided argument is not supported by this script
else
    echo -e "mzk.sh $1 : Invalid argument\n"
    echo -e "\e[31mERROR\e[39m Your argument is invalid"
    echo -e "      Check command help for available arguments: ./mzk.sh --help"
fi
