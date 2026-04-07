package com.example.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.Restaurant;
import com.example.demo.service.RestaurantService;

@RestController
@RequestMapping("/api/restaurants")
public class RestaurantController {

    private final RestaurantService restaurantService;

    public RestaurantController(RestaurantService restaurantService) {
        this.restaurantService = restaurantService;
    }

    // @PostMapping
    // public Restaurant createRestaurant(@RequestBody Restaurant restaurant) {
    // return restaurantService.createRestaurant(restaurant);
    // }

    @GetMapping
    public List<Restaurant> getAllRestaurants() {
        return restaurantService.getAllRestaurants();
    }

    @GetMapping("/{restaurantId}")
    public Restaurant getRestaurantById(@PathVariable String restaurantId) {
        return restaurantService.getRestaurantByRestaurantId(restaurantId);
    }

    // @PutMapping("/{restaurantId}")
    // public Restaurant updateRestaurant(@PathVariable String restaurantId,
    // @RequestBody Restaurant restaurant) {
    // return restaurantService.updateRestaurant(restaurantId, restaurant);
    // }

    // @DeleteMapping("/{restaurantId}")
    // public String deleteRestaurant(@PathVariable String restaurantId) {
    // restaurantService.deleteRestaurant(restaurantId);
    // return "Deleted successfully";
    // }
}
