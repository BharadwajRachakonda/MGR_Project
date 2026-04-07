package com.example.demo.service;

import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;
import com.example.demo.model.User;
import com.example.demo.respository.UserRepository;
import java.util.List;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User createUser(User user) {
        return userRepository.save(user);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public User getUserByUserId(String userId) {
        return userRepository.findByUserId(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
    }

    public User updateUser(String userId, User updatedUser) {
        User existingUser = getUserByUserId(userId);
        existingUser.setName(updatedUser.getName());
        existingUser.setEmail(updatedUser.getEmail());
        existingUser.setPassword(updatedUser.getPassword());
        return userRepository.save(existingUser);
    }

    public void deleteUser(String id) {
        User user = getUserByUserId(id);
        userRepository.delete(user);
    }

    public User getUserByEmail(String email) {
        List<User> users = userRepository.findAllByEmail(email);

        if (users.isEmpty()) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found");
        }

        if (users.size() > 1) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Multiple users found for email");
        }

        return users.get(0);
    }
}
