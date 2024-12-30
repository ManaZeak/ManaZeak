package org.manazeak.manazeak.controller.fragment.playlist;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.playlist.PlaylistFragmentEnum;
import org.manazeak.manazeak.entity.dto.playlist.PlaylistAsideDto;
import org.manazeak.manazeak.service.playlist.PlaylistService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

import java.util.List;


@FragmentController
@RequiredArgsConstructor
public class PlaylistController {

    private final PlaylistService playlistService;


    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/playlist/aside")
    public String getPlaylistAside(Model model) {
        List<PlaylistAsideDto> playlistsAsideInfo = playlistService.getPlaylistsAsideInfo();
        model.addAttribute("playlists", playlistsAsideInfo);
        return PlaylistFragmentEnum.PLAYLIST_ASIDE.getPage();
    }

}
