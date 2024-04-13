// package com.test.charitymanager.config;

// import org.springframework.context.annotation.Bean;
// import org.springframework.context.annotation.Configuration;
// import org.springframework.security.authentication.AuthenticationManager;
// import
// org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
// import
// org.springframework.security.config.annotation.web.builders.HttpSecurity;
// import
// org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
// import org.springframework.security.crypto.password.PasswordEncoder;
// import org.springframework.security.web.SecurityFilterChain;

// import lombok.AllArgsConstructor;

// @Configuration
// @EnableWebSecurity
// @AllArgsConstructor
// public class SecurityConfig {
// private final CustomUserDetialsService userDetialsService;

// @Bean
// AuthenticationManager authenticationManager(HttpSecurity httpSecurity,
// PasswordEncoder passwordEncoder)
// throws Exception {
// AuthenticationManagerBuilder builder =
// httpSecurity.getSharedObject(AuthenticationManagerBuilder.class);
// builder.userDetailsService(userDetialsService).passwordEncoder(passwordEncoder);
// return builder.build();
// }

// SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) {
// httpSecurity.csrf().disable()
// .authorizeRequests()
// .requestMatchers("/api/auth/**")
// .anyRequest().authen
// }
// }
