const { fail, throws } = require("assert");
const { KeyObject } = require("crypto");
const { ajax } = require("jquery");
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);

const methodEnum={
    GET: 'GET',
    POST: 'POST',
    PUT: 'PUT',
    DELETE: 'DELETE',
    PATCH: 'PATCH',
    HEAD: 'HEAD',
    OPTIONS: 'OPTIONS',
    TRACE: 'TRACE',
    CONNECT: 'CONNECT'
}

const contentTypeEnum={
    applicationForm:'application/x-www-form-urlencoded; charset=UTF-8', // default
    mediaForm: 'multipart/form-data',
    text: 'text/plain',
    json: 'application/json',
}

const dataTypeEnum={
    xml:'xml',
    html: 'html',
    script: 'script',
    json: 'json',
    jsonp: 'jsonp',
    mix1: 'text xml',
    mix2: 'jsonp text xml',
    mix3: 'jsonp xml'
}



function ajaxCall(url, method, data,contentType, callback=()=>{}, beforeSendCallback=()=>{}, errorCallback=()=>{}, alwaysCallback=()=>{}) { 
    return  $.ajax({
        url: url,
        method: method,
        data:data,
        contentType: contentType,//contentTypeEnum.json,
        dataType: dataTypeEnum.json,
        // statusText: 'OK',
        // status: 200,
        beforeSend: (res)=> {  
            beforeSendCallback(res);        
        },
        success: (data, status, xhr) => {
            callback(data, status, xhr);
        },
        error: (jqXhr, textStatus, errorMessage) => {
            errorCallback(jqXhr, textStatus, errorMessage);
        },
        statusCode: // notice: statusCode singular
        {
            // Plain object syntax with integer status codes as the keys
            200: function() {
                console.log(`200 Successsfull.`);
            },
            201: function() {
                console.log(`201 Created successsfull.`);
            },
            403: function(statusCodeData) {
                console.log("403 Forbidden.");
            },
            500: function(statusCodeData) {
                console.log("500 Internal Server Error. Try again later.");
            }
        }
    })
    .done(function(data){
        return data
    })
    .fail(function(data){
        return data
    })
    .always(function(data){
        alwaysCallback(data);
    });
  };
  
  async function ajaxCallDriver() {
    try {
      var result=await ajaxCall('https://jsonplaceholder.typicode.com/posts/1')
      console.log('====================================');
      console.log('Result: ', result);
      console.log('====================================');
    } catch(err) {
      console.error(err);
    }
  }

  
  ajaxCallDriver()
  



