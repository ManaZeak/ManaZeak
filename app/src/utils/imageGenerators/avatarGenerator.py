import hashlib
import os
import random
import png


class AvatarGenerator(object):

    def __init__(self):

        self.palette = {0: (255, 255, 255),
                        1: (101, 155, 216),
                        2: (255, 119, 109),
                        3: (255, 215, 147),
                        4: (158, 239, 174),
                        5: (201, 157, 186)}

    def generateAvatar(self, username, avatarSize=15, imageSizePerCell=50):
        usernameHash = hashlib.md5(username.encode("utf-8")).hexdigest()
        avatarPath = "static/avatars/" + usernameHash + ".png"

        if not os.path.exists(os.path.dirname(avatarPath)):
            os.makedirs(os.path.dirname(avatarPath))

        usernameHash = hashlib.md5(usernameHash.encode("utf-8"))
        random.seed(usernameHash.hexdigest())

        color = random.randint(1, 5)

        avatarBaseWidth = (avatarSize + 2) // 2 + avatarSize % 2

        avatarBase = [[0 for _ in range(avatarBaseWidth)]]

        avatarBase += [[0] +
                       [random.randint(0, 1)
                        for _ in range(avatarBaseWidth - 1)]
                       for _ in range(avatarSize)]

        avatarBase += [[0 for _ in range(avatarBaseWidth)]]

        avatarBin = [[row[i] if i < avatarBaseWidth
                      else row[avatarSize + 1 - i]
                      for i in range(avatarSize + 2)]
                     for row in avatarBase]

        avatar3d = [[self.palette[color * pixel]
                    for pixel in row] for row in avatarBin]
        avatar3d = self._resizeAvatar(avatar3d, avatarSize, imageSizePerCell)

        avatar = []
        for row in avatar3d:
            newrow = []
            for px in row:
                newrow += list(px)
            avatar.append(newrow)

        png.from_array(avatar, 'RGB').save(avatarPath)
        return avatarPath

    @staticmethod
    def _resizeAvatar(avatar, avatarSize, imageSizePerCell):
        imgSize = imageSizePerCell * (avatarSize + 2)
        return [[avatar[i // imageSizePerCell][j // imageSizePerCell]
                 for j in range(imgSize)]
                for i in range(imgSize)]
