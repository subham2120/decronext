package com.decronext.backend.service;

import com.decronext.backend.dto.AdminDashboardResponse;
import com.decronext.backend.repository.OrderRepository;
import com.decronext.backend.repository.ProductRepository;
import com.decronext.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

@Service
public class AdminDashboardService {

    private final ProductRepository productRepository;
    private final OrderRepository orderRepository;
    private final UserRepository userRepository;

    public AdminDashboardService(
            ProductRepository productRepository,
            OrderRepository orderRepository,
            UserRepository userRepository
    ) {
        this.productRepository = productRepository;
        this.orderRepository = orderRepository;
        this.userRepository = userRepository;
    }

    public AdminDashboardResponse getDashboardStats() {

        long totalProducts = productRepository.count();

        long totalOrders = orderRepository.count();

        long totalCustomers = userRepository.count();

        Double totalRevenue = orderRepository.getTotalRevenue();

        return new AdminDashboardResponse(
                totalProducts,
                totalOrders,
                totalCustomers,
                totalRevenue
        );
    }
}