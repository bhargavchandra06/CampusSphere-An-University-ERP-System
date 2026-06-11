package com.example.restapi.intro.controller;

import com.example.restapi.intro.dto.AddressDto;
import com.example.restapi.intro.service.AddressService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/addresses")
public class AddressController {

    private final AddressService addressService;

    public AddressController(
            AddressService addressService
    ) {
        this.addressService = addressService;
    }

    @PostMapping
    public ResponseEntity<AddressDto> createAddress(
            @RequestBody @Valid AddressDto addressDto
    ) {
        return ResponseEntity.ok(
                addressService.createAddress(addressDto)
        );
    }

    @GetMapping
    public ResponseEntity<List<AddressDto>> getAllAddresses() {

        return ResponseEntity.ok(
                addressService.getAllAddresses()
        );
    }

    @GetMapping("/{id}")
    public ResponseEntity<AddressDto> getAddressById(
            @PathVariable Long id
    ) {
        return ResponseEntity.ok(
                addressService.getAddressById(id)
        );
    }
    @PutMapping("/{id}")
    public ResponseEntity<AddressDto> updateAddress(
            @PathVariable Long id,
            @RequestBody @Valid AddressDto addressDto
    )
    {
        return ResponseEntity.ok(
                addressService.updateAddress(
                        id,
                        addressDto
                )
        );
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<Boolean> deleteAddress(
            @PathVariable Long id
    )
    {
        return ResponseEntity.ok(
                addressService.deleteAddress(id)
        );
    }
    @PatchMapping("/{id}")
    public ResponseEntity<AddressDto> updatePartial(
            @PathVariable Long id,
            @RequestBody Map<String,Object> fields
    )
    {
        return ResponseEntity.ok(
                addressService.updatePartial(
                        fields,
                        id
                )
        );
    }
}