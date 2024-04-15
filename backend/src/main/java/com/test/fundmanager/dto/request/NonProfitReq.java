package com.test.fundmanager.dto.request;

import lombok.Data;

@Data
public class NonProfitReq {
    private String name;
    private String email;
    private Integer foundation;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String country;
}
