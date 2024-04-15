package com.test.fundmanager.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GrantNotification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    @ManyToOne
    @JoinColumn(name = "non_profit_id")
    private NonProfit nonProfit;
    @ManyToOne
    @JoinColumn(name = "foundation_id")
    private Foundation foundation;
    private String emailContent;
}
