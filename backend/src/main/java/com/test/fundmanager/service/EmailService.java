package com.test.fundmanager.service;

import com.test.fundmanager.model.NonProfit;
import freemarker.template.Configuration;
import freemarker.template.Template;
import freemarker.template.TemplateException;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.Map;

@Service
@AllArgsConstructor
public class EmailService {
    private final Configuration freemarkerConfiguration;

    public String sendGrantNotificationEmail(NonProfit nonProfit) throws IOException, TemplateException {

        Template template = freemarkerConfiguration.getTemplate("grant_notification_template.ftl");

        Map<String, Object> data = new HashMap<>();
        data.put("name", nonProfit.getName());

        data.put("address", nonProfit.getAddress());

        StringWriter out = new StringWriter();
        template.process(data, out);
        String emailContent = out.toString();

        // Prepare and send email
        System.out.println(emailContent);

        return emailContent;
    }
}
