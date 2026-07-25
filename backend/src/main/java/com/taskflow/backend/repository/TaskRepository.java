package com.taskflow.backend.repository;


import com.taskflow.backend.entity.Task;
import org.springframework.data.jpa.repository.JpaRepository;

import com.taskflow.backend.entity.User;

import java.util.List;

public interface TaskRepository extends JpaRepository<Task, Long> {

    List<Task> findByTitleContainingIgnoreCase(String title);
    List<Task> findByUser(User user);
    void deleteByUser(User user);

}
