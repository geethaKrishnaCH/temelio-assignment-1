// package com.test.charitymanager.config;

// import org.springframework.security.core.userdetails.UserDetails;
// import org.springframework.security.core.userdetails.UserDetailsService;
// import
// org.springframework.security.core.userdetails.UsernameNotFoundException;
// import org.springframework.stereotype.Service;

// import com.test.charitymanager.model.Role;
// import com.test.charitymanager.model.User;
// import com.test.charitymanager.repo.UserRepository;

// import lombok.AllArgsConstructor;

// @Service
// @AllArgsConstructor
// public class CustomUserDetialsService implements UserDetailsService {

// private final UserRepository userRepository;

// @Override
// public UserDetails loadUserByUsername(String email) throws
// UsernameNotFoundException {
// User user = userRepository.findByEmail(email);
// Role role = user.getRole();
// String[] roles = { role.getName() };
// return org.springframework.security.core.userdetails.User.builder()
// .username(user.getEmail())
// .password(user.getPassword())
// .roles(roles)
// .build();
// }

// }
