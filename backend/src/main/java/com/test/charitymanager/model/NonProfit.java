package com.test.charitymanager.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

import lombok.Data;

@Entity
@Data
public class NonProfit {
  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  private int id;
  private String name;
  private String email;
  @OneToOne
  @JoinColumn(name = "address_id")
  private Address address;
  @ManyToOne
  @JoinColumn(name = "foundation_id")
  private Foundation foundation;
}
