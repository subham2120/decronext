package com.decronext.backend.controller;

import com.decronext.backend.dto.AdminDashboardResponse;
import com.decronext.backend.service.AdminDashboardService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/dashboard")
public class AdminDashboardController {

    private final AdminDashboardService adminDashboardService;

    public AdminDashboardController(
            AdminDashboardService adminDashboardService
    ) {
        this.adminDashboardService = adminDashboardService;
    }

    @GetMapping("/stats")
    public ResponseEntity<AdminDashboardResponse> getDashboardStats() {

        return ResponseEntity.ok(
                adminDashboardService.getDashboardStats()
        );
    }
}