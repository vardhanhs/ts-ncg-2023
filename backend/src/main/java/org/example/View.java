package org.example;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.NotNull;
import java.util.Date;

@Entity
public class View {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long viewId;

    @NotNull
    private String name;

    @NotNull
    private String chartType;

    @NotNull
    private String country;

    @NotNull
    private String indicator;

    @NotNull
    private Date startDate;

    @NotNull
    private Date endDate;

    public void setViewId(Long viewId) {
        this.viewId=viewId;
    }

    // Constructors, getters, and setters
}

