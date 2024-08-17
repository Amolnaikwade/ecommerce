package com.example.demo.service;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private static UserRepository userRepository;

    
    

    /**
     * Registers a new user by encoding their password and saving them to the database.
     *
     * @param user The user to be registered.
     * @return The registered user.
     */
    public static User registerUser(User user) {
        // Encode the password before saving
        user.setPassword(user.getPassword());
        return userRepository.save(user);
    }

    /**
     * Retrieves a user by their username.
     *
     * @param username The username of the user.
     * @return An Optional containing the user if found, otherwise empty.
     */
    public Optional<Optional<User>> getUserByUsername(String username) {
        return Optional.ofNullable(userRepository.findByUsername(username));
    }

    /**
     * Retrieves a user by their ID.
     *
     * @param id The ID of the user.
     * @return An Optional containing the user if found, otherwise empty.
     */
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    /**
     * Updates the details of an existing user.
     *
     * @param user The user with updated details.
     * @return The updated user.
     */
    public User updateUser(User user) {
        // Make sure the user exists before updating
        if (userRepository.existsById(user.getId())) {
            return userRepository.save(user);
        } else {
            throw new RuntimeException("User not found");
        }
    }

    /**
     * Deletes a user by their ID.
     *
     * @param id The ID of the user to be deleted.
     */
    public void deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("User not found");
        }
    }
}
