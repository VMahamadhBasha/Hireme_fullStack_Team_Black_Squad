package com.hireme.controller;

import com.hireme.model.Interview;
import com.hireme.service.InterviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/recruiter")
//@CrossOrigin(origins = "http://localhost:3000")
public class InterviewController {

    @Autowired
    private InterviewService interviewService;

    @PostMapping("/interview")
    public ResponseEntity<?> scheduleInterview(@RequestParam Long applicationId,
                                               @RequestParam String scheduledDate,
                                               @RequestParam String location) {
        Interview interview = interviewService.scheduleInterview(applicationId, scheduledDate, location);
        if (interview == null) {
            return ResponseEntity.badRequest().body("Application must be SHORTLISTED before scheduling interview");
        }
        return ResponseEntity.ok(interview);
    }

    @GetMapping("/interviews")
    public ResponseEntity<List<Interview>> getInterviews(@RequestParam Long applicationId) {
        return ResponseEntity.ok(interviewService.getInterviewsByApplication(applicationId));
    }
}