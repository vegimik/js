const { data } = require("jquery");
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);

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

function asyncAjax(ajaxurl){
    return new Promise(function(resolve, reject) {
        $.ajax({
            url: ajaxurl,
            method: "GET",
            data:'',
            contentType: contentTypeEnum.json,
            dataType: dataTypeEnum.json,
            // statusText: 'OK',
            // status: 200,
            beforeSend: (res)=> {  
                console.log('beforeSend');          
            },
            success: (data, status, xhr) => {
                console.log('success:, ');
            },
            error: (jqXhr, textStatus, errorMessage) => {
                console.log('error: ');//, jqXhr, textStatus, errorMessage);
            },
            statusCode: // notice: statusCode singular
            {
                // Plain object syntax with integer status codes as the keys
                200: function() {
                    console.log(`200 Successsfull. You do have permission for this action.`);
                },
                201: function() {
                    console.log(`201 Created successsfull. You do have permission for this action.`);
                },
                403: function(statusCodeData) {
                    console.log("403 Forbidden. You do not have permission for this action.");
                },
                500: function(statusCodeData) {
                    console.log("500 Internal Server Error. Try again later.");
                }
            }
        })
        .done(function(data){
            resolve(data)
        })
        .fail(function(data){
            reject(data)
        })
        .always(function(data){
            console.log('always:, ', this.statusText, this.status);
        });
    });
}


async function ajaxCallDriver() {
    try{
        asyncAjax('https://jsonplaceholder.typicode.com/posts/1')
        .then((result) => {
            console.log('====================================');
            console.log('Result: ', result);
            console.log('====================================');
            
        }).catch((err) => {
            console.log(err)
        });
    } catch(err){
        console.error(err);
    }
}


ajaxCallDriver();