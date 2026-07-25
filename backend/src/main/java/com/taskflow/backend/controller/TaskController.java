package com.taskflow.backend.controller;

import com.taskflow.backend.entity.Task;
import com.taskflow.backend.service.TaskService;
import org.springframework.web.bind.annotation.*;
import java.util.List;
import java.util.Optional;
import jakarta.validation.Valid;
import com.taskflow.backend.dto.TaskDTO;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public Task createTask(@Valid @RequestBody TaskDTO taskDTO) {
        return taskService.createTask(taskDTO); //calls service
    }
    @GetMapping
    public List<Task> getAllTasks() {
    return taskService.getAllTasks();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id) {
    return taskService.getTaskById(id);
    }

    @PutMapping("/{id}")
    public Task updateTask(@PathVariable Long id,
                       @RequestBody Task updatedTask) {

    return taskService.updateTask(id, updatedTask);

    }

    @DeleteMapping("/{id}")
    public String deleteTask(@PathVariable Long id) {

    taskService.deleteTask(id);

    return "Task deleted successfully!";
    }

    @GetMapping("/search")
    public List<Task> searchTasks(@RequestParam String title) {
    return taskService.searchTasks(title);
    }

    @GetMapping("/page")
    public Page<Task> getTasks(Pageable pageable) {
    return taskService.getTasks(pageable);
    }
}