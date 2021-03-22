package com.alfa.bidit.service;


import com.alfa.bidit.model.Auction;
import com.alfa.bidit.model.User;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Optional;


@Service
public interface AuctionService{

    Auction create(Auction auction);

    Auction getById(Long id);

    List<Auction> getBySellerId(Long sellerID);

}