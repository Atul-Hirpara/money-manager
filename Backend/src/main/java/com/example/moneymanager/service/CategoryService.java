package com.example.moneymanager.service;

import com.example.moneymanager.dto.CategoryDTO;
import com.example.moneymanager.entity.CategoryEntity;
import com.example.moneymanager.entity.ProfileEntity;
import com.example.moneymanager.repository.CategoryRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
@AllArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final ProfileService profileService;

    // save category
    public CategoryDTO saveCategory(CategoryDTO categoryDTO){
        ProfileEntity profile = profileService.getCurrentProfile();
        if(categoryRepository.existsByNameAndProfileId(categoryDTO.getName() , profile.getId())){
            throw new RuntimeException("Category with this name already exists.");
        }

        CategoryEntity newCategory = toEntity(categoryDTO , profile);
        newCategory = categoryRepository.save(newCategory);
        return toDTO(newCategory);

    }

    // get categories for current user
    public List<CategoryDTO> getCategoriesForCurrentUser(){
        ProfileEntity profile = profileService.getCurrentProfile();
        List<CategoryEntity> categories = categoryRepository.findByProfileId(profile.getId());
        return categories.stream().map(this::toDTO).toList();
    }

    // get category for specific type for current user
    public List<CategoryDTO> getCategoriesByTypeForCurrentUser(String type){
        ProfileEntity profile = profileService.getCurrentProfile();
        List<CategoryEntity> categories = categoryRepository.findByTypeAndProfileId(type , profile.getId());
        return categories.stream().map(this::toDTO).toList();
    }

    // update category
    public CategoryDTO updateCategory(Long categoryId , CategoryDTO dto){
        ProfileEntity profile = profileService.getCurrentProfile();
        CategoryEntity existingCategory = categoryRepository.findByIdAndProfileId(categoryId , profile.getId())
                .orElseThrow(() -> new RuntimeException("Category not found or not accessible"));

        existingCategory.setName(dto.getName());
        existingCategory.setType(dto.getType());
        existingCategory.setIcon(dto.getIcon());
        return toDTO(categoryRepository.save(existingCategory));
    }

    // helper methods
    private CategoryEntity toEntity(CategoryDTO categoryDTO , ProfileEntity profile){
        return CategoryEntity.builder()
                .name(categoryDTO.getName())
                .icon(categoryDTO.getIcon())
                .profile(profile)
                .type(categoryDTO.getType())
                .build();
    }

    private CategoryDTO toDTO(CategoryEntity categoryEntity){
        return CategoryDTO.builder()
                .id(categoryEntity.getId())
                .profileId(categoryEntity.getProfile() != null ? categoryEntity.getProfile().getId() : null)
                .name(categoryEntity.getName())
                .icon(categoryEntity.getIcon())
                .createdAt(categoryEntity.getCreatedAt())
                .updatedAt(categoryEntity.getUpdatedAt())
                .type(categoryEntity.getType())
                .build();

    }
}
