package com.decronext.backend.controller;

import com.decronext.backend.entity.ContactMessage;
import com.decronext.backend.service.ContactMessageService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact")
public class ContactMessageController {

    private final ContactMessageService contactMessageService;

    public ContactMessageController(
            ContactMessageService contactMessageService
    ) {
        this.contactMessageService = contactMessageService;
    }

    @PostMapping
    public ResponseEntity<ContactMessage> sendMessage(
            @RequestBody ContactMessage contactMessage
    ) {
        ContactMessage savedMessage =
                contactMessageService.saveMessage(contactMessage);

        return ResponseEntity.ok(savedMessage);
    }

    @GetMapping
    public ResponseEntity<List<ContactMessage>> getAllMessages() {
        return ResponseEntity.ok(
                contactMessageService.getAllMessages()
        );
    }
}