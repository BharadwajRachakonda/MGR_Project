package com.example.demo.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.example.demo.model.OrderItem;
import com.example.demo.respository.OrderItemRepository;

@Service
public class OrderItemService {

    private final OrderItemRepository orderItemRepository;

    public OrderItemService(OrderItemRepository orderItemRepository) {
        this.orderItemRepository = orderItemRepository;
    }

    public OrderItem createOrderItem(OrderItem orderItem) {
        return orderItemRepository.save(orderItem);
    }

    public List<OrderItem> getAllOrderItems() {
        return orderItemRepository.findAll();
    }

    public OrderItem getOrderItemByOrderItemId(String orderItemId) {
        return orderItemRepository.findByOrderItemId(orderItemId)
                .orElseThrow(() -> new RuntimeException("Order item not found"));
    }

    public List<OrderItem> getOrderItemsByOrderId(String orderId) {
        return orderItemRepository.findByOrderId(orderId);
    }

    public OrderItem updateOrderItem(String orderItemId, OrderItem updatedOrderItem) {
        OrderItem orderItem = getOrderItemByOrderItemId(orderItemId);
        orderItem.setOrderId(updatedOrderItem.getOrderId());
        orderItem.setItemId(updatedOrderItem.getItemId());
        orderItem.setQuantity(updatedOrderItem.getQuantity());
        return orderItemRepository.save(orderItem);
    }

    public void deleteOrderItem(String orderItemId) {
        OrderItem orderItem = getOrderItemByOrderItemId(orderItemId);
        orderItemRepository.delete(orderItem);
    }
}
