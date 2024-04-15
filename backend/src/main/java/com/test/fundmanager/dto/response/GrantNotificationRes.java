package com.test.fundmanager.dto.response;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class GrantNotificationRes {
    private int id;
    private String foundation;
    private String nonProfit;
    private String email;
}
