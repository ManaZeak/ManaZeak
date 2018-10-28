import hashlib
import os
import random
import png  # requires pypng

## @package app.avatars
#  This package contains a simple avatar creation utility function.

## The color palette for the avatars
palette = {0: (255, 255, 255),
           1: (101, 155, 216),
           2: (255, 119, 109),
           3: (255, 215, 147),
           4: (158, 239, 174),
           5: (201, 157, 186)}


# Creates and writes an avatar to disk.
#   @param username the user name string.
#   @param avatarSize the avatar will be squares of avatar_size squares wide and tall.
#   @param imageSizePerCell number of pixels for the width and height of each square in the avatar
def generateAvatar(username, avatarSize=15, imageSizePerCell=50):
    username_hash = hashlib.md5(username.encode("utf-8")).hexdigest()
    avatar_path = "static/img/avatars/" + username_hash + ".png"
    # Folder creation
    if not os.path.exists(os.path.dirname(avatar_path)):
        os.makedirs(os.path.dirname(avatar_path))

    # hashing username to use as seed
    username_hash = hashlib.md5(username_hash.encode("utf-8"))
    random.seed(username_hash.hexdigest())

    # selecting random color among the 5 defined colors
    color = random.randint(1, 5)

    # the avatar should be symmetrical so we create the left half of the avatar as a binary matrix. The 1s will be
    # colored in and the 0s will be white
    avatar_base_width = (avatarSize + 2) // 2 + avatarSize % 2

    # creating first blank row to give a little padding space
    avatar_base = [[0 for i in range(avatar_base_width)]]

    # creating actual avatar
    avatar_base += [[0] +  # blank left column for padding
                    [random.randint(0, 1)
                     for i in range(avatar_base_width - 1)]
                    for j in range(avatarSize)]

    # creating last blank row (padding space)
    avatar_base += [[0 for i in range(avatar_base_width)]]

    # creating full-width binary version of avatar
    avatar_bin = [[row[i] if i < avatar_base_width
                   else row[avatarSize + 1 - i]  # copying symmetrically
                   for i in range(avatarSize + 2)]
                  for row in avatar_base]

    # creating actual RGB avatar
    # color is in [1;5]. If pixel is 0, color*pixel = 0 and palette[0] = white
    # If pixel is 1, color*pixel = color and palette[color] = some color
    avatar = [[palette[color * pixel] for pixel in row] for row in avatar_bin]
    avatar = _resizeAvatar(avatar, avatarSize, imageSizePerCell)
    png.from_array(avatar, 'RGB').save(avatar_path)
    return avatar_path


## Resize avatars in a nearest-neighbor fashion copying rowsand columns
#   @param avatar the avatar to resize
#   @param avatarSize avatar will be squares of avatar_size squares wide and tall.
#   @param imageSizePerCell number of pixels for the width and height of each square in the avatar
def _resizeAvatar(avatar, avatarSize, imageSizePerCell):
    img_size = imageSizePerCell * (avatarSize + 2)
    return [[avatar[i // imageSizePerCell][j // imageSizePerCell]
             for j in range(img_size)]
            for i in range(img_size)]
