package com.test.fundmanager.service;

import com.test.fundmanager.dto.request.FoundationReq;
import com.test.fundmanager.dto.response.FoundationRes;
import com.test.fundmanager.model.Address;
import com.test.fundmanager.model.Foundation;
import com.test.fundmanager.repo.AddressRepository;
import com.test.fundmanager.repo.FoundationRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class FoundationService {
    private final FoundationRepository foundationRepository;
    private final AddressRepository addressRepository;

    public List<FoundationRes> getAllFoundations() {
        List<Foundation> foundations = foundationRepository.findAll();
        return foundations.stream().map(f -> {
            return FoundationRes.builder()
                    .id(f.getId())
                    .name(f.getName())
                    .email(f.getEmail())
                    .address(f.getAddress())
                    .build();
        }).collect(Collectors.toList());
    }

    public void addFoundation(FoundationReq req) throws Exception {
        Foundation existingFoundation = foundationRepository.findByEmail(req.getEmail());
        if (existingFoundation != null) {
            throw new Exception("Foundation already exists");
        }
        Address address = Address.builder()
                .street(req.getStreet())
                .city(req.getCity())
                .state(req.getState())
                .zipCode(req.getZipCode())
                .country(req.getCountry())
                .build();
        addressRepository.save(address);
        Foundation foundation = Foundation.builder()
                .name(req.getName())
                .email(req.getEmail())
                .address(address)
                .build();

        foundationRepository.save(foundation);
    }
}
