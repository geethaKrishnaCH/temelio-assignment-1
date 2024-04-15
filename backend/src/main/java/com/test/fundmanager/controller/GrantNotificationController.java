package com.test.fundmanager.controller;

import com.test.fundmanager.dto.request.NotificationReq;
import com.test.fundmanager.dto.response.GrantNotificationRes;
import com.test.fundmanager.service.GrantNotificationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "api/grant-notifications")
@CrossOrigin(origins = {"http://localhost:5173"})
@AllArgsConstructor
public class GrantNotificationController {

    private final GrantNotificationService grantNotificationService;

    // all notifications with filters applied
    @GetMapping
    public ResponseEntity<?> notifications(@RequestParam(value = "non-profit", required = false) Integer nonProfitId, @RequestParam(value = "foundation", required = false) Integer foundationId) {
        try {
            List<GrantNotificationRes> result = grantNotificationService.getAllNotifications(foundationId, nonProfitId);
            return new ResponseEntity<>(result, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // send a notification to non-profit
    @PostMapping()
    public ResponseEntity<?> notify(@RequestBody NotificationReq req) {
        try {
            grantNotificationService.sendNotifications(req);
            return new ResponseEntity<>(HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
