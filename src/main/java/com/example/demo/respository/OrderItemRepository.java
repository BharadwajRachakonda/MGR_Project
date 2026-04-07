package com.example.demo.respository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.demo.model.OrderItem;

public interface OrderItemRepository extends MongoRepository<OrderItem, String> {
    Optional<OrderItem> findByOrderItemId(String orderItemId);

    List<OrderItem> findByOrderId(String orderId);
}
