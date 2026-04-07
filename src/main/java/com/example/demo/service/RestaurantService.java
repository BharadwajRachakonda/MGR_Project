package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.Restaurant;
import com.example.demo.respository.RestaurantRepository;

@Service
public class RestaurantService {

    private final RestaurantRepository restaurantRepository;

    public RestaurantService(RestaurantRepository restaurantRepository) {
        this.restaurantRepository = restaurantRepository;
    }

    public Restaurant createRestaurant(Restaurant restaurant) {
        return restaurantRepository.save(restaurant);
    }

    public List<Restaurant> getAllRestaurants() {
        return restaurantRepository.findAll();
    }

    public Restaurant getRestaurantByRestaurantId(String restaurantId) {
        return restaurantRepository.findByRestaurantId(restaurantId)
                .orElseThrow(() -> new RuntimeException("Restaurant not found"));
    }

    public Restaurant updateRestaurant(String restaurantId, Restaurant updatedRestaurant) {
        Restaurant restaurant = getRestaurantByRestaurantId(restaurantId);
        restaurant.setName(updatedRestaurant.getName());
        restaurant.setLocation(updatedRestaurant.getLocation());
        return restaurantRepository.save(restaurant);
    }

    public void deleteRestaurant(String restaurantId) {
        Restaurant restaurant = getRestaurantByRestaurantId(restaurantId);
        restaurantRepository.delete(restaurant);
    }
}
