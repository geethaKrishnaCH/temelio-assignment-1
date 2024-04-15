package com.test.fundmanager.service;

import com.test.fundmanager.dto.request.NotificationReq;
import com.test.fundmanager.dto.response.GrantNotificationRes;
import com.test.fundmanager.model.Foundation;
import com.test.fundmanager.model.GrantNotification;
import com.test.fundmanager.model.NonProfit;
import com.test.fundmanager.repo.FoundationRepository;
import com.test.fundmanager.repo.GrantNotificationRepository;
import com.test.fundmanager.repo.NonProfitRepository;
import freemarker.template.TemplateException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class GrantNotificationService {
    private final GrantNotificationRepository grantNotificationRepository;
    private final NonProfitRepository nonProfitRepository;
    private final FoundationRepository foundationRepository;
    private final EmailService emailService;

    public List<GrantNotificationRes> getAllNotifications(Integer foundationId, Integer nonProfitId) throws Exception {
        List<GrantNotification> notifications;
        Foundation existingFoundation = null;
        NonProfit existingNonProfit = null;
        if (foundationId != null) {
            Optional<Foundation> existingFoundationOpt = foundationRepository.findById(foundationId);
            if (existingFoundationOpt.isEmpty()) {
                throw new Exception("Foundation does not exist");
            }
            existingFoundation = existingFoundationOpt.get();
        }
        if (nonProfitId != null) {
            Optional<NonProfit> existingNonProfitOpt = nonProfitRepository.findById(nonProfitId);
            if (existingNonProfitOpt.isEmpty()) {
                throw new Exception("Non-Profit does not exist");
            }
            existingNonProfit = existingNonProfitOpt.get();
        }
        if (foundationId == null && nonProfitId == null) {
            notifications = grantNotificationRepository.findAll();
        } else if (foundationId == null && nonProfitId != null) {
            notifications = grantNotificationRepository.findByNonProfit(existingNonProfit);
        } else if (foundationId != null && nonProfitId == null) {
            notifications = grantNotificationRepository.findByFoundation(existingFoundation);
        } else {

            notifications = grantNotificationRepository.findByFoundationAndNonProfit(existingFoundation, existingNonProfit);
        }
        if (notifications == null) return new ArrayList<>();
        return notifications.stream().map(n -> GrantNotificationRes.builder()
                .id(n.getId())
                .foundation(n.getFoundation().getName())
                .nonProfit(n.getNonProfit().getName())
                .email(n.getEmailContent())
                .build()).collect(Collectors.toList());
    }

    public void sendNotifications(NotificationReq req) throws TemplateException, IOException {

        List<NonProfit> nonProfitList = nonProfitRepository.findByIdIn(req.getNonProfitIds());
        for (NonProfit nonProfit : nonProfitList) {
            String emailContent = emailService.sendGrantNotificationEmail(nonProfit);
            GrantNotification grantNotification = GrantNotification.builder()
                    .foundation(nonProfit.getFoundation())
                    .nonProfit(nonProfit)
                    .emailContent(emailContent)
                    .build();
            grantNotificationRepository.save(grantNotification);
        }
    }
}
