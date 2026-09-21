package com.decronext.backend.service;

import com.decronext.backend.dto.CreateOrderRequest;
import com.decronext.backend.dto.OrderItemRequest;
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
    public Order createOrder(
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

            if (itemRequest.getQuantity() == null
                    || itemRequest.getQuantity() < 1) {
                throw new RuntimeException(
                        "Quantity must be at least 1"
                );
            }

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

        return orderRepository.save(order);
    }

    public List<Order> getUserOrders(User user) {
        return orderRepository
                .findByUserOrderByCreatedAtDesc(user);
    }

    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() ->
                        new RuntimeException("Order not found")
                );
    }
}