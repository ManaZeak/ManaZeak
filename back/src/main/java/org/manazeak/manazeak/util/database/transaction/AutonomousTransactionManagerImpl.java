package org.manazeak.manazeak.util.database.transaction;

import lombok.RequiredArgsConstructor;
import org.manazeak.manazeak.annotations.MockableComponent;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.TransactionCallbackWithoutResult;
import org.springframework.transaction.support.TransactionTemplate;

@MockableComponent
@RequiredArgsConstructor
public class AutonomousTransactionManagerImpl implements AutonomousTransactionManager {
    private final PlatformTransactionManager transactionManager;

    @Override
    public void runInTransaction(final Runnable runnable) {
        // On fait le calcul de l'éligibilité dans une transaction séparée, pour éviter d'avoir à le refaire en cas de plantage de l'envoi
        TransactionTemplate transactionTemplate = new TransactionTemplate(transactionManager);
        transactionTemplate.setPropagationBehavior(TransactionDefinition.PROPAGATION_REQUIRES_NEW);
        transactionTemplate.execute(new TransactionCallbackWithoutResult() {
            @Override
            protected void doInTransactionWithoutResult(final TransactionStatus status) {
                runnable.run();
            }
        });
    }

}
