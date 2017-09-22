'use strict';

const Stream = require('stream');
const Os = require('os');
const AWS = require('aws-sdk');

const internals = {
    defaults: {
        schema: 'good-sqs'
    }
};

class GoodSqs extends Stream.Writable {
    constructor(config) {

        if(!config)
            throw Error('Config não informado!');

        if(!config.access_key)
            throw Error('access_key não informado!');
        
        if(!config.secret_key)
            throw Error('secret_key não informado!');
        
        if(!config.region)
            throw Error('region não informado!');
        
        if(!config.app)
            throw Error('app não informado!');
        
        if(!config.env)
            throw Error('env não informado!');

        if(!config.fila)
            throw Error('fila não informado!');


        super({ objectMode: true, decodeStrings: false });
        
        this._aws_access_key = config.access_key;
        this._aws_secret_key = config.secret_key;
        this._aws_region = config.region;
        this._app = config.app;
        this._env = config.env;
        this._fila = config.fila;
        this._host = Os.hostname();
        this._data = {};
        this._sqs = new AWS.SQS(
            {
                accessKeyId: this._aws_access_key,
                secretAccessKey: this._aws_secret_key,
                region: this._aws_region
            }
        );

    }
    _write(data, encoding, callback) {   

            this._data = data;

            this._sendMessages((err, response) => {

                if(err)
                    console.log(err);
                this._data = '{}';
                return callback();
            });
    }
    _sendMessages(callback) {

        let dados = {
            application: this._app,
            environment: this._env,
            data: new Date().toISOString(),
            machine: this._host,
            logger: this._host
            
        };
        if(!this._data){
            this._data = '{}';            
            return callback('Data empty!', null);
        }

        let mensagem = Object.assign(dados, JSON.parse(this._data));
        
        let parametros = {
            MessageBody: JSON.stringify(mensagem),
            QueueUrl: this._fila
        };
        this._sqs.sendMessage(parametros, callback);
    }
}

module.exports = GoodSqs;