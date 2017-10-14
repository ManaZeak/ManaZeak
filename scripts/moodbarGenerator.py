import hashlib
import subprocess
import time

import os


def scan():
    # TODO: put correct path
    moods = []
    count = 0
    for root, dirs, files in os.walk("/moods/"):
        for file in files:
            moods.append(file[:-4])
    for root, dirs, files in os.walk("/sound/"):
        for file in files:
            md5 = hashlib.md5(file).hexdigest()
            count += 1
            if md5 not in moods:
                command = 'moodbar ' + os.path.join(root, file) + ' -o ' + md5 + '.mood'
                process = subprocess.Popen([command])
                process.wait()
    return count


def countFile():
    count = 0
    for root, dirs, files in os.walk("/sound/"):
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
