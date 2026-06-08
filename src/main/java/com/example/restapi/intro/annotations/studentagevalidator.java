package com.example.restapi.intro.annotations;

import jakarta.validation.ConstraintValidator;
import jakarta.validation.ConstraintValidatorContext;

public class studentagevalidator implements ConstraintValidator<studentage,Integer > {
    @Override
    public boolean isValid(Integer n, ConstraintValidatorContext constraintValidatorContext) {
       if(n>=18 && n<=30)
       {
           return true;
       }
       return false;
    }

}
