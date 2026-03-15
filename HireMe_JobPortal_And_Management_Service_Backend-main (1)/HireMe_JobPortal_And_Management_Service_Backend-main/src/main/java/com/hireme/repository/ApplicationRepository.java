package com.hireme.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hireme.model.Application.Application;

public interface ApplicationRepository extends JpaRepository<Application, Long>{
	List<Application> findByCandidateId(Long candidateId);
    List<Application> findByJobId(Long jobId);
    boolean existsByCandidateIdAndJobId(Long candidateId, Long jobId);
}
