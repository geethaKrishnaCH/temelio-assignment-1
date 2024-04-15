package com.test.fundmanager.dto.request;

import lombok.Data;

@Data
public class FoundationReq {
    private String name;
    private String email;
    private String street;
    private String city;
    private String state;
    private String zipCode;
    private String country;
}
