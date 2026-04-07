package com.example.demo.respository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.MenuItem;

public interface MenuItemRepository extends MongoRepository<MenuItem, String> {
    Optional<MenuItem> findByItemId(String itemId);

    List<MenuItem> findByRestaurantId(String restaurantId);
}
