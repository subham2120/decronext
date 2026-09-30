package com.decronext.backend.repository;

import com.decronext.backend.entity.Order;
import com.decronext.backend.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface OrderRepository
        extends JpaRepository<Order, Long> {

    List<Order> findByUserOrderByCreatedAtDesc(User user);
    Optional<Order> findByIdAndUser(Long id, User user);

    Optional<Order> findByRazorpayOrderIdAndUser(
            String razorpayOrderId,
            User user
    );

    long countByPaymentStatus(String paymentStatus);

    @Query("""
        SELECT COALESCE(SUM(o.totalAmount), 0)
        FROM Order o
        WHERE o.paymentStatus = 'PAID'
        """)
    Double getTotalRevenue();

    Optional<Order> findById(Long id);
}