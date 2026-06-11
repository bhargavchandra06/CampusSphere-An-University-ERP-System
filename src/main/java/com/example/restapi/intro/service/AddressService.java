package com.example.restapi.intro.service;

import com.example.restapi.intro.dto.AddressDto;
import com.example.restapi.intro.entity.AddressEntity;
import com.example.restapi.intro.exceptions.ResourceNotFoundException;
import com.example.restapi.intro.respository.AddressRepository;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.lang.reflect.Field;
import java.util.List;
import java.util.Map;
import org.springframework.util.ReflectionUtils;

@Service
public class AddressService {

    private final AddressRepository addressRepository;
    private final ModelMapper modelMapper;

    public AddressService(
            AddressRepository addressRepository,
            ModelMapper modelMapper
    ) {
        this.addressRepository = addressRepository;
        this.modelMapper = modelMapper;
    }
    private AddressEntity getAddressEntityById(Long id)
    {
        return addressRepository.findById(id)
                .orElseThrow(() ->
                        new ResourceNotFoundException(
                                "Address not found with id : " + id
                        )
                );
    }
    public AddressDto createAddress(AddressDto addressDto) {

        AddressEntity entity =
                modelMapper.map(
                        addressDto,
                        AddressEntity.class
                );

        AddressEntity saved =
                addressRepository.save(entity);

        return modelMapper.map(
                saved,
                AddressDto.class
        );
    }

    public AddressDto getAddressById(Long id)
    {
        AddressEntity address =
                getAddressEntityById(id);

        return modelMapper.map(
                address,
                AddressDto.class
        );
    }

    public List<AddressDto> getAllAddresses() {

        return addressRepository.findAll()
                .stream()
                .map(address ->
                        modelMapper.map(
                                address,
                                AddressDto.class
                        ))
                .toList();
    }

    public AddressDto updateAddress(
            Long id,
            AddressDto addressDto
    ) {
        AddressEntity address =
                addressRepository.findById(id)
                        .orElseThrow(() ->
                                new ResourceNotFoundException(
                                        "Address not found with id : " + id
                                )
                        );

        modelMapper.map(
                addressDto,
                address
        );

        address.setId(id);

        AddressEntity saved =
                addressRepository.save(address);

        return modelMapper.map(
                saved,
                AddressDto.class
        );
    }
    public boolean deleteAddress(Long id)
    {
        AddressEntity address =
                getAddressEntityById(id);

        addressRepository.delete(address);

        return true;
    }
    public AddressDto updatePartial(
            Map<String,Object> fields,
            Long id
    )
    {
        AddressEntity address =
                getAddressEntityById(id);

        fields.forEach((fieldName,value)->{

            Field field =
                    ReflectionUtils.findField(
                            AddressEntity.class,
                            fieldName
                    );

            if(field != null)
            {
                field.setAccessible(true);

                ReflectionUtils.setField(
                        field,
                        address,
                        value
                );
            }
        });

        AddressEntity saved =
                addressRepository.save(address);

        return modelMapper.map(
                saved,
                AddressDto.class
        );
    }
}