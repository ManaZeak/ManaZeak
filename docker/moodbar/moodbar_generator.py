#!/usr/bin/env python3
# coding: utf-8

import os
from hashlib import md5
from multiprocessing import Pool
from os.path import join, getsize
from time import sleep


LIBRARY_FOLDER = '/library'
MOODBAR_FOLDER = '/moodbar/static'
MAX_PROCESSES = 3


def generate_moodbar(file):
    filename_md5 = md5(file.encode("ascii", "ignore")).hexdigest()
    moodfile_path = join(MOODBAR_FOLDER, '{}.mood'.format(filename_md5))
    # TODO: Better special chars management (quotes)
    if not os.path.exists(moodfile_path):
        os.system('moodbar "{}" -o {}'.format(file, moodfile_path))


def list_songs(path):
    for root, dirs, files in os.walk(path):
        for name in files:
            if name.endswith('mp3'):
                yield join(root, name)

def scan():
    # TODO: Display start time and running time
    print("[SCAN] Starting ...")

    with Pool(processes=MAX_PROCESSES) as p:
        p.map(generate_moodbar, list_songs(LIBRARY_FOLDER))

    print("[SCAN] Done !")

def main():
    print("LIBRARY_FOLDER : {}".format(LIBRARY_FOLDER))
    print("MOODBAR_FOLDER : {}".format(MOODBAR_FOLDER))
    print("MAX_PROCESSES  : {}".format(MAX_PROCESSES))

    scan() # Start scan

    while True: # Execute the scan and wait 3600 seconds (1h) before scanning again
        sleep(3600)
        scan()


if __name__ == '__main__':
    main()
