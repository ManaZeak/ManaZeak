package org.manazeak.manazeak.controller.fragment.playlist;

import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.fragment.JsonResponseHandler;
import org.manazeak.manazeak.controller.page.playlist.PlaylistFragmentEnum;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistAsideDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistCreationDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistEditDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistInfoDto;
import org.manazeak.manazeak.service.playlist.PlaylistService;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@FragmentController
@RequiredArgsConstructor
public class PlaylistController {

    private final JsonResponseHandler jsonResponseHandler;

    private final PlaylistService playlistService;

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/playlist/aside/")
    public String getPlaylistAside(Model model) {
        List<PlaylistAsideDto> playlistsAsideInfo = playlistService.getPlaylistsAsideInfo();
        model.addAttribute("playlists", playlistsAsideInfo);
        return PlaylistFragmentEnum.PLAYLIST_ASIDE.getPage();
    }

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/new-playlist/")
    public String getPlaylistCreationModal(Model model) {
        model.addAttribute("playlist", new PlaylistCreationDto());
        return PlaylistFragmentEnum.PLAYLIST_CREATION_MODAL.getPage();
    }

    @Security(PrivilegeEnum.PLAY)
    @PostMapping("/modal/new-playlist/")
    public String createPlaylist(@ModelAttribute("playlist") @Valid PlaylistCreationDto playlistCreation, BindingResult result,
                                 Model model) {
        // If the form is invalid, resend the modal
        if (result.hasErrors()) {
            return PlaylistFragmentEnum.PLAYLIST_CREATION_MODAL.getPage();
        }

        // Creating the playlist.
        playlistService.createPlaylist(playlistCreation);
        return jsonResponseHandler.prepareJsonSuccess("general.notification.success_title", "playlist.creation.success_message", model);
    }

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/modal/{playlistId}/edit-playlist/")
    public String getEditPlaylist(Model model, @PathVariable Long playlistId) {
        model.addAttribute("playlist", playlistService.getPlaylistEditDto(playlistId));
        return PlaylistFragmentEnum.PLAYLIST_EDIT_MODAL.getPage();
    }


    @Security(PrivilegeEnum.PLAY)
    @PutMapping("/modal/edit-playlist/")
    public String editPlaylist(@ModelAttribute("playlist") @Valid PlaylistEditDto playlistEditDto, BindingResult result,
                               Model model) {
        if (result.hasErrors()) {
            return PlaylistFragmentEnum.PLAYLIST_EDIT_MODAL.getPage();
        }

        // Update the playlist.
        playlistService.updatePlaylist(playlistEditDto);
        return jsonResponseHandler.prepareJsonSuccess("general.notification.success_title", "playlist.edit.success_message", model);
    }

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/playlist/list/")
    public String listPlaylists(Model model) {
        // Getting the available playlists for the current user.
        model.addAttribute("playlistContainer", playlistService.getPlaylists());

        return PlaylistFragmentEnum.PLAYLIST_LIST.getPage();
    }

    /**
     * Get the information containing the playlist information.
     *
     * @param model      The information needed to build the page.
     * @param playlistId The identifier of the playlist to load.
     * @return The playlist information.
     */
    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/playlist/{playlistId}/getInfo/")
    public String getPlaylistInfo(Model model, @PathVariable Long playlistId) {
        PlaylistInfoDto playlistInfo = playlistService.getPlaylistInfo(playlistId);
        model.addAttribute("playlist", playlistInfo);
        return PlaylistFragmentEnum.PLAYLIST_INFO.getPage();
    }

    /**
     * Get all the tracks of a playlist.
     *
     * @param model      The information to build the page.
     * @param playlistId The identifier of the playlist.
     * @return The tracks contained in the playlist sorted by rank.
     */
    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/playlist/{playlistId}/getTracks/")
    public String getPlaylistTracks(Model model, @PathVariable Long playlistId) {
        List<TrackCompleteInfoDto> tracks = playlistService.getPlaylistTracks(playlistId);
        model.addAttribute("tracks", tracks);
        return PlaylistFragmentEnum.PLAYLIST_TRACKS.getPage();
    }

}
