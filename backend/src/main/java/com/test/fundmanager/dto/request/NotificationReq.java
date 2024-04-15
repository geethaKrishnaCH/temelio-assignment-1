package com.test.fundmanager.dto.request;

import lombok.Data;

import java.util.List;

@Data
public class NotificationReq {
    private List<Integer> nonProfitIds;
}
