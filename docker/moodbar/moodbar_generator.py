#!/usr/bin/env python3
# coding: utf-8

import os
from datetime import datetime
from hashlib import md5
from multiprocessing import Pool
from os.path import join
from shlex import quote
import time

LIBRARY_FOLDER = '/library'
MOODBAR_FOLDER = '/moodbar/static'
MAX_PROCESSES = 3
DATE_FORMAT = "%Y-%m-%d %H:%M:%S"


def generate_moodbar(file):
    filename_md5 = md5(file.encode("ascii", "ignore")).hexdigest()
    moodfile_path = join(MOODBAR_FOLDER, '{}.mood'.format(filename_md5))
    if not os.path.exists(moodfile_path):
        os.system('moodbar {} -o {}'.format(quote(file), moodfile_path))


def list_songs(path):
    for root, dirs, files in os.walk(path):
        for name in files:
            if name.endswith('mp3'):
                yield join(root, name)
            elif name.endswith('flac'):
                yield join(root, name)


def scan():
    start_time = datetime.now()
    print("[SCAN] {} - Starting ...".format(start_time.strftime(DATE_FORMAT)))

    with Pool(processes=MAX_PROCESSES) as p:
        p.map(generate_moodbar, list_songs(LIBRARY_FOLDER))

    end_time = datetime.now()
    running_time = (end_time - start_time).seconds
    running_time_str = "({}m{}s)".format(running_time // 60, running_time % 60)
    print("[SCAN] {} - Done in {} !".format(end_time.strftime(DATE_FORMAT),
                                            running_time_str))


def main():
    print("LIBRARY_FOLDER : {}".format(LIBRARY_FOLDER))
    print("MOODBAR_FOLDER : {}".format(MOODBAR_FOLDER))
    print("MAX_PROCESSES  : {}".format(MAX_PROCESSES))

    scan()  # Start scan

    # Execute the scan and wait 3600 seconds (1h) before scanning again
    while True:
        time.sleep(3600)
        scan()


if __name__ == '__main__':
    main()
