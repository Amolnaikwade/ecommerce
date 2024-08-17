package com.example.demo.controller;

import java.util.Map;
import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

	private static final Logger logger =LoggerFactory.getLogger(AuthController.class);
    @Autowired
    private UserRepository userRepository;

   
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
       
        
        try {
            User registeredUser = UserService.registerUser(user);
            return new ResponseEntity<>(registeredUser, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(Map.of("error", "User registration failed"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }





   

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User user) {
        logger.info("Login attempt with username: " + user.getUsername());

        Optional<User> optionalUser = userRepository.findByUsername(user.getUsername());
        if (optionalUser.isPresent() && optionalUser.get().getPassword().equals(user.getPassword())) {
            return ResponseEntity.ok().build();
        } else {
            logger.warn("Invalid login attempt with username: " + user.getUsername());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid credentials");
        }
    }
}
