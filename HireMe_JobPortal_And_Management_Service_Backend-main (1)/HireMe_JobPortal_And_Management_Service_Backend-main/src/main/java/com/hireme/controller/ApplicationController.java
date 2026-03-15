package com.hireme.controller;

import com.hireme.model.Application.Application;
import com.hireme.service.ApplicationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
//@CrossOrigin(origins = "http://localhost:3000")
public class ApplicationController {

    @Autowired
    private ApplicationService applicationService;

    // Candidate applies for a job
    @PostMapping("/api/candidate/apply")
    public ResponseEntity<?> apply(@RequestParam Long candidateId,
                                   @RequestParam Long jobId,
                                   @RequestParam String coverLetter) {
        Application application = applicationService.applyForJob(candidateId, jobId, coverLetter);
        if (application == null) {
            return ResponseEntity.badRequest().body("Already applied or invalid request");
        }
        return ResponseEntity.ok(application);
    }

    // Candidate views their applications
    @GetMapping("/api/candidate/applications")
    public ResponseEntity<List<Application>> getCandidateApplications(@RequestParam Long candidateId) {
        return ResponseEntity.ok(applicationService.getApplicationsByCandidate(candidateId));
    }

    // Employer views applications for a job
    @GetMapping("/api/employer/applications")
    public ResponseEntity<List<Application>> getApplicationsByJob(@RequestParam Long jobId) {
        return ResponseEntity.ok(applicationService.getApplicationsByJob(jobId));
    }

    // Recruiter views all applications
    @GetMapping("/api/recruiter/applications")
    public ResponseEntity<List<Application>> getAllApplications() {
        return ResponseEntity.ok(applicationService.getAllApplications());
    }

    // Recruiter updates application status
    @PutMapping("/api/recruiter/application/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        Application updated = applicationService.updateStatus(id, status);
        if (updated == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(updated);
    }
}