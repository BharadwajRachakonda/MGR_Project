package com.example.demo.respository;

import org.springframework.data.mongodb.repository.MongoRepository;
import com.example.demo.model.User;
import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByUserId(String userId);

    List<User> findAllByEmail(String email);
}