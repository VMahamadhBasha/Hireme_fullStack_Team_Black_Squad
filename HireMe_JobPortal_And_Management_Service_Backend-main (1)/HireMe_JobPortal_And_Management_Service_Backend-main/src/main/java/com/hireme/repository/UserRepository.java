package com.hireme.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.hireme.model.User;

public interface UserRepository extends JpaRepository<User,Long> {
	User findByEmail(String email);
}
