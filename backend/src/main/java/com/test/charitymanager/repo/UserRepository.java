package com.test.charitymanager.repo;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.test.charitymanager.model.User;

@Repository
public interface UserRepository extends JpaRepository<User, Integer> {
  User findByEmail(String email);
}
