# Matterway.io Challenge

## Introduction

The final goal is to share a remote object between two different context between a trusted channel.

My idea was create a `Provider` and a `Consumer` function to share the remote object using a REST API written in Node.js.

## Challenges

 * Serialize data that is not string/number to send/receive across the wire.
 * Serialize object loses access to closure

## Installation

 To install:

    $ yarn

### Start Server

    $ yarn start:server
 
### Start Web dev server

    $ yarn start