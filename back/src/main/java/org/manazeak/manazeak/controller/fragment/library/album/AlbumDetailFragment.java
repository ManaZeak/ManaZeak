package org.manazeak.manazeak.controller.fragment.library.album;

import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.configuration.security.Security;
import org.manazeak.manazeak.constant.security.PrivilegeEnum;
import org.manazeak.manazeak.constant.tag.CompilationTypeEnum;
import org.manazeak.manazeak.controller.fragment.FragmentController;
import org.manazeak.manazeak.controller.page.library.album.AlbumFragmentEnum;
import org.manazeak.manazeak.entity.dto.library.album.AlbumDetailsDto;
import org.manazeak.manazeak.service.library.album.AlbumService;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


/**
 * Display the details of an album.
 */
@FragmentController
@RequiredArgsConstructor
public class AlbumDetailFragment {

    private final AlbumService albumService;

    @Security(PrivilegeEnum.PLAY)
    @GetMapping("/library/album/{albumId}/")
    public String getAlbumDetail(@PathVariable @NotNull(message = "general.error.no_id") Long albumId,
                                 Model model) {
        // Getting the album in the database.
        AlbumDetailsDto album = albumService.getAlbumInformation(albumId);
        model.addAttribute("album", album);
        model.addAttribute("albums", albumService.getMinimalAlbumByArtistId(album.getAlbumArtistId()));
        model.addAttribute("compilationType", CompilationTypeEnum.getCompilationByCode(album.getCompilationCode()));

        return AlbumFragmentEnum.ALBUM_DETAIL.getPage();
    }
}
