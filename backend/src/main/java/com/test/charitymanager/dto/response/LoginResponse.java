package com.test.charitymanager.dto.response;

import lombok.Data;

@Data
public class LoginResponse {
  private String email;
  private String token;
}
