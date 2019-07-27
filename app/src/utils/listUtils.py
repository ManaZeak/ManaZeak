## Util class for list manipulation
class ListUtils(object):

    @staticmethod
    ## Converts a set into a list and then create chunks of the given length
    #   Warning this function doesn't keep order in the set.
    #   @param objectSet the set to split.
    #   @param length the length of the chunks.
    #   @return a list of chunks.
    def chunksSet(objectSet, length):
        listToSplit = list(objectSet)
        return ListUtils.chunks(listToSplit, length)

    @staticmethod
    ## Yield sub-table of a table of the given length
    #   @param tracks the table to split
    #   @param length the length of the chunks
    #   @return chunks of the table of the length
    def chunks(tracks, length):
        # For item i in a range that is a length of length,
        for i in range(0, len(tracks), length):
            # Create an index range for l of n items:
            yield tracks[i:i + length]
