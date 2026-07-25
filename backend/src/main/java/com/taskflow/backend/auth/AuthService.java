package com.taskflow.backend.auth;

import com.taskflow.backend.entity.User;
import com.taskflow.backend.repository.UserRepository;
import com.taskflow.backend.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import com.taskflow.backend.repository.TaskRepository;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final TaskRepository taskRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    

    public AuthService(UserRepository userRepository,
        TaskRepository taskRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.taskRepository = taskRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    // Register
    public String register(RegisterRequest request) {

        if (userRepository.existsByEmail(request.getEmail())) {
            return "Email already exists!";
        }

        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail());
        user.setPassword(passwordEncoder.encode(request.getPassword()));

        userRepository.save(user);

        return "Registration Successful!";
    }

    // Login
    public AuthResponse login(LoginRequest request) {

        System.out.println("========== LOGIN ==========");
        System.out.println("Email entered : " + request.getEmail());

        User user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            System.out.println("❌ User NOT found");
            return new AuthResponse(
                    "User not found!",
                    null,
                    null
            );
        }

        System.out.println("✅ User found");
        System.out.println("Database Email : " + user.getEmail());
        System.out.println("Database Name  : " + user.getName());

        boolean passwordMatches =
                passwordEncoder.matches(
                        request.getPassword(),
                        user.getPassword()
                );

        System.out.println("Password Matches : " + passwordMatches);

        if (!passwordMatches) {
            return new AuthResponse(
                    "Invalid password!",
                    null,
                    null
            );
        }

        String token = jwtService.generateToken(user.getEmail());

        System.out.println("✅ Login Successful");

        return new AuthResponse(
                "Login Successful!",
                token,
                user.getName()
        );
    }
}