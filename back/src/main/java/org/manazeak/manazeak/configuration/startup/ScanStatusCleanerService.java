package org.manazeak.manazeak.configuration.startup;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.manazeak.manazeak.annotations.TransactionalWithRollback;
import org.manazeak.manazeak.exception.MzkRuntimeException;
import org.manazeak.manazeak.manager.library.status.LibraryScanStatusManager;
import org.springframework.beans.factory.InitializingBean;
import org.springframework.stereotype.Service;

@Service
@TransactionalWithRollback
@RequiredArgsConstructor
@Slf4j
public class ScanStatusCleanerService implements InitializingBean {

    private final LibraryScanStatusManager scanStatusManager;

    /**
     * If the application was killed during a scan, this scan will be marked as terminated.
     */
    @Override
    public void afterPropertiesSet() {
        try {
            scanStatusManager.endLibraryScan();
        } catch (MzkRuntimeException e) {
            log.info("No scan where cleaned at the startup.");
        }
    }
}
