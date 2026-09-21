package com.decronext.backend.controller;

import com.decronext.backend.dto.CreateOrderRequest;
import com.decronext.backend.entity.Order;
import com.decronext.backend.entity.User;
import com.decronext.backend.repository.UserRepository;
import com.decronext.backend.service.OrderService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final UserRepository userRepository;

    public OrderController(
            OrderService orderService,
            UserRepository userRepository
    ) {
        this.orderService = orderService;
        this.userRepository = userRepository;
    }

    @PostMapping
    public ResponseEntity<Order> createOrder(
            @Valid @RequestBody CreateOrderRequest request,
            Authentication authentication
    ) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        Order savedOrder =
                orderService.createOrder(request, user);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(savedOrder);
    }

    @GetMapping
    public ResponseEntity<List<Order>> getMyOrders(
            Authentication authentication
    ) {
        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() ->
                        new RuntimeException("User not found")
                );

        return ResponseEntity.ok(
                orderService.getUserOrders(user)
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<Order> getOrderById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                orderService.getOrderById(id)
        );
    }
}