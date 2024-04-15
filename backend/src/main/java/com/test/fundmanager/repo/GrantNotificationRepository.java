package com.test.fundmanager.repo;

import com.test.fundmanager.model.Foundation;
import com.test.fundmanager.model.GrantNotification;
import com.test.fundmanager.model.NonProfit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GrantNotificationRepository extends JpaRepository<GrantNotification, Integer> {
    List<GrantNotification> findByFoundation(Foundation foundation);

    List<GrantNotification> findByNonProfit(NonProfit nonProfit);

    List<GrantNotification> findByFoundationAndNonProfit(Foundation foundation, NonProfit nonProfit);
}
