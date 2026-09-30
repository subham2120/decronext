package com.decronext.backend.service;

import com.decronext.backend.dto.CreateOrderRequest;
import com.decronext.backend.dto.OrderItemRequest;
import com.decronext.backend.dto.OrderItemResponse;
import com.decronext.backend.dto.OrderResponse;
import com.decronext.backend.entity.Order;
import com.decronext.backend.entity.OrderItem;
import com.decronext.backend.entity.Product;
import com.decronext.backend.entity.User;
import com.decronext.backend.repository.OrderRepository;
import com.decronext.backend.repository.ProductRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(
            OrderRepository orderRepository,
            ProductRepository productRepository
    ) {
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    @Transactional
    public OrderResponse createOrder(
            CreateOrderRequest request,
            User user
    ) {
        Order order = Order.builder()
                .user(user)
                .shippingAddress(request.getShippingAddress())
                .status("PENDING")
                .paymentStatus("PENDING")
                .createdAt(LocalDateTime.now())
                .totalAmount(0.0)
                .items(new ArrayList<>())
                .build();

        double totalAmount = 0.0;

        for (OrderItemRequest itemRequest : request.getItems()) {

            Product product = productRepository
                    .findById(itemRequest.getProductId())
                    .orElseThrow(() ->
                            new RuntimeException(
                                    "Product not found: "
                                            + itemRequest.getProductId()
                            )
                    );

            double itemTotal =
                    product.getPrice()
                            * itemRequest.getQuantity();

            OrderItem orderItem = OrderItem.builder()
                    .order(order)
                    .product(product)
                    .quantity(itemRequest.getQuantity())
                    .price(product.getPrice())
                    .build();

            order.getItems().add(orderItem);

            totalAmount += itemTotal;
        }

        order.setTotalAmount(totalAmount);

        Order savedOrder = orderRepository.save(order);

        return mapToOrderResponse(savedOrder);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getUserOrders(User user) {

        return orderRepository
                .findByUserOrderByCreatedAtDesc(user)
                .stream()
                .map(this::mapToOrderResponse)
                .toList();
    }

    @Transactional(readOnly = true)
    public OrderResponse getOrderById(Long id, User user) {

        Order order = orderRepository.findByIdAndUser(id, user)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        return mapToOrderResponse(order);
    }

    @Transactional(readOnly = true)
    public List<OrderResponse> getAllOrders() {

        return orderRepository
                .findAll()
                .stream()
                .map(this::mapToOrderResponse)
                .toList();
    }

    @Transactional
    public OrderResponse updateOrderStatus(
            Long id,
            String status
    ) {

        Order order = orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found")
                );

        order.setStatus(status);

        Order updatedOrder = orderRepository.save(order);

        return mapToOrderResponse(updatedOrder);
    }

    private OrderResponse mapToOrderResponse(Order order) {

        List<OrderItemResponse> items =
                order.getItems()
                        .stream()
                        .map(item ->
                                new OrderItemResponse(
                                        item.getProduct().getId(),
                                        item.getProduct().getName(),
                                        item.getQuantity(),
                                        item.getPrice()
                                )
                        )
                        .toList();

        return new OrderResponse(
                order.getId(),
                order.getTotalAmount(),
                order.getStatus(),
                order.getPaymentStatus(),
                order.getShippingAddress(),
                order.getCreatedAt(),
                items
        );
    }

}