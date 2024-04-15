package com.test.fundmanager.repo;

import com.test.fundmanager.model.NonProfit;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface NonProfitRepository extends JpaRepository<NonProfit, Integer> {
    NonProfit findByEmail(String email);

    List<NonProfit> findByIdIn(List<Integer> nonProfitIds);
}
