package com.example.restapi.intro.annotations;

import jakarta.validation.Constraint;
import jakarta.validation.Payload;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.FIELD,ElementType.PARAMETER})
@Constraint(validatedBy = {studentagevalidator.class})
public @interface studentage {
    String message() default "Student Age must be between 18-30";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
