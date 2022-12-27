package org.manazeak.manazeak.manager.library.track;

import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDbDto;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDto;

public final class TrackCompleteInfoHelper {

    private TrackCompleteInfoHelper() {

    }

    /**
     * Add the connected object to the track.
     *
     * @param trackDbInfo The information on the track collected in the database.
     * @param track       The track that will be displayed to the user.
     */
    public static void fillTrackInfo(TrackCompleteInfoDbDto trackDbInfo, TrackCompleteInfoDto track) {
        track.addComposer(trackDbInfo.getComposer());
        track.addLyricist(trackDbInfo.getLyricist());
        track.addPerformer(trackDbInfo.getPerformer());
        track.addProducer(trackDbInfo.getProducer());
        track.addEngineer(trackDbInfo.getEngineer());
        track.addGenre(trackDbInfo.getGenre());
        track.addKey(trackDbInfo.getKey());
    }

}
