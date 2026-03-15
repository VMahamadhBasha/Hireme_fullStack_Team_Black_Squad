package com.hireme.service;

import com.hireme.model.Application.Application;
import com.hireme.repository.ApplicationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.time.LocalDate;
import java.util.List;

@Service
public class ApplicationService {

    @Autowired
    private ApplicationRepository applicationRepository;

    public Application applyForJob(Long candidateId, Long jobId, String coverLetter) {
        boolean alreadyApplied = applicationRepository.existsByCandidateIdAndJobId(candidateId, jobId);
        if (alreadyApplied) {
            return null;
        }
        Application application = new Application();
        application.setCandidateId(candidateId);
        application.setJobId(jobId);
        application.setCoverLetter(coverLetter);
        application.setApplyDate(LocalDate.now().toString());
        application.setApplicationStatus("APPLIED");
        return applicationRepository.save(application);
    }

    public List<Application> getApplicationsByCandidate(Long candidateId) {
        return applicationRepository.findByCandidateId(candidateId);
    }

    public List<Application> getApplicationsByJob(Long jobId) {
        return applicationRepository.findByJobId(jobId);
    }

    public List<Application> getAllApplications() {
        return applicationRepository.findAll();
    }

    public Application updateStatus(Long id, String status) {
        Application application = applicationRepository.findById(id).orElse(null);
        if (application != null) {
            application.setApplicationStatus(status);
            return applicationRepository.save(application);
        }
        return null;
    }
}