package com.hireme.controller;

import com.hireme.model.User;
import com.hireme.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
//@CrossOrigin(origins = "http://localhost:3000")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        User existing = userService.findByEmail(user.getEmail());
        if (existing != null) {
            return ResponseEntity.badRequest().body("Email already registered");
        }
        User saved = userService.register(user);
        return ResponseEntity.ok(saved);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        User loggedIn = userService.login(user.getEmail(), user.getPassword());
        if (loggedIn == null) {
            return ResponseEntity.status(401).body("Invalid email or password");
        }
        return ResponseEntity.ok(loggedIn);
    }
}