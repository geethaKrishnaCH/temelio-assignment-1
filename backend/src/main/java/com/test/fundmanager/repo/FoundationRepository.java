package com.test.fundmanager.repo;

import com.test.fundmanager.model.Foundation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FoundationRepository extends JpaRepository<Foundation, Integer> {
    Foundation findByEmail(String email);
}
