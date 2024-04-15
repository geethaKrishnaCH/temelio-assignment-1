package com.test.fundmanager.controller;

import com.test.fundmanager.dto.request.NonProfitReq;
import com.test.fundmanager.dto.response.NonProfitRes;
import com.test.fundmanager.service.NonProfitService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/non-profits")
@CrossOrigin(origins = {"http://localhost:5173"})
@AllArgsConstructor
public class NonProfitController {

    private final NonProfitService nonProfitService;

    @GetMapping()
    public ResponseEntity<?> nonProfits() {
        try {
            List<NonProfitRes> result = nonProfitService.getAllNonProfits();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<?> addNonProfit(@RequestBody NonProfitReq req) {
        try {
            nonProfitService.addNonProfit(req);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
