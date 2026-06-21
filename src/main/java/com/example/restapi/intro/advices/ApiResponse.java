package com.example.restapi.intro.advices;

import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class ApiResponse<T> {

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }

    public ApiError getError() {
        return error;
    }




    public void setError(ApiError error) {
        this.error = error;
    }

    private T data;

    private ApiError error;

    public String getTimeStamp() {
        return timeStamp;
    }

    public void setTimeStamp(String timeStamp) {
        this.timeStamp = timeStamp;
    }

    private String timeStamp;

    public ApiResponse(T data) {
        this.data = data;
        this.timeStamp = LocalDateTime.now().toString();
    }

    public ApiResponse(ApiError error) {
        this.error = error;
        this.timeStamp = LocalDateTime.now().toString();
    }
}