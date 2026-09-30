package com.decronext.backend.service;

import com.decronext.backend.entity.Order;
import com.decronext.backend.repository.OrderRepository;
import com.razorpay.RazorpayClient;
import com.razorpay.RazorpayException;
import org.json.JSONObject;
import org.springframework.stereotype.Service;
import com.decronext.backend.dto.PaymentVerificationRequest;
import com.razorpay.Utils;
import org.springframework.beans.factory.annotation.Value;
@Service
public class RazorpayService {

    private final RazorpayClient razorpayClient;
    private final OrderRepository orderRepository;

    public RazorpayService(
            RazorpayClient razorpayClient,
            OrderRepository orderRepository
    ) {
        this.razorpayClient = razorpayClient;
        this.orderRepository = orderRepository;
    }

    public String createRazorpayOrder(
            Long orderId,
            Order userOrder
    ) throws RazorpayException {

        JSONObject orderRequest = new JSONObject();

        orderRequest.put(
                "amount",
                (int) Math.round(userOrder.getTotalAmount() * 100)
        );

        orderRequest.put("currency", "INR");

        orderRequest.put(
                "receipt",
                "decor_order_" + orderId
        );

        com.razorpay.Order razorpayOrder =
                razorpayClient.orders.create(orderRequest);

        String razorpayOrderId =
                razorpayOrder.get("id");

        userOrder.setRazorpayOrderId(razorpayOrderId);

        orderRepository.save(userOrder);

        return razorpayOrder.toString();
    }

    @Value("${razorpay.key.secret}")
    private String keySecret;

    public boolean verifyPayment(
            PaymentVerificationRequest request
    ) throws RazorpayException {

        JSONObject options = new JSONObject();

        options.put(
                "razorpay_order_id",
                request.getRazorpayOrderId()
        );

        options.put(
                "razorpay_payment_id",
                request.getRazorpayPaymentId()
        );

        options.put(
                "razorpay_signature",
                request.getRazorpaySignature()
        );

        return Utils.verifyPaymentSignature(
                options,
                keySecret
        );
    }
}