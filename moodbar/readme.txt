docker  build --tag ubuntu_container .
docker run -d -it -v /home/pierre/Documents/Gitlab/New\ Folder/files:/debfiles/files --name deb_container ubuntu_container
docker exec -it deb_container /bin/bash 
