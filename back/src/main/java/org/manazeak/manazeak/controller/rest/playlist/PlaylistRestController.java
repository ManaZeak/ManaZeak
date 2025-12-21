package org.manazeak.manazeak.controller.rest.playlist;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistTrackMoveDto;
import org.manazeak.manazeak.mapper.gobal.LibraryItemMapper;
import org.manazeak.manazeak.service.message.KommunicatorService;
import org.manazeak.manazeak.service.playlist.PlaylistAsideService;
import org.manazeak.manazeak.service.playlist.PlaylistService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class PlaylistRestController {

    private final PlaylistService playlistService;

    private final PlaylistAsideService playlistAsideService;

    private final KommunicatorService kommunicatorService;

    private final LibraryItemMapper libraryItemMapper;

    /**
     * Allows deleting a playlist in the database.
     *
     * @param playlistId The playlist identifier.
     * @return The status of the playlist deletion.
     */
    @Security(PrivilegeEnum.PLAY)
    @DeleteMapping("/playlist/{playlistId}/")
    public KommunicatorDto deletePlaylist(@PathVariable Long playlistId) {
        playlistService.deletePlaylist(playlistId);
        return kommunicatorService.buildSuccessKom("general.notification.success_title", "playlist.delete");
    }

    /**
     * Allows deleting a track from a playlist in the database.
     *
     * @param playlistId The identifier of the playlist.
     * @param trackId    The identifier of the track.
     * @return The status of the track removal from the playlist.
     */
    @Security(PrivilegeEnum.PLAY)
    @DeleteMapping("/playlist/{playlistId}/track/{trackId}/")
    public KommunicatorDto deletePlaylistTrack(@PathVariable Long playlistId, @PathVariable Long trackId) {
        playlistService.deletePlaylistTrack(playlistId, trackId);
        return kommunicatorService.buildSuccessKom("general.notification.success_title", "playlist.track.delete");
    }

    /**
     * Move a list of tracks to a different position in the playlist.
     *
     * @param playlistId    The identifier of the playlist.
     * @param tracksMoveDto The information on the tracks to move.
     * @return A success message.
     */
    @Security(PrivilegeEnum.PLAY)
    @PatchMapping("/playlist/{playlistId}/move/")
    public KommunicatorDto moveTracks(@PathVariable Long playlistId, @RequestBody PlaylistTrackMoveDto tracksMoveDto) {
        playlistService.movePlaylistTracks(playlistId, tracksMoveDto);
        return kommunicatorService.buildSuccessKom("general.notification.success_title", "playlist.track.moved");
    }

    /**
     * Adds a playlist in the aside bar.
     *
     * @param playlistId The identifier of the playlist.
     * @return A success message.
     */
    @Security(PrivilegeEnum.PLAY)
    @PostMapping("/playlist/{playlistId}/aside/")
    public KommunicatorDto addPlaylistInAside(@PathVariable Long playlistId) {
        playlistAsideService.addPlaylistInAside(playlistId);
        return kommunicatorService.buildSuccessKom("general.notification.success_title", "playlist.aside.added");
    }

    /**
     * Remove a playlist from the aside bar of a user.
     *
     * @param playlistId The identifier of the playlist to remove.
     * @return The success message.
     */
    @Security(PrivilegeEnum.PLAY)
    @DeleteMapping("/playlist/{playlistId}/aside/")
    public KommunicatorDto removePlaylistFromAside(@PathVariable Long playlistId) {
        playlistAsideService.removePlaylistInAside(playlistId);
        return kommunicatorService.buildSuccessKom("general.notification.success_title", "playlist.aside.removed");
    }

    /**
     * Change the position of a playlist in the aside bar.
     *
     * @param playlistId  The identifier of the playlist.
     * @param newPosition The new position of the playlist.
     * @return A success message.
     */
    @Security(PrivilegeEnum.PLAY)
    @PatchMapping("/playlist/{playlistId}/aside/")
    public KommunicatorDto movePlaylistInAside(@PathVariable Long playlistId, @RequestBody int newPosition) {
        playlistAsideService.movePlaylistInAside(playlistId, newPosition);
        return kommunicatorService.buildSuccessKom("general.notification.success_title", "playlist.aside.moved");
    }

    /**
     * Allows adding an item into the playlist; the item can be different types of entity contained in the database.
     *
     * @param playlistId The identifier of the playlist.
     * @param itemId     The identifier of the item in the database.
     * @param itemType   The type of item, it can be a track, an album or an artist.
     * @return The status of the request.
     */
    @PostMapping("/playlist/{playlistId}/add/{itemId}/")
    @Security(PrivilegeEnum.PLAY)
    public KommunicatorDto addItemToPlaylist(@PathVariable Long playlistId, @PathVariable Long itemId,
                                             @RequestBody String itemType) {
        // Adding the element into the playlist.
        playlistService.addItemToPlaylist(playlistId, libraryItemMapper.parseItem(itemType), itemId);
        // Sending the response to the front.
        return kommunicatorService.buildSuccessKom("general.notification.success_title", "playlist.add_item");
    }

}
