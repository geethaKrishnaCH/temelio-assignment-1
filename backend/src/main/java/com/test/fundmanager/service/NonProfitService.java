package com.test.fundmanager.service;

import com.test.fundmanager.dto.request.NonProfitReq;
import com.test.fundmanager.dto.response.NonProfitRes;
import com.test.fundmanager.model.Address;
import com.test.fundmanager.model.Foundation;
import com.test.fundmanager.model.NonProfit;
import com.test.fundmanager.repo.AddressRepository;
import com.test.fundmanager.repo.FoundationRepository;
import com.test.fundmanager.repo.NonProfitRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class NonProfitService {
    private final NonProfitRepository nonProfitRepository;
    private final AddressRepository addressRepository;
    private final FoundationRepository foundationRepository;

    public List<NonProfitRes> getAllNonProfits() {
        List<NonProfit> nonProfits = nonProfitRepository.findAll();
        return nonProfits.stream().map(np -> NonProfitRes.builder()
                .id(np.getId())
                .name(np.getName())
                .email(np.getEmail())
                .address(np.getAddress())
                .foundation(np.getFoundation().getName())
                .foundationId(np.getFoundation().getId())
                .build()).collect(Collectors.toList());
    }

    public void addNonProfit(NonProfitReq req) throws Exception {
        NonProfit existingNonProfit = nonProfitRepository.findByEmail(req.getEmail());
        if (existingNonProfit != null) {
            throw new Exception("Non-profit already exists");
        }

        Optional<Foundation> foundationOpt = foundationRepository.findById(req.getFoundation());
        if (foundationOpt.isEmpty()) {
            throw new Error("Foundation not found");
        }
        Foundation foundation = foundationOpt.get();
        Address address = Address.builder()
                .street(req.getStreet())
                .city(req.getCity())
                .state(req.getState())
                .zipCode(req.getZipCode())
                .country(req.getCountry())
                .build();
        addressRepository.save(address);
        NonProfit nonProfit = NonProfit.builder()
                .name(req.getName())
                .email(req.getEmail())
                .foundation(foundation)
                .address(address)
                .build();

        nonProfitRepository.save(nonProfit);
    }
}
