package com.taskflow.backend.entity;

import org.springframework.security.core.userdetails.UserDetails;

import jakarta.persistence.*;
import org.springframework.security.core.GrantedAuthority;


import java.util.Collection;
import java.util.Collections;
import com.fasterxml.jackson.annotation.JsonIgnore;


@Entity
@Table(name = "users")
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;

    @Column(unique = true, nullable = false)
    private String email;

    @JsonIgnore
    private String password;

    public User() {
    }

    public User(Long id, String name, String email, String password) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
    @JsonIgnore
    @Override
public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.emptyList();
}

@Override
public String getUsername() {
    return email;
}

@JsonIgnore
@Override
public boolean isAccountNonExpired() {
    return true;
}

@JsonIgnore
@Override
public boolean isAccountNonLocked() {
    return true;
}

@JsonIgnore
@Override
public boolean isCredentialsNonExpired() {
    return true;
}

@JsonIgnore
@Override
public boolean isEnabled() {
    return true;
}
}