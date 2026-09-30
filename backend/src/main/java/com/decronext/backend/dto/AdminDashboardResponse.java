package com.decronext.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class AdminDashboardResponse {

    private long totalProducts;
    private long totalOrders;
    private long totalCustomers;
    private double totalRevenue;
}