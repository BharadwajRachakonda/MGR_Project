package com.example.demo.model;

import java.math.BigDecimal;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "menu_items")
public class MenuItem {

    @Id
    private String id;
    private String itemId;
    private String name;
    private BigDecimal price;
    private String restaurantId;
    private String imageURL;

    public MenuItem() {
    }

    public MenuItem(String itemId, String name, BigDecimal price, String restaurantId, String imageURL) {
        this.itemId = itemId;
        this.name = name;
        this.price = price;
        this.restaurantId = restaurantId;
        this.imageURL = imageURL;
    }

    public String getId() {
        return id;
    }

    public String getItemId() {
        return itemId;
    }

    public void setItemId(String itemId) {
        this.itemId = itemId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public String getRestaurantId() {
        return restaurantId;
    }

    public void setRestaurantId(String restaurantId) {
        this.restaurantId = restaurantId;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }
}
