package com.test.fundmanager.controller;

import com.test.fundmanager.dto.request.FoundationReq;
import com.test.fundmanager.dto.response.FoundationRes;
import com.test.fundmanager.service.FoundationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/foundations")
@CrossOrigin(origins = {"http://localhost:5173"})
@AllArgsConstructor
public class FoundationController {
    private final FoundationService foundationService;

    @GetMapping()
    public ResponseEntity<?> foundations() {
        try {
            List<FoundationRes> result = foundationService.getAllFoundations();
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping()
    public ResponseEntity<?> addFoundation(@RequestBody FoundationReq req) {
        try {
            foundationService.addFoundation(req);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

}
