package com.alfa.bidit.service;

import com.alfa.bidit.model.Comment;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CommentService {
    List<Comment> getAllBySellerID(Long sellerID);
}
