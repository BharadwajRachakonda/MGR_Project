package com.example.demo.controllers;

import java.util.List;

import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.example.demo.model.MenuItem;
import com.example.demo.service.MenuItemService;

@RestController
@RequestMapping("/api/menu-items")
public class MenuItemController {

    private final MenuItemService menuItemService;

    public MenuItemController(MenuItemService menuItemService) {
        this.menuItemService = menuItemService;
    }

    // @PostMapping
    // public MenuItem createMenuItem(@RequestBody MenuItem menuItem) {
    // return menuItemService.createMenuItem(menuItem);
    // }

    @GetMapping
    public List<MenuItem> getAllMenuItems(@RequestParam(required = false) String restaurantId) {
        if (restaurantId != null && !restaurantId.isBlank()) {
            return menuItemService.getMenuItemsByRestaurantId(restaurantId);
        }
        return menuItemService.getAllMenuItems();
    }

    @GetMapping("/{itemId}")
    public MenuItem getMenuItemById(@PathVariable String itemId) {
        return menuItemService.getMenuItemByItemId(itemId);
    }

    // @PutMapping("/{itemId}")
    // public MenuItem updateMenuItem(@PathVariable String itemId, @RequestBody
    // MenuItem menuItem) {
    // return menuItemService.updateMenuItem(itemId, menuItem);
    // }

    // @DeleteMapping("/{itemId}")
    // public String deleteMenuItem(@PathVariable String itemId) {
    // menuItemService.deleteMenuItem(itemId);
    // return "Deleted successfully";
    // }
}
