import abc


class AbstractStatsDao(object, metaclass=abc.ABCMeta):

    # FIXME: finir l'abstract des stats => implémenter ça
    # -- Requète pour recup le nombre de disques.
    # SELECT count("discNumber") FROM (SELECT album_id, "discNumber" FROM app_library
    #    JOIN app_playlist ap on app_library.playlist_id = ap.id
    #    JOIN app_playlist_tracks apt on ap.id = apt.playlist_id
    #    join app_track a on apt.track_id = a.id
    #    join app_album aa on a.album_id = aa.id group by album_id, "discNumber") albums;

    # -- Requète pour recup le nombre de tracks dans une lib.
    # SELECT count(1) totalTrack FROM app_library
    #    JOIN app_playlist ap on app_library.playlist_id = ap.id
    #    JOIN app_playlist_tracks apt on ap.id = apt.playlist_id
    #    join app_track a on apt.track_id = a.id;

    # -- Requète pour recup les sommes sur les tracks
    # SELECT sum("bitRate") bitRateSum,
    #       sum("sampleRate") sampleRateSum,
    #   sum(duration) durationSum,
    #   sum(bpm) bpmSum
    # FROM app_library
    #    JOIN app_playlist ap on app_library.playlist_id = ap.id
    # JOIN app_playlist_tracks apt on ap.id = apt.playlist_id
    # join app_track a on apt.track_id = a.id;

    # -- Requête pour recup le nombre de flac.
    # SELECT count(1) FROM app_library
    #    JOIN app_playlist ap on app_library.playlist_id = ap.id
    #    JOIN app_playlist_tracks apt on ap.id = apt.playlist_id
    #    join app_track a on apt.track_id = a.id
    # WHERE "fileType_id" = 2;

    @staticmethod
    @abc.abstractmethod
    ## Generate the request for the DAO to count the number of discs.
    #   @param scopeObjectId the object considered as an entry point for the scope.
    def countDiscNumber(scopeObjectId):
        raise NotImplementedError('The function needs an override.')

    @staticmethod
    @abc.abstractmethod
    ## Generate the request for the DAO to count the number of tracks in the scope.
    #   @param scopeObjectId the object considered as an entry point for the scope.
    def countTrackNumber(scopeObjectId):
        raise NotImplementedError('The function needs an override.')

    @staticmethod
    @abc.abstractmethod
    ## Generate the request for the DAO to sum the data contained in the tracks.
    #   @param scopeObjectId the object considered as an entry point for the scope.
    def sumInfoOnTracks(scopeObjectId):
        raise NotImplementedError('The function needs an override.')

    @staticmethod
    @abc.abstractmethod
    ## Generate the request for the DAO to count the number of flac files in a scope.
    #   @param scopeObjectId the object considered as an entry point for the scope.
    def countFlacNumber(scopeObjectId):
        raise NotImplementedError('The function needs an override.')
