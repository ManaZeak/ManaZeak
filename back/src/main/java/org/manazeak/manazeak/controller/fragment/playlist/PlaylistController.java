package org.manazeak.manazeak.controller.fragment.playlist;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.playlist.PlaylistFragmentEnum;
import org.manazeak.manazeak.entity.dto.library.track.TrackCompleteInfoDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistAsideDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistCreationDto;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistInfoDto;
import org.manazeak.manazeak.service.playlist.PlaylistService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.List;


@FragmentController
@RequiredArgsConstructor
public class PlaylistController {

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
     * Get the all the tracks of a playlist.
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
