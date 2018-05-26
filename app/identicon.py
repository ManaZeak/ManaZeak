""" This module contains a simple identicon creation utility function.
    Original color palette : coolors.co/659bd8-ff776d-ffd793-9eefae-c99dba
"""
import hashlib
import random
import png  # requires pypng

palette = {0: (255, 255, 255),
           1: (101, 155, 216),
           2: (255, 119, 109),
           3: (255, 215, 147),
           4: (158, 239, 174),
           5: (201, 157, 186)}


def create_identicon(username, filename, avatar_size=5, img_size_per_cell=100):
    """ Creates and writes an identicon to disk
        Arguments:
            - (str) username: username for which the identicon should
                              be created (is used as seed)
            - (str) filename: file to which the image shoould be written
            - (int) avatar_size: avatars will be squares of avatar_size
                                 squares wide and tall
            - (int) img_size_per_cell: number of pixels for the width and
                                       height of each square in the avatar
    """
    # hashing username to use as seed
    username_hash = hashlib.md5(username.encode("utf-8"))
    random.seed(username_hash.hexdigest())
    # selecting random color among the 5 defined colors
    color = random.randint(1, 5)

    # the avatar should be symmetrical so we create the left
    # half of the avatar as a binary matrix. The 1s will be
    # colored in and the 0s will be white
    avatar_base_width = (avatar_size + 2) // 2 + avatar_size % 2
    # creating first blank row to give a little padding space
    avatar_base = [[0 for i in range(avatar_base_width)]]
    # creating actual avatar
    avatar_base += [[0] +  # blank left column for padding
                    [random.randint(0, 1)
                     for i in range(avatar_base_width - 1)]
                    for j in range(avatar_size)]
    # creating last blank row (padding space)
    avatar_base += [[0 for i in range(avatar_base_width)]]

    # creating full-width binary version of avatar
    avatar_bin = [[row[i] if i < avatar_base_width
                   else row[avatar_size + 1 - i]  # copying symmetrically
                   for i in range(avatar_size + 2)]
                  for row in avatar_base]

    # creating actual RGB avatar
    # color is in [1;5]. If pixel is 0, color*pixel = 0 and palette[0] = white
    # If pixel is 1, color*pixel = color and palette[color] = some color
    avatar = [[palette[color * pixel] for pixel in row] for row in avatar_bin]
    avatar = _resize_avatar(avatar, avatar_size, img_size_per_cell)
    png.from_array(avatar, 'RGB').save(filename)


def _resize_avatar(avatar, avatar_size, img_size_per_cell):
    """ Resizes avatars in a nearest-neighbor fashion copying rowsand columns
        Arguments:
            - (list<list<(int, int, int)>>) avatar:
                    the avatar to resize
            - (int) avatar_size: avatars will be squares of avatar_size
                                 squares wide and tall
            - (int) img_size_per_cell: number of pixels for the width and
                                       height of each square in the avatar
    """
    img_size = img_size_per_cell * (avatar_size + 2)
    return [[avatar[i // img_size_per_cell][j // img_size_per_cell]
             for j in range(img_size)]
            for i in range(img_size)]
