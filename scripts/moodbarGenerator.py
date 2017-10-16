import hashlib
import time

import os


def scan():
    # TODO: put correct path
    # TODO: the moodbar docker must have the SAME architecture as the manazeak one.
    moods = []
    count = 0
    print("starting scanning")
    for root, dirs, files in os.walk("/moodbar/static/"):
        for file in files:
            moods.append(file[:-4])
    for root, dirs, files in os.walk("/library/"):
        for file in files:
            path = os.path.join(root, file)
            md5 = hashlib.md5(path).hexdigest()
            count += 1
            if md5 not in moods:
                command = 'moodbar \"' + path + '\" -o ' + md5 + '.mood'
                os.system(command)
    print("finished scanning")
    return count


def countFile():
    count = 0
    for root, dirs, files in os.walk("/library/"):
        for _ in files:
            count += 1
    return count


def main():
    totalFiles = scan()
    while True:
        if totalFiles != countFile():
            totalFiles = scan()
        time.sleep(600)


if __name__ == "__main__":
    main()
