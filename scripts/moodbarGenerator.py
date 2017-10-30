import hashlib
import multiprocessing
import threading
import time

import os


# Split a table in 4 table of equal size
def splitTable(table, number):
    print("echo splitting the table")
    if len(table) % number == 0:
        chunkSize = int(len(table) / number)
    else:
        chunkSize = int(len(table) / number) + 1
    for i in range(0, len(table), chunkSize):
        yield table[i:i + chunkSize]


class ScanThread(threading.Thread):
    def __init__(self, files, moods):
        threading.Thread.__init__(self)
        self.files = files
        self.moods = moods
        self.count = 0

    def run(self):
        for file in self.files:
            md5Path = "./static/"
            pathUTF8 = file.decode("utf-8")
            path = pathUTF8.encode("ascii", "ignore")
            md5 = hashlib.md5(path).hexdigest()
            md5Path += md5
            self.count += 1
            if md5 not in self.moods:
                command = 'moodbar \"' + file + '\" -o ' + md5Path + '.mood'
                os.system(command)


def scan():
    # TODO: put correct path
    # TODO: the moodbar docker must have the SAME architecture as the manazeak one.
    moods = []
    count = 0
    print("starting scanning")
    for root, dirs, files in os.walk("/moodbar/static/"):
        for file in files:
            moods.append(file[:-5])
    filesScanned = []
    print("starting scanning2")
    for root, dirs, files in os.walk("/library/"):
        for file in files:
            filesScanned.append(os.path.join(root, file))
    print("starting creating thread")
    threads = []
    splicedFiles = splitTable(filesScanned, multiprocessing.cpu_count())
    for filePaths in splicedFiles:
        threads.append(ScanThread(filePaths, moods))
    for thread in threads:
        thread.start()
    for thread in threads:
        thread.join()
        count += thread.count
    print("finished scanning")
    return count


def countFile():
    count = 0
    for root, dirs, files in os.walk("/library/"):
        for _ in files:
            count += 1
    return count


def removeAll():
    for root, dirs, files in os.walk("/moodbar/static/"):
        for file in files:
            path = os.path.join(root, file)
            os.remove(path)


def main():
    totalFiles = scan()
    count = 0
    while True:
        if totalFiles != countFile():
            totalFiles = scan()
        time.sleep(600)
        count += 1
        if count == 1008:  # Regenerating all moodbar every week
            count = 0
            totalFiles = 0
            removeAll()


if __name__ == "__main__":
    main()


