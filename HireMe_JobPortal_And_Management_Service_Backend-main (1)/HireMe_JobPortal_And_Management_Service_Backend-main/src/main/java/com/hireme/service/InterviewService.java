package com.hireme.service;

import com.hireme.model.Interview;
import com.hireme.model.Application.Application;
import com.hireme.repository.ApplicationRepository;
import com.hireme.repository.InterviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class InterviewService {

    @Autowired
    private InterviewRepository interviewRepository;

    @Autowired
    private ApplicationRepository applicationRepository;

    public Interview scheduleInterview(Long applicationId, String scheduledDate, String location) {
        Application application = applicationRepository.findById(applicationId).orElse(null);
        if (application == null) {
            return null;
        }
        String status = application.getApplicationStatus();
        if (!status.equals("SHORTLISTED") && !status.equals("INTERVIEW")) {
            return null;
        }
        Interview interview = new Interview();
        interview.setApplicationId(applicationId);
        interview.setScheduledDate(scheduledDate);
        interview.setLocation(location);
        interview.setInterviewStatus("SCHEDULED");
        return interviewRepository.save(interview);
    }

    public List<Interview> getInterviewsByApplication(Long applicationId) {
        return interviewRepository.findByApplicationId(applicationId);
    }
}