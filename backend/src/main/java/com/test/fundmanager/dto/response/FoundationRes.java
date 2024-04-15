package com.test.fundmanager.dto.response;

import com.test.fundmanager.model.Address;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class FoundationRes {
  private int id;
  private String name;
  private String email;
  private Address address;

}
