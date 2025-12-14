package org.manazeak.manazeak.controller.rest.playlist;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.entity.dto.kommunicator.KommunicatorDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistCreationDto;
import org.manazeak.manazeak.mapper.gobal.LibraryItemMapper;
import org.manazeak.manazeak.service.message.KommunicatorService;
import org.manazeak.manazeak.service.playlist.PlaylistService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
public class PlaylistRestController {

    private final PlaylistService playlistService;

    private final KommunicatorService kommunicatorService;
    private final LibraryItemMapper libraryItemMapper;


    /**
     * Create a playlist in the database for the user.
     *
     * @param playlistCreation The information on the playlist to be created.
     * @return The status of the playlist creation.
     */
    @PostMapping("/playlist/create/")
    @Security(PrivilegeEnum.PLAY)
    public KommunicatorDto createPlaylist(@RequestBody PlaylistCreationDto playlistCreation) {
        // Creating the playlist.
        playlistService.createPlaylist(playlistCreation);
        // Sending the response to the front.
        return kommunicatorService.buildSuccessKom("general.notification.success_title", "playlist.creation.success_message");
    }

    /**
     * Allows deleting a playlist in the database.
     *
     * @param playlistId The playlist identifier.
     * @return The status of the playlist deletion.
     */
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
    @DeleteMapping("/playlist/{playlistId}/track/{trackId}/")
    public KommunicatorDto deletePlaylistTrack(@PathVariable Long playlistId, @PathVariable Long trackId) {
        playlistService.deletePlaylistTrack(playlistId, trackId);
        return kommunicatorService.buildSuccessKom("general.notification.success_title", "playlist.track.delete");
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
