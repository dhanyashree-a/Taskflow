package com.taskflow.backend.controller;

import com.taskflow.backend.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> deleteAccount() {

        return ResponseEntity.ok(
                userService.deleteCurrentUser()
        );

    }
}