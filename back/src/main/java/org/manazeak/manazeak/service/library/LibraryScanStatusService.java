package org.manazeak.manazeak.service.library;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.daos.computation.ScanStatusDAO;
import org.manazeak.manazeak.entity.dto.library.scan.ScanStatusDto;
import org.springframework.stereotype.Service;

@TransactionalWithRollback
@Service
@RequiredArgsConstructor
public class LibraryScanStatusService {

    private final ScanStatusDAO scanStatusDAO;

    /**
     * @return Get the library scan status if there is one, return null is there is none.
     */
    public ScanStatusDto getLibraryScanStatus() {
        return scanStatusDAO.getCurrentScanStatus();
    }


}
