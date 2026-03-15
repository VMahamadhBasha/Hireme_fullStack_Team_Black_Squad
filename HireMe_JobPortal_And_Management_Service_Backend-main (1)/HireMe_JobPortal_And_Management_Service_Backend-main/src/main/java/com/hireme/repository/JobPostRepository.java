package com.hireme.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hireme.model.JobPost;

public interface JobPostRepository extends JpaRepository<JobPost,Long> {
	List<JobPost> findByEmployerId(Long employerId);
    List<JobPost> findByStatus(String status);
    List<JobPost> findByTitleContainingAndStatus(String title, String status);
    List<JobPost> findByLocationContainingAndStatus(String location, String status);

}
