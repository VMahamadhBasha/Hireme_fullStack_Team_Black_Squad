package com.hireme.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hireme.model.Interview;

public interface InterviewRepository  extends JpaRepository<Interview, Long>{

    List<Interview> findByApplicationId(Long applicationId);
}
