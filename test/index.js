'use strict';

const Code = require('code');
const Lab = require('lab');
const lab = Lab.script();
const AWS = require('aws-sdk-mock');
const GoodSQS = require('../lib/index');
const configMock = {
    access_key: '123NAOEHUMAKEY',
    secret_key: '123NAOEHUMSECRET',
    region: 'us-east-1',
    app: 'suite de testes',
    env: 'teste',
    fila: 'https://url.da.fila/fila'
};
lab.experiment('Suite de testes da biblioteca good-sqs', () => {
    
    lab.test('Ao instânciar a classe sem enviar nenhuma configuração deve lançar erro',  (done) => {       
            
            let teste = function(){
                let log = new GoodSQS(undefined);
            };    
                  
            Code.expect(teste).to.be.throw(Error, 'Config não informado!');
            return done();
    });
    lab.test('Ao escrever uma mensagem deve retornar sucesso',  (done) => {

                AWS.mock('SQS', 'sendMessage', false);
                let log = new GoodSQS(configMock);
                log.write('{"teste":123}', function(){
                    AWS.restore('SQS');                    
                    return done();
                });
                
    });  
    
    lab.test('Ao escrever uma mensagem vazia deve logar o erro',  (done) => {
        
                        AWS.mock('SQS', 'sendMessage',false);
                        let log = new GoodSQS(configMock);
                        log.write(undefined, function(){       
                            AWS.restore('SQS');              
                            return done();
                        });
                        
    });
    lab.test('Ao instânciar a classe sem access_key deve lançar erro',  (done) => {
        
        let teste = function(){
            let conf = Object.assign({}, configMock);
            delete conf.access_key;
            let log = new GoodSQS(conf);
        };    
              
        Code.expect(teste).to.be.throw(Error, 'access_key não informado!');
        return done();
                        
    });
    lab.test('Ao instânciar a classe sem secret_key deve lançar erro',  (done) => {
        
        let teste = function(){
            let conf = Object.assign({}, configMock);
            delete conf.secret_key;
            let log = new GoodSQS(conf);
        };    
              
        Code.expect(teste).to.be.throw(Error, 'secret_key não informado!');
        return done();
                        
    });
    lab.test('Ao instânciar a classe sem region deve lançar erro',  (done) => {
        
        let teste = function(){
            let conf = Object.assign({}, configMock);
            delete conf.region;
            let log = new GoodSQS(conf);
        };    
              
        Code.expect(teste).to.be.throw(Error, 'region não informado!');
        return done();
                        
    });
    lab.test('Ao instânciar a classe sem app deve lançar erro',  (done) => {
        
        let teste = function(){
            let conf = Object.assign({}, configMock);
            delete conf.app;
            let log = new GoodSQS(conf);
        };    
              
        Code.expect(teste).to.be.throw(Error, 'app não informado!');
        return done();
                        
    });
    lab.test('Ao instânciar a classe sem env deve lançar erro',  (done) => {
        
        let teste = function(){
            let conf = Object.assign({}, configMock);
            delete conf.env;
            let log = new GoodSQS(conf);
        };    
              
        Code.expect(teste).to.be.throw(Error, 'env não informado!');
        return done();
                        
    });
    lab.test('Ao instânciar a classe sem env deve lançar erro',  (done) => {
        
        let teste = function(){
            let conf = Object.assign({}, configMock);
            delete conf.fila;
            let log = new GoodSQS(conf);
        };    
              
        Code.expect(teste).to.be.throw(Error, 'fila não informado!');
        return done();
                        
    });
    
});

exports.lab = lab;