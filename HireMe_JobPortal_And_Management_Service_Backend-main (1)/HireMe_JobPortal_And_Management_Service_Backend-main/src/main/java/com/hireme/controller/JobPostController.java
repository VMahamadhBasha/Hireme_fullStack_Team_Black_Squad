package com.hireme.controller;

import com.hireme.model.JobPost;
import com.hireme.service.JobPostService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/employer")
//@CrossOrigin(origins = "http://localhost:3000")
public class JobPostController {

    @Autowired
    private JobPostService jobPostService;

    @PostMapping("/job")
    public ResponseEntity<?> createJob(@RequestBody JobPost jobPost) {
        JobPost created = jobPostService.createJob(jobPost);
        return ResponseEntity.ok(created);
    }

    @GetMapping("/jobs")
    public ResponseEntity<List<JobPost>> getJobsByEmployer(@RequestParam Long employerId) {
        return ResponseEntity.ok(jobPostService.getJobsByEmployer(employerId));
    }

    @PutMapping("/job/{id}/close")
    public ResponseEntity<?> closeJob(@PathVariable Long id) {
        JobPost closed = jobPostService.closeJob(id);
        if (closed == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(closed);
    }
}