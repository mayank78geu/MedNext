package com.mednext.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "patients")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Patient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false, unique = true)
    private Long userId;

    @Column(nullable = false)
    private String name;

    private String city;
    private String pincode;
    private Integer age;
    private Double height;
    private Double weight;

    @Column(name = "stress_level")
    private String stressLevel; // high/moderate/low

    @Column(name = "average_sleep_time")
    private String averageSleepTime;

    @Column(name = "sleep_quality")
    private String sleepQuality; // poor/moderate/excellent

    @Column(name = "bp_issues")
    private String bpIssues; // y/n
}
