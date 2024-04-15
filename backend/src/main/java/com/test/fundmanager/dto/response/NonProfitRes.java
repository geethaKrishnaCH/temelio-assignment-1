package com.test.fundmanager.dto.response;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.test.fundmanager.model.Address;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@JsonInclude(JsonInclude.Include.NON_NULL)
public class NonProfitRes {
    private int id;
    private String name;
    private String email;
    private Address address;
    private String foundation;
    private Integer foundationId;
}
