package com.hireme.service;

import com.hireme.model.JobPost;
import com.hireme.repository.JobPostRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class JobPostService {

    @Autowired
    private JobPostRepository jobPostRepository;

    public JobPost createJob(JobPost jobPost) {
        jobPost.setStatus("OPEN");
        return jobPostRepository.save(jobPost);
    }

    public List<JobPost> getJobsByEmployer(Long employerId) {
        return jobPostRepository.findByEmployerId(employerId);
    }

    public List<JobPost> getOpenJobs() {
        return jobPostRepository.findByStatus("OPEN");
    }

    public List<JobPost> searchByTitle(String title) {
        return jobPostRepository.findByTitleContainingAndStatus(title, "OPEN");
    }

    public List<JobPost> searchByLocation(String location) {
        return jobPostRepository.findByLocationContainingAndStatus(location, "OPEN");
    }

    public JobPost closeJob(Long id) {
        JobPost job = jobPostRepository.findById(id).orElse(null);
        if (job != null) {
            job.setStatus("CLOSED");
            return jobPostRepository.save(job);
        }
        return null;
    }
}