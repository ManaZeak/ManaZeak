from enum import unique, Enum


@unique
## This enum represents the benches available for the scan of the library.
class ScanBench(Enum):
    ## The total time of the scan.
    TOTAL = 'TOTAL',
