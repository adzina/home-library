var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();
module.exports = {
  scrape:function(req, res){

      url = req.param("url")
      request(url, function(error, response, html){
          if(!error){
              var $ = cheerio.load(html);
              var author, title, pages, year;
              var i=0;
              $('#metadata_content_table tr').filter(function(){

                  if(i == 0)
                    title = $(this).children().last().text()
                  if(i==1)
                    author = $(this).children().last().text().trim()
                  if(i==2)
                    year = $(this).children().last().text().split(',')[1].trim()
                  if(i==4)
                    pages = $(this).children().last().text()
                  i = i+1;
              })

              console.log("author")
              console.log(author)
              console.log("year")
              console.log(year)
              console.log("title")
              console.log(title)
              console.log("pages")
              console.log(pages)
              res.json({author: author, title: title, pages: pages, year: year})
          }else{
            console.log(error)
            res.negotiate(error)
          }
      })
  }

}
