package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.MenuItem;
import com.example.demo.respository.MenuItemRepository;

@Service
public class MenuItemService {

    private final MenuItemRepository menuItemRepository;

    public MenuItemService(MenuItemRepository menuItemRepository) {
        this.menuItemRepository = menuItemRepository;
    }

    public MenuItem createMenuItem(MenuItem menuItem) {
        return menuItemRepository.save(menuItem);
    }

    public List<MenuItem> getAllMenuItems() {
        return menuItemRepository.findAll();
    }

    public MenuItem getMenuItemByItemId(String itemId) {
        return menuItemRepository.findByItemId(itemId)
                .orElseThrow(() -> new RuntimeException("Menu item not found"));
    }

    public List<MenuItem> getMenuItemsByRestaurantId(String restaurantId) {
        return menuItemRepository.findByRestaurantId(restaurantId);
    }

    public MenuItem updateMenuItem(String itemId, MenuItem updatedMenuItem) {
        MenuItem menuItem = getMenuItemByItemId(itemId);
        menuItem.setName(updatedMenuItem.getName());
        menuItem.setPrice(updatedMenuItem.getPrice());
        menuItem.setRestaurantId(updatedMenuItem.getRestaurantId());
        return menuItemRepository.save(menuItem);
    }

    public void deleteMenuItem(String itemId) {
        MenuItem menuItem = getMenuItemByItemId(itemId);
        menuItemRepository.delete(menuItem);
    }
}
