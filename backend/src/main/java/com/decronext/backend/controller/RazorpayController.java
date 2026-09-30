package com.decronext.backend.controller;

import com.decronext.backend.service.RazorpayService;
import com.razorpay.RazorpayException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.decronext.backend.entity.Order;
import com.decronext.backend.entity.User;
import com.decronext.backend.repository.OrderRepository;
import com.decronext.backend.repository.UserRepository;
import org.springframework.security.core.Authentication;
import com.decronext.backend.dto.PaymentVerificationRequest;
import com.decronext.backend.entity.Order;
import com.decronext.backend.entity.User;
import com.decronext.backend.repository.OrderRepository;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/payment")
public class RazorpayController {

    private final RazorpayService razorpayService;

    private final UserRepository userRepository;
    private final OrderRepository orderRepository;

    public RazorpayController(RazorpayService razorpayService, UserRepository userRepository, OrderRepository orderRepository) {
        this.razorpayService = razorpayService;
        this.userRepository = userRepository;
        this.orderRepository = orderRepository;
    }

    @PostMapping("/create-order/{orderId}")
    public ResponseEntity<String> createOrder(
            @PathVariable Long orderId,
            Authentication authentication
    ) throws RazorpayException {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = orderRepository.findByIdAndUser(orderId, user)
                .orElseThrow(() -> new RuntimeException("Order not found"));

        String razorpayOrder =
                razorpayService.createRazorpayOrder(
                        orderId,
                        order
                );

        return ResponseEntity.ok(razorpayOrder);
    }


    @PostMapping("/verify")
    public ResponseEntity<String> verifyPayment(
            @Valid @RequestBody PaymentVerificationRequest request,
            Authentication authentication
    ) throws RazorpayException {

        String email = authentication.getName();

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Order order = orderRepository
                .findByRazorpayOrderIdAndUser(
                        request.getRazorpayOrderId(),
                        user
                )
                .orElseThrow(() -> new RuntimeException("Order not found"));

        boolean verified =
                razorpayService.verifyPayment(request);

        if (!verified) {
            return ResponseEntity
                    .badRequest()
                    .body("Payment verification failed");
        }

        order.setPaymentStatus("PAID");
        order.setStatus("CONFIRMED");

        orderRepository.save(order);

        return ResponseEntity.ok(
                "Payment verified successfully"
        );
    }
}